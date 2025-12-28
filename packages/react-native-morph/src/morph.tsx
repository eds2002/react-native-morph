import MaskedView from "@react-native-masked-view/masked-view";
import type { ReactNode } from "react";
import { Pressable, StyleSheet, View, type ViewStyle } from "react-native";
import Animated, {
	interpolate,
	useAnimatedStyle,
} from "react-native-reanimated";
import Transition, {
	useScreenAnimation,
} from "react-native-screen-transitions";

const FLOATING_ELEMENT_TAG = "MORPH_FLOATING_ELEMENT";

export interface MorphProps {
	children: ReactNode;
	onBackdropPress?: () => void;
}

export interface MorphElementProps {
	children: ReactNode;
	style?: ViewStyle;
}

function MorphIndicator() {
	const screenAnimation = useScreenAnimation();

	const animatedStyle = useAnimatedStyle(() => {
		"worklet";
		const { bounds, progress, current } = screenAnimation.value;
		const isClosing = !!current?.closing;

		const screenKey = current?.route?.key ?? "";
		const link = bounds.getLink?.(FLOATING_ELEMENT_TAG);
		const hasLink = !!(link?.source || link?.destination);

		// ━━━ STABLE SCREEN ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
		if ((progress === 1 && !isClosing) || !hasLink) {
			const snapshot = bounds.getSnapshot?.(FLOATING_ELEMENT_TAG, screenKey);
			const myBounds = snapshot?.bounds;

			return {
				height: myBounds?.height ?? 0,
				width: myBounds?.width ?? 0,
				transform: [
					{ translateX: myBounds?.pageX ?? 0 },
					{ translateY: myBounds?.pageY ?? 0 },
				],
			};
		}

		const interpolatedPageX = bounds.interpolateBounds?.(
			FLOATING_ELEMENT_TAG,
			"pageX",
		);
		const interpolatedPageY = bounds.interpolateBounds?.(
			FLOATING_ELEMENT_TAG,
			"pageY",
		);
		const interpolatedWidth = bounds.interpolateBounds?.(
			FLOATING_ELEMENT_TAG,
			"width",
		);
		const interpolatedHeight = bounds.interpolateBounds?.(
			FLOATING_ELEMENT_TAG,
			"height",
		);

		return {
			height: interpolatedHeight,
			width: interpolatedWidth,
			transform: [
				{ translateX: interpolatedPageX },
				{ translateY: interpolatedPageY },
			],
		};
	});

	return <Animated.View style={[styles.indicator, animatedStyle]} />;
}

export function Morph({ children, onBackdropPress }: MorphProps) {
	const content = onBackdropPress ? (
		<Pressable style={styles.backdrop} onPress={onBackdropPress}>
			{children}
		</Pressable>
	) : (
		children
	);

	return (
		<MaskedView
			style={styles.container}
			maskElement={
				<View style={StyleSheet.absoluteFillObject} pointerEvents="none">
					<MorphIndicator />
				</View>
			}
			pointerEvents="box-none"
		>
			{content}
		</MaskedView>
	);
}

function MorphElement({ children, style }: MorphElementProps) {
	const screenAnimation = useScreenAnimation();

	const animatedStyle = useAnimatedStyle(() => {
		"worklet";
		const { bounds, progress, current, next } = screenAnimation.value;
		const isClosing = !!current?.closing;

		const link = bounds.getLink?.(FLOATING_ELEMENT_TAG);
		const hasLink = !!(link?.source || link?.destination);

		// ━━━ STABLE SCREEN ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
		if ((progress === 1 && !isClosing) || !hasLink) {
			return {
				transform: [{ scale: 1 }, { translateY: 0 }],
			};
		}

		// ━━━ ANIMATING SCREEN ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
		const entering = !next;

		const interpolatedPageY = bounds.interpolateBounds?.(
			FLOATING_ELEMENT_TAG,
			"pageY",
		);

		const currentBounds = entering
			? link?.destination?.bounds
			: link?.source?.bounds;

		const currentPageY = currentBounds?.pageY ?? 0;

		const translateY = interpolatedPageY - currentPageY;

		return {
			transform: [{ translateY }],
		};
	}, []);

	const containerOpacity = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				screenAnimation.value.stackProgress,
				[0, 1, 2, 3],
				[0, 1, 1, 0],
				"clamp",
			),
			backgroundColor: "white", // <-- we should be able to adjust this
			flex: 1,
			justifyContent: "flex-end",
		};
	});

	return (
		<Animated.View style={[containerOpacity]}>
			<Transition.View
				sharedBoundTag={FLOATING_ELEMENT_TAG}
				style={[style, animatedStyle]}
			>
				<View onStartShouldSetResponder={() => true}>{children}</View>
			</Transition.View>
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
		borderRadius: 24,
	},
});
