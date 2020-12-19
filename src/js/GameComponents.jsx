import React, { Fragment } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import { Link } from 'react-router-dom'

import GameBoard from './GameBoard'
import Button from './components/Button'
import Hourglass from '../svg/hourglass.svg'
import Logo from '../svg/logo.svg'


const styles = {
    background: {
        // background: '#EEEEEE',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',   
        alignItems: 'center',
        justifyContent: 'center',
        
        // zIndex: -1,
    },
    wrapper: {
        width: 380,
        justifyContent: 'center',
        display:'inline-block',
        background: '#EEEEEE',
        boxShadow: '0px 1px 2px #0006',
        borderRadius: 5,
        padding: 10,
    },
    logo: {
        boxSizing: 'border-box',
        width: '100%',
        marginTop: 20,
        marginBottom: 30,
    },
    pauseButton: {
        position: 'absolute',
        left: 0,
        top: 0,
        margin: 20,
        fontWeight: 'bold',
        fontSize: 35,
    },
    button: {
        margin: 10,
        fontSize: 35,
    },
    winModalHeader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2px 10px',
        borderRadius: 5,
        position: 'relative',
        backgroundColor: 'rgba(255,255,255,0.4)',
        boxShadow: '2px 2px 4px grey',
        margin: 10,
        // height: 50,
        fontSize: 30,
        cursor: 'text',
        fontFamily: 'Bubblegum Sans',
    },
    turnField: {
        background: 'white',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        // boxShadow: '2px 2px 4px grey',
        // boxShadow: '0px 1px 2px #0006',
        justifyContent: 'space-between',
        alignItems: 'center',

        '& > span': {
            fontFamily: 'Bubblegum Sans, cursive',
            fontSize: 30,
            /* font-weight: 400, */
            margin: 10,
            textShadow: '0px 1px 2px #0009', 
        },
    },
    player1: {
        color: 'var(--p1-color)',
        flex: 1,
    },
    player2: {
        color: 'var(--p2-color)',
        flex: 1,
        textAlign: 'right',
    },
    hourglass: {
        height: 50,
    },
    timer: {
        fontFamily: '"Bubblegum Sans", cursive',
        fontSize: 20,
        color: 'black',
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
    }
}

const pauseModalStyles = {
    content: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        inset: 0,
        padding: '20px 80px',
    },
    overlay: {
        background: '#0004',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
}

const winModalStyles = {
    content: {
        padding: 30,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        inset: 0,
    },
    overlay: {
        // background: 'var(--tiffany-extra-dark)',
        background: '#0009',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    }
}

class GameComponents extends React.Component {
    constructor() {
        super()

        this.state = {
            pauseModalIsOpen: false,
        }

        this.handlePause = this.handlePause.bind(this)
        this.handleResume = this.handleResume.bind(this)
    }

    handlePause() {
        this.setState({ pauseModalIsOpen: true }) 
    }

    handleResume() {
        this.setState({ pauseModalIsOpen: false })
    }

    render() {
        const { classes, players, winningPlayerID, scores, onNewGame, ...rest } = this.props

        return <Fragment>
            <Modal  
                isOpen={this.state.pauseModalIsOpen}
                onRequestClose={this.handleResume}
                style={pauseModalStyles}
            >
                <Button
                    className={classes.button}
                    onClick={this.handleResume}
                >
                    Resume 
                </Button>
                <Button
                    className={classes.button}
                    Component={Link}
                    to='/'
                >
                    Back to menu
                </Button>
            </Modal>
            <Modal
                isOpen={winningPlayerID !== null}
                onRequestClose={this.handleResume}
                style={winModalStyles}>
                <div className={classes.winModalHeader}>
                    {players[winningPlayerID]} won
                </div>
                <div>
                    {players.P1} {scores.P1} : {scores.P2} {players.P2}
                </div>
                <Button
                    className={classes.button}
                    onClick={onNewGame}
                >
                    Play again
                </Button>
                <Button
                    className={classes.button}
                    Component={Link}
                    to='/'>
                    Back to main menu
                </Button>
            </Modal>

            <div className={classes.background}>
                <Button
                    className={classes.pauseButton}
                    onClick={this.handlePause}
                >
                    | |
                </Button>
                <div className={classes.wrapper}>
                    <Logo className={classes.logo} />
                    <GameBoard {...rest} />
                    <div className={classes.turnField}>
                        <span className={classes.player1}>
                            {players.P1}
                        </span>
                        <div className={classes.timer}>
                            <Hourglass className={classes.hourglass} />
                            <div>30</div>
                        </div>
                        <span className={classes.player2}>
                            {players.P2}
                        </span>
                    </div>  
                </div>
            </div>
        </Fragment>
    }
}

GameComponents.propTypes = {
    classes: PropTypes.object.isRequired,
    players: PropTypes.object.isRequired,
    winningPlayerID: PropTypes.string,
    onNewGame: PropTypes.func.isRequired,
    scores: PropTypes.object.isRequired,
}

export default withStyles(styles)(GameComponents)