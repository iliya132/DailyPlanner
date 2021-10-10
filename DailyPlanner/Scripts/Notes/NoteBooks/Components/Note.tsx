import React from "react";
import { useAppDispatch } from "../hooks";
import { selectNote } from "../reducer";
import { IRecord } from "../types";

interface INoteElementProps {
    record: IRecord,
    isSelected:boolean
}

export function Note(props: INoteElementProps) {
    const dispatch = useAppDispatch();
    return (
        <div onClick={() => dispatch(selectNote(props.record))} className={`note${props.isSelected ? " active" : ""}`} key={props.record.id}>
            <h3>{props.record.name}</h3>
            <p>{props.record.createdAt}</p>
        </div>
    );
}