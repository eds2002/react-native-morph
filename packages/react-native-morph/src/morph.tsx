import MaskedView from "@react-native-masked-view/masked-view";
import { createContext, type ReactNode, useContext } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import Animated, {
	interpolate,
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

			const targetKey = previous?.route?.key ?? historyTargetKey;

			if (!morphContext || !targetKey) {
				return;
			}

			const currentSnapshot = bounds.getSnapshot?.(
				FLOATING_ELEMENT_TAG,
				currentKey,
			);

			const targetSnapshot = bounds.getSnapshot?.(
				FLOATING_ELEMENT_TAG,
				targetKey,
			);

			if (!currentSnapshot?.bounds || !targetSnapshot?.bounds) {
				return;
			}

			const height = bounds.interpolateBounds(
				FLOATING_ELEMENT_TAG,
				"height",
				targetKey,
			);

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
		const { progress } = screenAnimation.value;
		return {
			opacity: interpolate(progress, [0.25, 0.75], [0, 1], "clamp"),
			backgroundColor: "white",
			flex: 1,
		};
	});

	const elementStyle = useAnimatedStyle(() => {
		const { current, bounds } = screenAnimation.value;
		const currentKey = current?.route?.key ?? "";

		if (!morphContext) {
			return { transform: [{ translateY: 0 }] };
		}

		const currentSnapshot = bounds.getSnapshot?.(
			FLOATING_ELEMENT_TAG,
			currentKey,
		);

		if (!currentSnapshot?.bounds) {
			return { transform: [{ translateY: 0 }] };
		}

		// Use the exact same pageY that the mask indicator uses
		const maskPageY = morphContext.targetBounds.value.pageY;
		const contentNaturalY = currentSnapshot.bounds.pageY;

		// Move content to align with where the mask is
		const translateY = maskPageY - contentNaturalY;

		return {
			transform: [{ translateY }],
		};
	});

	return (
		<Animated.View style={containerStyle}>
			<Animated.View style={[styles.elementWrapper, elementStyle]}>
				<Transition.View
					sharedBoundTag={FLOATING_ELEMENT_TAG}
					style={[{ marginTop: "auto" }, style]}
				>
					{children}
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
	elementWrapper: {
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
