import { createContext, useContext } from "react";
import type { MorphContextValue } from "./types";

export const MorphContext = createContext<MorphContextValue | null>(null);

export const useMorphContext = () => {
	const context = useContext(MorphContext);
	if (!context) {
		throw new Error(
			"useMorphContext must be used within a MorphContext.Provider",
		);
	}
	return context;
};
