import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/button";

export default function Home() {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>React Native Morph</Text>
			<View style={styles.buttons}>
				<Button title="Linear Example" onPress={() => router.push("/linear")} />
				<Button
					title="Onboarding Flow"
					onPress={() => router.push("/onboarding")}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 24,
		fontWeight: "700",
		marginBottom: 32,
	},
	buttons: {
		gap: 16,
	},
});
