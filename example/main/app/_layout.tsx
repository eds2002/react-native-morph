import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Transition from "react-native-screen-transitions";
import { BlankStack } from "@/layouts/blank-stack";

export default function RootLayout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<BlankStack screenOptions={{}}>
				<BlankStack.Screen
					name="onboarding"
					options={{
						...Transition.Presets.SlideFromBottom(),
					}}
				/>
			</BlankStack>
		</GestureHandlerRootView>
	);
}
