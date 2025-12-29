import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Step3() {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.stepIndicator}>Step 3 of 3</Text>
				<Text style={styles.emoji}>🚀</Text>
				<Text style={styles.title}>You're All Set!</Text>
				<Text style={styles.description}>
					Everything is configured. Let's launch your experience.
				</Text>
			</View>
			<View style={styles.footer}>
				<Pressable
					style={styles.button}
					onPress={() => router.push("/onboarding/complete")}
				>
					<Text style={styles.buttonText}>Complete Setup</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ec4899",
	},
	content: {
		flex: 1,
		padding: 24,
		alignItems: "center",
		justifyContent: "center",
	},
	stepIndicator: {
		fontSize: 14,
		color: "rgba(255,255,255,0.7)",
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
		color: "#fff",
	},
	description: {
		fontSize: 18,
		color: "rgba(255,255,255,0.8)",
		textAlign: "center",
		lineHeight: 28,
		paddingHorizontal: 24,
	},
	footer: {
		padding: 24,
		paddingBottom: 48,
	},
	button: {
		backgroundColor: "#fff",
		paddingVertical: 18,
		borderRadius: 14,
		alignItems: "center",
	},
	buttonText: {
		color: "#ec4899",
		fontSize: 18,
		fontWeight: "600",
	},
});
