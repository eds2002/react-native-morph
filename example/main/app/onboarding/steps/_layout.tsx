import { Stack } from "expo-router";
import { useWindowDimensions } from "react-native";
import { Morph } from "react-native-morph";

export default function StepsLayout() {
	const { height } = useWindowDimensions();

	return (
		<Morph.Screen style={{ flex: 1, height }}>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name="index" />
				<Stack.Screen name="step-2" />
				<Stack.Screen name="step-3" />
			</Stack>
		</Morph.Screen>
	);
}
