import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Morph } from "react-native-morph";

export default function ScreenD() {
	const router = useRouter();

	return (
		<Morph.Element style={styles.card}>
			<View style={styles.cardContent}>
				<Text style={styles.title}>Screen D</Text>
				<Text style={styles.description}>
					Testing a very tall card with lots of content to see how the morph
					handles significant height changes.
				</Text>
				<View style={styles.infoRow}>
					<View style={styles.infoItem}>
						<Text style={styles.infoValue}>42</Text>
						<Text style={styles.infoLabel}>Items</Text>
					</View>
					<View style={styles.infoItem}>
						<Text style={styles.infoValue}>128</Text>
						<Text style={styles.infoLabel}>Points</Text>
					</View>
					<View style={styles.infoItem}>
						<Text style={styles.infoValue}>7</Text>
						<Text style={styles.infoLabel}>Level</Text>
					</View>
				</View>
				<Text style={styles.description}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
					euismod, nisi vel consectetur interdum.
				</Text>
				<View style={styles.buttonRow}>
					<Pressable
						style={styles.button}
						onPress={() => router.push("/linear/screen-e")}
					>
						<Text style={styles.buttonText}>Go to E</Text>
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
		minHeight: 400,
	},
	title: {
		fontSize: 28,
		fontWeight: "700",
		marginBottom: 12,
	},
	description: {
		fontSize: 16,
		color: "#666",
		marginBottom: 20,
		lineHeight: 24,
	},
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 20,
		paddingVertical: 16,
		backgroundColor: "#f8f8f8",
		borderRadius: 12,
	},
	infoItem: {
		alignItems: "center",
	},
	infoValue: {
		fontSize: 24,
		fontWeight: "700",
		color: "#007AFF",
	},
	infoLabel: {
		fontSize: 14,
		color: "#666",
		marginTop: 4,
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
