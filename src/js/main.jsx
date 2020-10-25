import React from 'react'
import ReactDOM from 'react-dom'

import '!file-loader?name=styles.css!../css/styles.css'
import App from "./App"

ReactDOM.render(
    <App />,
    document.getElementById("react-root"),
)