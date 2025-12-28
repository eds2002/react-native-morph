import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>React Native Morph</Text>
			<Link href="/linear" style={styles.link}>
				<Text style={styles.linkText}>Linear Example</Text>
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 24,
		fontWeight: "700",
		marginBottom: 32,
	},
	link: {
		backgroundColor: "#007AFF",
		paddingHorizontal: 24,
		paddingVertical: 16,
		borderRadius: 12,
	},
	linkText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
});
