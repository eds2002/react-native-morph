import "react-native-reanimated";
import { View } from "react-native";
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

export default function OnboardingLayout() {
	return (
		<View style={{ flex: 1, backgroundColor: "#1a1a2e" }}>
			<Morph>
				<BlankStack screenOptions={{}}>
					<BlankStack.Screen name="index" options={options} />
					<BlankStack.Screen name="steps" options={options} />
					<BlankStack.Screen name="complete" options={options} />
				</BlankStack>
			</Morph>
		</View>
	);
}
