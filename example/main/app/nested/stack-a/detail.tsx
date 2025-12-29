import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Morph } from "react-native-morph";

export default function StackADetail() {
	const router = useRouter();

	return (
		<Morph.Element style={styles.card}>
			<View style={styles.cardContent}>
				<Text style={styles.emoji}>2️⃣</Text>
				<Text style={styles.title}>Stack A - Detail</Text>
				<Text style={styles.description}>
					Second level in the nested stack. Card is taller to test height
					morphing.
				</Text>
				<View style={styles.spacer} />
				<View style={styles.buttonRow}>
					<Pressable
						style={styles.button}
						onPress={() => router.push("/nested/stack-a/deep")}
					>
						<Text style={styles.buttonText}>Go Deeper</Text>
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
		alignItems: "center",
		minHeight: 300,
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
	spacer: {
		flex: 1,
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
