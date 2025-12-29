import MaskedView from "@react-native-masked-view/masked-view";
import { StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { INITIAL_MASK_BOUNDS } from "../constants";
import { MorphContext } from "../context";
import type { MaskBounds, MorphProps } from "../types";
import { MorphIndicator } from "./indicator";
import { MorphMasked } from "./masked";

const DEFAULT_BORDER_RADIUS = 36;

function MorphRoot({
	children,
	borderRadius = DEFAULT_BORDER_RADIUS,
}: MorphProps) {
	const targetBounds = useSharedValue<MaskBounds>(INITIAL_MASK_BOUNDS);

	return (
		<MorphContext.Provider value={{ targetBounds, borderRadius }}>
			<MaskedView
				style={styles.container}
				maskElement={
					<View style={StyleSheet.absoluteFillObject} pointerEvents="none">
						<MorphIndicator
							targetBounds={targetBounds}
							borderRadius={borderRadius}
						/>
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
