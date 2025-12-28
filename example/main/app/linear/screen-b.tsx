import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Morph } from "react-native-morph";

export default function ScreenB() {
	const router = useRouter();

	return (
		<Morph.Element style={styles.card}>
			<View style={styles.cardContent}>
				<Text style={styles.title}>Screen B</Text>
				<Text style={styles.subtitle}>A Taller Card</Text>
				<Text style={styles.description}>
					This card has more content to test morphing between different heights.
					The animation should smoothly interpolate the bounds.
				</Text>
				<View style={styles.buttonRow}>
					<Pressable
						style={styles.button}
						onPress={() => router.push("/linear/screen-c")}
					>
						<Text style={styles.buttonText}>Go to C</Text>
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
		padding: 24,
		minHeight: 250,
	},
	title: {
		fontSize: 28,
		fontWeight: "700",
		marginBottom: 4,
	},
	subtitle: {
		fontSize: 16,
		color: "#007AFF",
		marginBottom: 16,
		fontWeight: "500",
	},
	description: {
		fontSize: 16,
		color: "#666",
		marginBottom: 24,
		lineHeight: 24,
	},
	buttonRow: {
		flexDirection: "row",
		gap: 12,
		marginTop: "auto",
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
