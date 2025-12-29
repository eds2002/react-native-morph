import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Morph } from "react-native-morph";

export default function StackADeep() {
	const router = useRouter();

	return (
		<Morph.Element style={styles.card}>
			<View style={styles.cardContent}>
				<Text style={styles.emoji}>3️⃣</Text>
				<Text style={styles.title}>Stack A - Deep</Text>
				<Text style={styles.description}>
					Deepest level in the nested stack. This is an edge-style card with no
					margins to test full-width morphing.
				</Text>
				<View style={styles.spacer} />
				<View style={styles.buttonRow}>
					<Pressable
						style={[styles.button, styles.buttonSecondary]}
						onPress={() => router.back()}
					>
						<Text style={styles.buttonTextSecondary}>Back to Detail</Text>
					</Pressable>
				</View>
				<Pressable
					style={[styles.button, styles.buttonDanger]}
					onPress={() => router.dismissAll()}
				>
					<Text style={styles.buttonText}>Dismiss All</Text>
				</Pressable>
			</View>
		</Morph.Element>
	);
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 24,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		overflow: "hidden",
		// Edge style - no horizontal margins
	},
	cardContent: {
		padding: 24,
		alignItems: "center",
		minHeight: 400,
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
		marginBottom: 12,
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
	buttonDanger: {
		backgroundColor: "#EF4444",
		width: "100%",
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
