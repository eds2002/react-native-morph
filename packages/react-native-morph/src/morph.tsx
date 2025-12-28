import MaskedView from "@react-native-masked-view/masked-view";
import { createContext, type ReactNode, useContext } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import Animated, {
	Extrapolation,
	interpolate,
	type SharedValue,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	type WithSpringConfig,
	withSpring,
} from "react-native-reanimated";
import Transition, {
	useScreenAnimation,
} from "react-native-screen-transitions";

const FLOATING_ELEMENT_TAG = "MORPH_FLOATING_ELEMENT";

interface MaskBounds {
	height: number;
	width: number;
	pageX: number;
	pageY: number;
}

interface MorphContextValue {
	targetBounds: SharedValue<MaskBounds>;
	animatedPageY: SharedValue<number>;
}

// Context to pass bounds from Morph to MorphElement
const MorphContext = createContext<MorphContextValue | null>(null);

export interface MorphProps {
	children: ReactNode;
}

export interface MorphElementProps {
	children: ReactNode;
	style?: ViewStyle;
}

interface MorphIndicatorProps {
	targetBounds: SharedValue<MaskBounds>;
	animatedPageY: SharedValue<number>;
}

const TIMING_CONFIG: WithSpringConfig = {
	mass: 3,
	stiffness: 1000,
	damping: 500,
};

function MorphIndicator({ targetBounds, animatedPageY }: MorphIndicatorProps) {
	// Animated values that interpolate towards target
	const animatedHeight = useSharedValue(0);
	const animatedWidth = useSharedValue(0);
	const animatedPageX = useSharedValue(0);

	// React to target changes and animate towards them
	useDerivedValue(() => {
		const target = targetBounds.value;
		if (target.height > 0 && target.width > 0) {
			animatedHeight.value = withSpring(target.height, TIMING_CONFIG);
			animatedWidth.value = withSpring(target.width, TIMING_CONFIG);
			animatedPageX.value = withSpring(target.pageX, TIMING_CONFIG);
			animatedPageY.value = withSpring(target.pageY, TIMING_CONFIG);
		}
	});

	const animatedStyle = useAnimatedStyle(() => {
		"worklet";
		return {
			height: animatedHeight.value,
			width: animatedWidth.value,
			transform: [
				{ translateX: animatedPageX.value },
				{ translateY: animatedPageY.value },
			],
		};
	});

	return <Animated.View style={[styles.indicator, animatedStyle]} />;
}

export function Morph({ children }: MorphProps) {
	const targetBounds = useSharedValue<MaskBounds>({
		height: 0,
		width: 0,
		pageX: 0,
		pageY: 0,
	});
	const animatedPageY = useSharedValue(0);

	return (
		<MorphContext.Provider value={{ targetBounds, animatedPageY }}>
			<MaskedView
				style={styles.container}
				maskElement={
					<View style={StyleSheet.absoluteFillObject} pointerEvents="none">
						<MorphIndicator
							targetBounds={targetBounds}
							animatedPageY={animatedPageY}
						/>
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
	// Store this element's natural pageY position
	const myNaturalPageY = useSharedValue(0);

	// Report snapshot bounds when this is the entering/focused screen
	useDerivedValue(() => {
		const { current, bounds } = screenAnimation.value;
		const isEntering = !!current?.entering;
		const screenKey = current?.route?.key ?? "";

		const snapshot = bounds.getSnapshot?.(FLOATING_ELEMENT_TAG, screenKey);
		const myBounds = snapshot?.bounds;

		if (myBounds && myBounds.height > 0 && myBounds.width > 0) {
			// Always track our natural position
			myNaturalPageY.value = myBounds.pageY;

			// Update global target when entering
			if (isEntering && morphContext) {
				morphContext.targetBounds.value = {
					height: myBounds.height,
					width: myBounds.width,
					pageX: myBounds.pageX,
					pageY: myBounds.pageY,
				};
			}
		}
	});

	const containerStyle = useAnimatedStyle(() => {
		const { current } = screenAnimation.value;

		const opacity = interpolate(
			current.progress,
			[0, 0.4, 1, 1.6, 2],
			[0, 1, 1, 1, 0],
			Extrapolation.CLAMP,
		);
		return {
			opacity,
			backgroundColor: "white",
			flex: 1,
			justifyContent: "flex-end",
		};
	});

	// Offset element to match the global animated position
	const elementStyle = useAnimatedStyle(() => {
		if (!morphContext) {
			return { transform: [{ translateY: 0 }] };
		}

		const globalY = morphContext.animatedPageY.value;
		const myY = myNaturalPageY.value;

		// When globalY hasn't been set yet, don't offset
		if (globalY === 0 || myY === 0) {
			return { transform: [{ translateY: 0 }] };
		}

		const translateY = globalY - myY;
		return { transform: [{ translateY }] };
	});

	// Scale applied to content inside Transition.View so it doesn't affect bounds
	const contentStyle = useAnimatedStyle(() => {
		const { current } = screenAnimation.value;
		const progress = current.progress;

		// Scale: 0->1 = 0.98->1 (entering), 1->2 = 1->1.02 (exiting)
		const scale = interpolate(
			progress,
			[0, 0.4, 1, 1.6, 2],
			[0.95, 1, 1, 1.05, 1.05],
			Extrapolation.CLAMP,
		);

		return { transform: [{ scale }] };
	});

	return (
		<Animated.View style={containerStyle}>
			<Animated.View style={elementStyle}>
				<Transition.View sharedBoundTag={FLOATING_ELEMENT_TAG} style={style}>
					<Animated.View style={contentStyle}>
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
