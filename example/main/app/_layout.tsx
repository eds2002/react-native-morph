import { GestureHandlerRootView } from "react-native-gesture-handler";
import { interpolate } from "react-native-reanimated";
import { BlankStack } from "@/layouts/blank-stack";

export default function RootLayout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<BlankStack screenOptions={{}}>
				<BlankStack.Screen
					name="onboarding"
					options={{
						gestureEnabled: true,
						gestureDirection: "vertical",
						screenStyleInterpolator: ({
							layouts: {
								screen: { height },
							},
							progress,
						}) => {
							"worklet";

							const y = interpolate(progress, [0, 1], [height, 0], "clamp");

							return {
								contentStyle: {
									transform: [{ translateY: y }],
								},
								overlayStyle: {
									backgroundColor: "rgba(0, 0, 0, 0.5)",
									opacity: interpolate(progress, [0, 1], [0, 1]),
								},
							};
						},
						transitionSpec: {
							open: {
								stiffness: 1000,
								damping: 500,
								mass: 2.5,
								overshootClamping: true,
							},
							close: {
								stiffness: 1000,
								damping: 500,
								mass: 2.5,
								overshootClamping: true,
							},
						},
					}}
				/>
			</BlankStack>
		</GestureHandlerRootView>
	);
}
