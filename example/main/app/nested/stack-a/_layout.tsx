import "react-native-reanimated";
import { StyleSheet, useWindowDimensions } from "react-native";
import { Morph } from "react-native-morph";
import { BlankStack } from "@/layouts/blank-stack";

const options = {
	gestureEnabled: true,
	gestureDirection: "vertical",
	transitionSpec: {
		open: {
			stiffness: 1000,
			damping: 500,
			mass: 2.5,
			overshootClamping: true,
			restSpeedThreshold: 0.02,
		},
		close: {
			stiffness: 1000,
			damping: 500,
			mass: 2.5,
			overshootClamping: true,
			restSpeedThreshold: 0.02,
		},
	},
} as const;

export default function StackALayout() {
	const { height } = useWindowDimensions();
	return (
		<Morph.Element style={[styles.card, { height }]}>
			<BlankStack screenOptions={{}}>
				<BlankStack.Screen name="index" options={options} />
				<BlankStack.Screen name="detail" options={options} />
				<BlankStack.Screen name="deep" options={options} />
			</BlankStack>
		</Morph.Element>
	);
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 24,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		overflow: "hidden",
	},
});
