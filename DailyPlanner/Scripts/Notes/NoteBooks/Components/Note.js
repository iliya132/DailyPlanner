import React from "react";
import { useAppDispatch } from "../hooks";
import { selectNote } from "../reducer";
export function Note(props) {
    var dispatch = useAppDispatch();
    return (React.createElement("div", { onClick: function () { return dispatch(selectNote(props.record)); }, className: "note" + (props.isSelected ? " active" : ""), key: props.record.id },
        React.createElement("h3", null, props.record.name),
        React.createElement("p", null, props.record.createdAt)));
}
//# sourceMappingURL=Note.js.map