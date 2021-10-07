import React from "react";
import { useAppDispatch } from "../hooks";
import { selectNotebook } from "../reducer";
export function Notebook(props) {
    var title = props.title;
    var key = props.id;
    var dispatch = useAppDispatch();
    return (React.createElement("div", { onClick: function () { return dispatch(selectNotebook(props)); } },
        React.createElement("div", { key: key, className: "notebook-marker orange" }),
        title));
}
//# sourceMappingURL=Notebook.js.map