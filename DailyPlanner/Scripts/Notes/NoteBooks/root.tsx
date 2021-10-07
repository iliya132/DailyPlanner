import React from 'react'
import ReactDOM from 'react-dom'
import { store } from './store'
import { Provider } from 'react-redux'
import { NotebooksList } from './Components/NotebooksList'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <NotebooksList />
        </Provider>
    </React.StrictMode>,
    document.getElementById("notebooks-root")
)