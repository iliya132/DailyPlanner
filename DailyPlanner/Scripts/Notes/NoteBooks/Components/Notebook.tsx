import React from "react";
import { useAppDispatch } from "../hooks";
import { selectNotebook } from "../reducer";
import { INotebook } from "../types";


export function Notebook(props: INotebook) {
    const title = props.name;
    const key = props.id;
    const cssStyle = { "backgroundColor": props.color } as React.CSSProperties;
    const dispatch = useAppDispatch();
    return (
        <div onClick={() => dispatch(selectNotebook(props))}>
            <div key={key} className={"notebook-marker"} style={cssStyle}></div>{title}
        </div>
    );
}