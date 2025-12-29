import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Morph } from "react-native-morph";
import { Button } from "@/components/button";

export default function ScreenB() {
	const router = useRouter();

	return (
		<Morph.Screen style={styles.card}>
			<View style={styles.cardContent}>
				<Text style={styles.title}>Screen B</Text>
				<Text style={styles.subtitle}>A Taller Card</Text>
				<Text style={styles.description}>
					This card has more content to test morphing between different heights.
					The animation should smoothly interpolate the bounds.
				</Text>
				<View style={styles.buttonRow}>
					<Button
						title="Go to C"
						onPress={() => router.push("/linear/screen-c")}
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
		</Morph.Screen>
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
	flex: {
		flex: 1,
	},
});
