import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Morph } from "react-native-morph";

export default function NestedIndex() {
	const router = useRouter();

	return (
		<Morph.Element style={styles.card}>
			<View style={styles.cardContent}>
				<Text style={styles.emoji}>🪆</Text>
				<Text style={styles.title}>Nested Navigator</Text>
				<Text style={styles.description}>
					This demonstrates morph animations working across nested navigators.
				</Text>
				<Pressable
					style={styles.button}
					onPress={() => router.push("/nested/stack-a")}
				>
					<Text style={styles.buttonText}>Enter Nested Stack</Text>
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
	button: {
		backgroundColor: "#8B5CF6",
		padding: 16,
		borderRadius: 12,
		alignItems: "center",
		width: "100%",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
});
