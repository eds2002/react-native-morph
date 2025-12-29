import "react-native-reanimated";
import { router } from "expo-router";
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

export default function LinearLayout() {
	return (
		<Morph onBackdropPress={router.back}>
			<BlankStack screenOptions={{}}>
				<BlankStack.Screen name="index" options={options} />
				<BlankStack.Screen name="screen-b" options={options} />
				<BlankStack.Screen name="screen-c" options={options} />
				<BlankStack.Screen name="screen-d" options={options} />
				<BlankStack.Screen name="screen-e" options={options} />
			</BlankStack>
		</Morph>
	);
}
