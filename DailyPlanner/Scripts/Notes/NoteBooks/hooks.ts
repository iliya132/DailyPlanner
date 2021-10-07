﻿import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const notebooksSelector: TypedUseSelectorHook<RootState> = useSelector;
