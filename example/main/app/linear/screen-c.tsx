import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Morph } from "react-native-morph";
import { Button } from "@/components/button";

export default function ScreenC() {
	const router = useRouter();

	return (
		<Morph.Element style={styles.card}>
			<View style={styles.cardContent}>
				<Text style={styles.emoji}>🎯</Text>
				<Text style={styles.title}>Screen C</Text>
				<Text style={styles.description}>Compact centered card layout.</Text>
				<View style={styles.buttonRow}>
					<Button
						title="Go to D"
						onPress={() => router.push("/linear/screen-d")}
						style={styles.flex}
					/>
					<Button
						title="Back"
						variant="secondary"
						onPress={() => router.back()}
						style={styles.flex}
					/>
				</View>
			</View>
		</Morph.Element>
	);
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 24,
		overflow: "hidden",
		height: 600,
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
	flex: {
		flex: 1,
	},
});
