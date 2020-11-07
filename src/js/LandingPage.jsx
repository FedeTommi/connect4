import React from "react"
import PropTypes from "prop-types"
import withStyles from "react-jss"
import { Link } from "react-router-dom" 

import Button from "./components/Button"
import YellowTokenSmiley from "../svg/yellow-token-smiley.svg"
import RedYellowTokens from "../svg/red-yellow-happy-tokens.svg"



const styles = {
    background: {
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    logoStripe: {
        height: "25vh",
        width: "100%",
        display: "flex",
        background: "#ECECEC",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        height: "75%",
    },
    buttonBox: {
        display: "flex",
        flexDirection: "column",
        padding: "30px 0",
    },
    buttonRow: {
        padding: "15px 0",
    },
    button: {
        width: 160,
    },
    smiley: {
        width: 100,
    },
    
}

class LandingPage extends React.Component {
    render() {
        const { classes } = this.props

        return <div className={classes.background} >
            
            <div className={classes.logoStripe}>
                <img
                    src={require("!file-loader!../svg/logo.svg").default}
                    className={classes.logo}
                />
            </div>

            <div className={classes.buttonBox}>
                <div className={classes.buttonRow}>
                    <Button 
                        Component={Link}
                        to='/singleplayer'
                        className={classes.button}
                    >
                        Single player
                    </Button>
                    <YellowTokenSmiley className={classes.smiley} />
                </div>
                <div className={classes.buttonRow}>
                    <Button
                        Component={Link}
                        to='/multiplayer'
                        className={classes.button}
                    >
                        Multiplayer
                    </Button>
                    <RedYellowTokens className={classes.smiley} />
                </div>
            </div>
        </div>
    } 

}

LandingPage.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LandingPage)