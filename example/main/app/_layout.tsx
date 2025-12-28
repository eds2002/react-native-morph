import "react-native-reanimated";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BlankStack } from "@/layouts/blank-stack";

export default function RootLayout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<BlankStack screenOptions={{}} />
		</GestureHandlerRootView>
	);
}
