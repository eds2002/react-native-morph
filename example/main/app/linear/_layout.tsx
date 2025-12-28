import "react-native-reanimated";
import Transition from "react-native-screen-transitions";
import { BlankStack } from "@/layouts/blank-stack";

const options = {
	gestureEnabled: true,
	gestureDirection: "vertical",
	transitionSpec: {
		open: Transition.Specs.DefaultSpec,
		close: Transition.Specs.DefaultSpec,
	},
} as const;

export default function LinearLayout() {
	return (
		<BlankStack screenOptions={{}}>
			<BlankStack.Screen name="index" />
			<BlankStack.Screen name="screen-b" options={options} />
			<BlankStack.Screen name="screen-c" options={options} />
			<BlankStack.Screen name="screen-d" options={options} />
			<BlankStack.Screen name="screen-e" options={options} />
		</BlankStack>
	);
}
