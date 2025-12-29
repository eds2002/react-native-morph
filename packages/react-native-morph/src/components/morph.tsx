import MaskedView from "@react-native-masked-view/masked-view";
import { Pressable, StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { INITIAL_MASK_BOUNDS } from "../constants";
import { MorphContext } from "../context";
import type { MaskBounds, MorphProps } from "../types";
import { MorphIndicator } from "./indicator";
import { MorphScreen } from "./screen";

const DEFAULT_BORDER_RADIUS = 36;
const DEFAULT_BACKGROUND_COLOR = "white";
const DEFAULT_SCALE_FACTOR = 0.1;

function MorphRoot({
	children,
	borderRadius = DEFAULT_BORDER_RADIUS,
	backgroundColor = DEFAULT_BACKGROUND_COLOR,
	scaleFactor = DEFAULT_SCALE_FACTOR,
	onBackdropPress,
}: MorphProps) {
	const targetBounds = useSharedValue<MaskBounds>(INITIAL_MASK_BOUNDS);

	const content = onBackdropPress ? (
		<Pressable style={styles.backdrop} onPress={onBackdropPress}>
			{children}
		</Pressable>
	) : (
		children
	);

	return (
		<MorphContext.Provider
			value={{ targetBounds, borderRadius, backgroundColor, scaleFactor }}
		>
			<MaskedView
				style={styles.container}
				maskElement={
					<View style={StyleSheet.absoluteFillObject} pointerEvents="none">
						<MorphIndicator />
					</View>
				}
				pointerEvents="box-none"
			>
				{content}
			</MaskedView>
		</MorphContext.Provider>
	);
}

export const Morph = Object.assign(MorphRoot, {
	Screen: MorphScreen,
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	backdrop: {
		flex: 1,
	},
});
