import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useMorphContext } from "../context";

export function MorphIndicator() {
	const { targetBounds, borderRadius } = useMorphContext();
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
