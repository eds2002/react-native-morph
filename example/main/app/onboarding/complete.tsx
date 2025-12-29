import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Morph } from "react-native-morph";

export default function OnboardingComplete() {
	const router = useRouter();

	return (
		<Morph.Element style={styles.card}>
			<View style={styles.cardContent}>
				<Text style={styles.emoji}>🎉</Text>
				<Text style={styles.title}>All Done!</Text>
				<Text style={styles.description}>
					You&apos;ve completed the onboarding. Welcome aboard!
				</Text>
				<Pressable style={styles.button} onPress={() => router.dismissTo("/")}>
					<Text style={styles.buttonText}>Let&apos;s Go</Text>
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
		backgroundColor: "#10b981",
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
