import { StyleSheet, View } from "react-native";
import Animated, {
	interpolate,
	useAnimatedReaction,
	useAnimatedStyle,
} from "react-native-reanimated";
import Transition, {
	useHistory,
	useScreenAnimation,
	useScreenState,
} from "react-native-screen-transitions";
import { FLOATING_ELEMENT_TAG } from "../constants";
import { useMorphContext } from "../context";
import type { MorphMaskedProps } from "../types";

export function MorphMasked({ children, style }: MorphMaskedProps) {
	const { backgroundColor, scaleFactor, targetBounds } = useMorphContext();
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

			const currentKey = current?.route?.key;
			const targetKey = previous?.route?.key ?? historyTargetKey;

			if (!targetKey) {
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
				targetBounds.value = {
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
			backgroundColor,
			flex: 1,
		};
	});

	const state = useScreenState();
	const isFirstInStack = state.index === 0;

	const elementStyle = useAnimatedStyle(() => {
		const { current, bounds, progress } = screenAnimation.value;

		const currentKey = current?.route?.key ?? "";

		if (!currentKey) {
			return { transform: [{ translateY: 0 }, { scale: 1 }] };
		}

		const currentSnapshot = bounds.getSnapshot?.(
			FLOATING_ELEMENT_TAG,
			currentKey,
		);

		if (!currentSnapshot?.bounds) {
			return { transform: [{ translateY: 0 }] };
		}

		const maskPageY = targetBounds.value.pageY;
		const contentNaturalY = currentSnapshot.bounds.pageY;
		const translateY = maskPageY - contentNaturalY;

		const inputRange = isFirstInStack ? [1, 1, 2] : [0, 1, 2];

		const outputRange = isFirstInStack
			? [1, 1, 1 + scaleFactor]
			: [1 - scaleFactor, 1, 1 + scaleFactor];

		const scale = interpolate(progress, inputRange, outputRange, "clamp");

		return {
			transform: [{ translateY }, { scale }],
		};
	});

	return (
		<Animated.View style={containerStyle}>
			<Animated.View style={[styles.elementWrapper, elementStyle]}>
				<Transition.View
					sharedBoundTag={FLOATING_ELEMENT_TAG}
					style={[{ marginTop: "auto" }, style]}
				>
					<View onStartShouldSetResponder={() => true}>{children}</View>
				</Transition.View>
			</Animated.View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	elementWrapper: {
		flex: 1,
	},
});
