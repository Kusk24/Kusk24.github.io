import type { Dict, Lang } from "../types";
import en from "./en";
import th from "./th";
import my from "./my";

export const dictionaries: Record<Lang, Dict> = { en, th, my };
