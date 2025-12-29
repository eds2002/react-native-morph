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
	borderRadius: number;
	backgroundColor: string;
	scaleFactor: number;
}

export interface MorphProps {
	children: ReactNode;
	borderRadius?: number;
	backgroundColor?: string;
	scaleFactor?: number;
	onBackdropPress?: () => void;
}

export interface MorphScreenProps {
	children: ReactNode;
	style?: ViewStyle;
}

export interface MorphIndicatorProps {
	targetBounds: SharedValue<MaskBounds>;
	borderRadius: number;
}
