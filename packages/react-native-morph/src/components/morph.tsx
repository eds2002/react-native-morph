import MaskedView from "@react-native-masked-view/masked-view";
import { StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { INITIAL_MASK_BOUNDS } from "../constants";
import { MorphContext } from "../context";
import type { MaskBounds, MorphProps } from "../types";
import { MorphIndicator } from "./indicator";
import { MorphMasked } from "./masked";

function MorphRoot({ children }: MorphProps) {
	const targetBounds = useSharedValue<MaskBounds>(INITIAL_MASK_BOUNDS);

	return (
		<MorphContext.Provider value={{ targetBounds }}>
			<MaskedView
				style={styles.container}
				maskElement={
					<View style={StyleSheet.absoluteFillObject} pointerEvents="none">
						<MorphIndicator targetBounds={targetBounds} />
					</View>
				}
				pointerEvents="box-none"
			>
				{children}
			</MaskedView>
		</MorphContext.Provider>
	);
}

export const Morph = Object.assign(MorphRoot, {
	Masked: MorphMasked,
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
