import React from "react";
import { useAppDispatch } from "../hooks";
import { selectNotebook } from "../reducer";
import { INotebook } from "../types";


export function Notebook(props: INotebook) {
    const title = props.title;
    const key = props.id;
    const dispatch = useAppDispatch();
    return (
        <div onClick={() => dispatch(selectNotebook(props))}>
            <div key={key} className={"notebook-marker orange"}></div>{title}
        </div>
    );
}