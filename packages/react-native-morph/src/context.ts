import { createContext } from "react";
import type { MorphContextValue } from "./types";

export const MorphContext = createContext<MorphContextValue | null>(null);
