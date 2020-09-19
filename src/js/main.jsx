import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import SVG from 'react-inlinesvg'

import '!file-loader?name=styles.css!../css/styles.css'
import Game from "./Game"
import hourglass from "svg-inline-loader!../svg/hourglass.svg" 
import yellowTokenSmiley from "svg-inline-loader!../svg/yellow-token-smiley-^o^.svg"
import redTokenSmiley from "svg-inline-loader!../svg/red-token-smiley-^w^.svg"


ReactDOM.render(
    <Fragment>
        <img src={require("file-loader!../../logo.svg").default} className="logo" />
        <Game />
        {/* <SVG src={yellowTokenSmiley} /> */}
        <div className="turn-indicator-box">
            <div className="turn-indicator-p1">
                <span>Player 1</span>
            </div>
            {/* <div className="timer">
                <SVG src={hourglass} />
                <span>30s</span>
            </div> */}
            <div className="turn-indicator-p2">
                <span>Player 2</span>
            </div>
        </div>
        {/* <SVG src={redTokenSmiley} /> */}
    </Fragment>,
    document.getElementById("react-root"),
)
