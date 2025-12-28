import "react-native-reanimated";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { Morph } from "react-native-morph";
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
	const router = useRouter();

	return (
		<View style={{ flex: 1, backgroundColor: "red" }}>
			<Morph onBackdropPress={() => router.back()}>
				<BlankStack screenOptions={{}}>
					<BlankStack.Screen name="index" options={options} />
					<BlankStack.Screen name="screen-b" options={options} />
					<BlankStack.Screen name="screen-c" options={options} />
					<BlankStack.Screen name="screen-d" options={options} />
					<BlankStack.Screen name="screen-e" options={options} />
				</BlankStack>
			</Morph>
		</View>
	);
}
