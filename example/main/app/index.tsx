import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>React Native Morph</Text>
			<View style={styles.links}>
				<Link href="/linear" style={styles.link}>
					<Text style={styles.linkText}>Linear Example</Text>
				</Link>
				<Link href="/nested" style={[styles.link, styles.linkNested]}>
					<Text style={styles.linkText}>Nested Navigator Example</Text>
				</Link>
				<Link href="/onboarding" style={[styles.link, styles.linkOnboarding]}>
					<Text style={styles.linkText}>Onboarding Flow</Text>
				</Link>
			</View>
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
	links: {
		gap: 16,
	},
	link: {
		backgroundColor: "#007AFF",
		paddingHorizontal: 24,
		paddingVertical: 16,
		borderRadius: 12,
	},
	linkNested: {
		backgroundColor: "#8B5CF6",
	},
	linkOnboarding: {
		backgroundColor: "#6366f1",
	},
	linkText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
});
