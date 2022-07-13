import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../services/types";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
