import { Pressable, StyleSheet, Text, type ViewStyle } from "react-native";

interface ButtonProps {
	title: string;
	onPress: () => void;
	variant?: "primary" | "secondary";
	style?: ViewStyle;
}

export function Button({
	title,
	onPress,
	variant = "primary",
	style,
}: ButtonProps) {
	const isPrimary = variant === "primary";

	return (
		<Pressable
			style={[styles.button, !isPrimary && styles.buttonSecondary, style]}
			onPress={onPress}
		>
			<Text
				style={[styles.buttonText, !isPrimary && styles.buttonTextSecondary]}
			>
				{title}
			</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#000",
		paddingVertical: 18,
		paddingHorizontal: 32,
		borderRadius: 100,
		alignItems: "center",
	},
	buttonSecondary: {
		backgroundColor: "#f0f0f0",
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "600",
	},
	buttonTextSecondary: {
		color: "#333",
	},
});
