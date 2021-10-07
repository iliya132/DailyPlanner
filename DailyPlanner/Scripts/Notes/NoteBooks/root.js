import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import { NotebooksList } from './Components/NotebooksList';
ReactDOM.render(React.createElement(React.StrictMode, null,
    React.createElement(Provider, { store: store },
        React.createElement(NotebooksList, null))), document.getElementById("notebooks-root"));
//# sourceMappingURL=root.js.map