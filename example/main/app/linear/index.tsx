import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Morph } from "react-native-morph";

export default function ScreenA() {
	const router = useRouter();

	return (
		<Morph>
			<View style={styles.container}>
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
			</View>
		</Morph>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-end",
		padding: 16,
		paddingBottom: 32,
	},
	card: {
		borderRadius: 24,
		overflow: "hidden",
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
