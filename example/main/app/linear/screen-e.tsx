import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Morph } from "react-native-morph";
import { Button } from "@/components/button";

export default function ScreenE() {
	const router = useRouter();

	return (
		<Morph.Element style={styles.card}>
			<View style={styles.cardContent}>
				<Text style={styles.emoji}>🎉</Text>
				<Text style={styles.title}>Screen E</Text>
				<Text style={styles.subtitle}>Final Screen!</Text>
				<Text style={styles.description}>
					You&apos;ve reached the end of the linear flow. The morph animation
					should work smoothly going back through all screens.
				</Text>
				<Button
					title="Go Back"
					onPress={() => router.back()}
					style={styles.fullWidth}
				/>
				<Button
					title="Dismiss All"
					variant="secondary"
					onPress={() => router.dismissAll()}
					style={styles.fullWidth}
				/>
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
		minHeight: 320,
		gap: 12,
	},
	emoji: {
		fontSize: 64,
		marginBottom: 16,
	},
	title: {
		fontSize: 28,
		fontWeight: "700",
		marginBottom: 4,
		textAlign: "center",
	},
	subtitle: {
		fontSize: 18,
		color: "#34C759",
		fontWeight: "600",
		marginBottom: 16,
	},
	description: {
		fontSize: 16,
		color: "#666",
		marginBottom: 12,
		textAlign: "center",
		lineHeight: 24,
	},
	fullWidth: {
		width: "100%",
	},
});
