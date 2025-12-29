import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import type { MorphIndicatorProps } from "../types";

export function MorphIndicator({ targetBounds }: MorphIndicatorProps) {
	const animatedStyle = useAnimatedStyle(() => {
		"worklet";
		const target = targetBounds.value;

		return {
			height: target.height,
			width: target.width,
			transform: [{ translateX: target.pageX }, { translateY: target.pageY }],
		};
	});

	return <Animated.View style={[styles.indicator, animatedStyle]} />;
}

const styles = StyleSheet.create({
	indicator: {
		backgroundColor: "white",
		borderRadius: 36,
	},
});
