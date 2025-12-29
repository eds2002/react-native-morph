import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Morph } from "react-native-morph";

export default function StackAIndex() {
	const router = useRouter();

	return (
		<View style={[styles.card]}>
			<View style={styles.cardContent}>
				<Text style={styles.emoji}>1️⃣</Text>
				<Text style={styles.title}>Stack A - Screen 1</Text>
				<Text style={styles.description}>
					Inside the nested navigator. The morph should work within this stack.
				</Text>
				<View style={styles.buttonRow}>
					<Pressable
						style={styles.button}
						onPress={() => router.push("/nested/stack-a/detail")}
					>
						<Text style={styles.buttonText}>Go to Detail</Text>
					</Pressable>
					<Pressable
						style={[styles.button, styles.buttonSecondary]}
						onPress={() => router.back()}
					>
						<Text style={styles.buttonTextSecondary}>Back</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 24,
		// overflow: "hidden",
		// marginHorizontal: 16,
		// marginBottom: 32,
		flex: 1,
		height: "100%",
		backgroundColor: "red",
	},
	cardContent: {
		padding: 24,
		alignItems: "center",
	},
	emoji: {
		fontSize: 48,
		marginBottom: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "700",
		marginBottom: 12,
		textAlign: "center",
	},
	description: {
		fontSize: 16,
		color: "#666",
		marginBottom: 24,
		textAlign: "center",
		lineHeight: 24,
	},
	buttonRow: {
		flexDirection: "row",
		gap: 12,
		width: "100%",
	},
	button: {
		flex: 1,
		backgroundColor: "#14B8A6",
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
