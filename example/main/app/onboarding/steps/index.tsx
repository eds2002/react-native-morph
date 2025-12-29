import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/button";

export default function Step1() {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.stepIndicator}>Step 1 of 3</Text>
				<Text style={styles.emoji}>🎯</Text>
				<Text style={styles.title}>Set Your Goals</Text>
				<Text style={styles.description}>
					Tell us what you want to achieve. We&aposll help you get there.
				</Text>
			</View>
			<View style={styles.footer}>
				<Button
					title="Next"
					onPress={() => router.push("/onboarding/steps/step-2")}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	content: {
		flex: 1,
		padding: 24,
		alignItems: "center",
		justifyContent: "center",
	},
	stepIndicator: {
		fontSize: 14,
		color: "#999",
		marginBottom: 24,
		fontWeight: "500",
	},
	emoji: {
		fontSize: 64,
		marginBottom: 24,
	},
	title: {
		fontSize: 32,
		fontWeight: "700",
		marginBottom: 16,
		textAlign: "center",
		color: "#000",
	},
	description: {
		fontSize: 18,
		color: "#666",
		textAlign: "center",
		lineHeight: 28,
		paddingHorizontal: 24,
	},
	footer: {
		padding: 24,
		paddingBottom: 48,
	},
});
