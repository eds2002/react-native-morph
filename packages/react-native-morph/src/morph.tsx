import MaskedView from "@react-native-masked-view/masked-view";
import { createContext, type ReactNode, useContext } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import Animated, {
	type SharedValue,
	useAnimatedReaction,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
import Transition, {
	useHistory,
	useScreenAnimation,
} from "react-native-screen-transitions";

const FLOATING_ELEMENT_TAG = "MORPH_FLOATING_ELEMENT";

const INITIAL_MASK_BOUNDS = {
	height: 0,
	width: 0,
	pageX: 0,
	pageY: 0,
};

interface MaskBounds {
	height: number;
	width: number;
	pageX: number;
	pageY: number;
}

interface MorphContextValue {
	targetBounds: SharedValue<MaskBounds>;
}

const MorphContext = createContext<MorphContextValue | null>(null);

interface MorphProps {
	children: ReactNode;
}

interface MorphElementProps {
	children: ReactNode;
	style?: ViewStyle;
}

interface MorphIndicatorProps {
	targetBounds: SharedValue<MaskBounds>;
}

function MorphIndicator({ targetBounds }: MorphIndicatorProps) {
	const animatedStyle = useAnimatedStyle(() => {
		"worklet";
		const target = targetBounds.value;

		if (target.height > 0 && target.width > 0) {
			return {
				height: target.height,
				width: target.width,
				transform: [{ translateX: target.pageX }, { translateY: target.pageY }],
			};
		}

		return {
			height: targetBounds.value.height,
			width: targetBounds.value.width,
			transform: [
				{ translateX: targetBounds.value.pageX },
				{ translateY: targetBounds.value.pageY },
			],
		};
	});

	return <Animated.View style={[styles.indicator, animatedStyle]} />;
}

export function Morph({ children }: MorphProps) {
	const targetBounds = useSharedValue<MaskBounds>(INITIAL_MASK_BOUNDS);

	return (
		<MorphContext.Provider value={{ targetBounds }}>
			<MaskedView
				style={styles.container}
				maskElement={
					<View style={StyleSheet.absoluteFillObject} pointerEvents="none">
						<MorphIndicator targetBounds={targetBounds} />
					</View>
				}
				pointerEvents="box-none"
			>
				{children}
			</MaskedView>
		</MorphContext.Provider>
	);
}

function MorphElement({ children, style }: MorphElementProps) {
	const morphContext = useContext(MorphContext);
	const screenAnimation = useScreenAnimation();
	const { getMostRecent } = useHistory();

	const historyTarget = getMostRecent();
	const historyTargetKey = historyTarget?.descriptor.route.key;

	useAnimatedReaction(
		() => screenAnimation.value,
		(animation) => {
			const { current, previous, bounds, focused } = animation;
			if (!focused) {
				return;
			}
			const currentKey = current?.route?.key ?? "";

			// Use previous route key as target (available during gesture, unlike history)
			const targetKey = previous?.route?.key ?? historyTargetKey;

			if (!morphContext || !targetKey) return;

			// Get snapshots directly
			const currentSnapshot = bounds.getSnapshot?.(
				FLOATING_ELEMENT_TAG,
				currentKey,
			);
			const targetSnapshot = bounds.getSnapshot?.(
				FLOATING_ELEMENT_TAG,
				targetKey,
			);

			if (!currentSnapshot?.bounds || !targetSnapshot?.bounds) return;

			// Interpolate using current.progress directly (works with gestures)
			// Progress 1 = current screen active, Progress 0 = dismissed to target
			const height = bounds.interpolateBounds(
				FLOATING_ELEMENT_TAG,
				"height",
				targetKey,
			);

			console.log(height);

			const width = bounds.interpolateBounds(
				FLOATING_ELEMENT_TAG,
				"width",
				targetKey,
			);
			const pageX = bounds.interpolateBounds(
				FLOATING_ELEMENT_TAG,
				"pageX",
				targetKey,
			);
			const pageY = bounds.interpolateBounds(
				FLOATING_ELEMENT_TAG,
				"pageY",
				targetKey,
			);

			if (height > 0 && width > 0) {
				morphContext.targetBounds.value = {
					height,
					width,
					pageX,
					pageY,
				};
			}
		},
	);

	const containerStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: "white",
			flex: 1,
			justifyContent: "flex-end",
		};
	});

	return (
		<Animated.View style={containerStyle}>
			<Animated.View>
				<Transition.View sharedBoundTag={FLOATING_ELEMENT_TAG} style={style}>
					<Animated.View>
						<View onStartShouldSetResponder={() => true}>{children}</View>
					</Animated.View>
				</Transition.View>
			</Animated.View>
		</Animated.View>
	);
}

Morph.Element = MorphElement;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	backdrop: {
		flex: 1,
	},
	indicator: {
		backgroundColor: "white",
		borderRadius: 36,
	},
});
