import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Morph } from "react-native-morph";

export default function ScreenC() {
	const router = useRouter();

	return (
		<Morph.Element style={styles.card}>
			<View style={styles.cardContent}>
				<Text style={styles.emoji}>🎯</Text>
				<Text style={styles.title}>Screen C</Text>
				<Text style={styles.description}>Compact centered card layout.</Text>
				<View style={styles.buttonRow}>
					<Pressable
						style={styles.button}
						onPress={() => router.push("/linear/screen-d")}
					>
						<Text style={styles.buttonText}>Go to D</Text>
					</Pressable>
					<Pressable
						style={[styles.button, styles.buttonSecondary]}
						onPress={() => router.back()}
					>
						<Text style={styles.buttonTextSecondary}>Back</Text>
					</Pressable>
				</View>
			</View>
		</Morph.Element>
	);
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 24,
		overflow: "hidden",
		marginHorizontal: 16,
		marginBottom: 32,
	},
	cardContent: {
		padding: 32,
		alignItems: "center",
	},
	emoji: {
		fontSize: 48,
		marginBottom: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "700",
		marginBottom: 8,
		textAlign: "center",
	},
	description: {
		fontSize: 16,
		color: "#666",
		marginBottom: 24,
		textAlign: "center",
	},
	buttonRow: {
		flexDirection: "row",
		gap: 12,
	},
	button: {
		flex: 1,
		backgroundColor: "#007AFF",
		padding: 16,
		borderRadius: 12,
		alignItems: "center",
	},
	buttonSecondary: {
		backgroundColor: "#f0f0f0",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
	buttonTextSecondary: {
		color: "#333",
		fontSize: 16,
		fontWeight: "600",
	},
});
