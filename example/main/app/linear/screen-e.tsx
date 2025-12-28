import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Morph } from "react-native-morph";

export default function ScreenE() {
	const router = useRouter();

	return (
		<Morph onBackdropPress={() => router.back()}>
			<View style={styles.container}>
				<Morph.Element style={styles.card}>
					<View style={styles.cardContent}>
						<Text style={styles.emoji}>🎉</Text>
						<Text style={styles.title}>Screen E</Text>
						<Text style={styles.subtitle}>Final Screen!</Text>
						<Text style={styles.description}>
							You've reached the end of the linear flow. The morph animation
							should work smoothly going back through all screens.
						</Text>
						<Pressable style={styles.button} onPress={() => router.back()}>
							<Text style={styles.buttonText}>Go Back</Text>
						</Pressable>
						<Pressable
							style={styles.buttonOutline}
							onPress={() => router.dismissAll()}
						>
							<Text style={styles.buttonOutlineText}>Dismiss All</Text>
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
		padding: 32,
		alignItems: "center",
		minHeight: 320,
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
		marginBottom: 24,
		textAlign: "center",
		lineHeight: 24,
	},
	button: {
		backgroundColor: "#007AFF",
		paddingHorizontal: 48,
		paddingVertical: 16,
		borderRadius: 12,
		marginBottom: 12,
		width: "100%",
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
	buttonOutline: {
		borderWidth: 2,
		borderColor: "#007AFF",
		paddingHorizontal: 48,
		paddingVertical: 14,
		borderRadius: 12,
		width: "100%",
		alignItems: "center",
	},
	buttonOutlineText: {
		color: "#007AFF",
		fontSize: 16,
		fontWeight: "600",
	},
});
