import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Morph } from "react-native-morph";

export default function ScreenA() {
	const router = useRouter();

	return (
		<Morph.Element style={styles.card}>
			<View style={styles.cardContent}>
				<Text style={styles.title}>Screen A</Text>
				<Text style={styles.description}>
					First screen in the linear flow. Tap to navigate forward.
				</Text>
				<Pressable
					style={styles.button}
					onPress={() => router.push("/linear/screen-b")}
				>
					<Text style={styles.buttonText}>Go to Screen B</Text>
				</Pressable>
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
	},
	title: {
		fontSize: 24,
		fontWeight: "700",
		marginBottom: 12,
	},
	description: {
		fontSize: 16,
		color: "#666",
		marginBottom: 24,
		lineHeight: 24,
	},
	button: {
		backgroundColor: "#007AFF",
		padding: 16,
		borderRadius: 12,
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
});
