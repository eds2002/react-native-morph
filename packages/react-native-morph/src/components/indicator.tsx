import Animated, { useAnimatedStyle } from "react-native-reanimated";
import type { MorphIndicatorProps } from "../types";

export function MorphIndicator({
	targetBounds,
	borderRadius,
}: MorphIndicatorProps) {
	const animatedStyle = useAnimatedStyle(() => {
		"worklet";
		const target = targetBounds.value;

		return {
			height: target.height,
			width: target.width,
			transform: [{ translateX: target.pageX }, { translateY: target.pageY }],
		};
	});

	return (
		<Animated.View
			style={[{ backgroundColor: "white", borderRadius }, animatedStyle]}
		/>
	);
}
