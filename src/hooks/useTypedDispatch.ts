import { useDispatch } from "react-redux";
import { AppDispatch, AppThunk } from "../services/types";

export const useTypedDispatch: () => AppDispatch | AppThunk = useDispatch;
