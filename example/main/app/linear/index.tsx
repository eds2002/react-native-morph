import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Morph } from "react-native-morph";
import { Button } from "@/components/button";

export default function ScreenA() {
	const router = useRouter();

	return (
		<Morph.Masked style={styles.card}>
			<View style={styles.cardContent}>
				<Text style={styles.title}>Screen A</Text>
				<Text style={styles.description}>
					First screen in the linear flow. Tap to navigate forward.
				</Text>
				<Button
					title="Go to Screen B"
					onPress={() => router.push("/linear/screen-b")}
				/>
			</View>
		</Morph.Masked>
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
});
