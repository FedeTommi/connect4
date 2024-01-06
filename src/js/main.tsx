import React from "react"
import ReactDOM from "react-dom/client"

import "!file-loader?name=styles.css!../css/styles.css"
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("react-root")!)
root.render(<App />)
