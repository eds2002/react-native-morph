import type { ReactNode } from "react";
import type { ViewStyle } from "react-native";
import type { SharedValue } from "react-native-reanimated";

export interface MaskBounds {
	height: number;
	width: number;
	pageX: number;
	pageY: number;
}

export interface MorphContextValue {
	targetBounds: SharedValue<MaskBounds>;
}

export interface MorphProps {
	children: ReactNode;
}

export interface MorphMaskedProps {
	children: ReactNode;
	style?: ViewStyle;
}

export interface MorphIndicatorProps {
	targetBounds: SharedValue<MaskBounds>;
}
