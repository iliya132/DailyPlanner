import React from "react";
import { useAppDispatch } from "../hooks";
import { selectNotebook } from "../reducer";
export function Notebook(props) {
    var title = props.name;
    var key = props.id;
    var cssStyle = { "backgroundColor": props.color };
    var dispatch = useAppDispatch();
    return (React.createElement("div", { onClick: function () { return dispatch(selectNotebook(props)); } },
        React.createElement("div", { key: key, className: "notebook-marker", style: cssStyle }),
        title));
}
//# sourceMappingURL=Notebook.js.map