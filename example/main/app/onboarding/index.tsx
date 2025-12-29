import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Morph } from "react-native-morph";

export default function OnboardingWelcome() {
	const router = useRouter();

	return (
		<Morph.Element style={styles.card}>
			<View style={styles.cardContent}>
				<Text style={styles.emoji}>👋</Text>
				<Text style={styles.title}>Welcome!</Text>
				<Text style={styles.description}>
					Let&apos;s get you set up with a quick onboarding flow.
				</Text>
				<Pressable
					style={styles.button}
					onPress={() => router.push("/onboarding/steps")}
				>
					<Text style={styles.buttonText}>Get Started</Text>
				</Pressable>
			</View>
		</Morph.Element>
	);
}

const styles = StyleSheet.create({
	card: {
		height: 300,
		borderRadius: 24,
		marginHorizontal: 16,
		marginBottom: 32,
	},
	cardContent: {
		flex: 1,
		padding: 24,
		alignItems: "center",
		justifyContent: "center",
	},
	emoji: {
		fontSize: 48,
		marginBottom: 16,
	},
	title: {
		fontSize: 28,
		fontWeight: "700",
		marginBottom: 12,
		textAlign: "center",
		color: "#1a1a2e",
	},
	description: {
		fontSize: 16,
		color: "#666",
		marginBottom: 24,
		textAlign: "center",
		lineHeight: 24,
	},
	button: {
		backgroundColor: "#6366f1",
		paddingVertical: 16,
		paddingHorizontal: 32,
		borderRadius: 12,
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
});
