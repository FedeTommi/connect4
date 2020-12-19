import React from 'react'
import withStyles from 'react-jss'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'

import Button from './components/Button'
import TextInput from './components/TextInput'

const styles = {
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        width: '100%',
        margin: '20px 0',
    },

    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        width: 500,
        maxWidth: '100%',
        margin: 0,
        padding: 20,
        background: '#ECECEC',
        borderRadius: 5,
        boxShadow: '0px 1px 2px #0006',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px 0',
    },
    input: {
        width: '80%',
        marginTop: 0,
    },
    button: {
        padding: '12px 60px',
    },
    separator: {
        fontFamily: '"Bubblegum Sans", cursive',
        fontSize: 18,
        color: '#555',
        textAlign: 'center',
    }
}

class MultiPlayerPage extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            formdata: {
                nickname: '',
                code: '',
            }
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit() {
        this.props.history.push({
            pathname: '/connect/12345678',
            players: {
                P1: this.state.nickname,
                P2: '',
            },
        })
    }
    
    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <img
                        src={require("!file-loader!../svg/logo.svg").default}
                        className={classes.logo}
                    />
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <TextInput
                            className={classes.input}
                            value={this.state.formdata.nickname}
                            label='Nickname'
                            error={null}
                            onChange={this.handleChange}
                            placeholder='John Doe'
                        />
                        <Button
                            className={classes.button}
                            Component={Link}
                            to='/game'
                        >
                            Host a new game
                        </Button>
                    </form>
                    <div className={classes.separator}>
                        — OR —
                    </div>
                    <form className={classes.form}>
                        <TextInput
                            className={classes.input}
                            value={this.state.formdata.code}
                            label='Code'
                            error={null}
                            onChange={this.handleChange}
                            placeholder='1234'
                        />
                        <Button
                            className={classes.button}
                            Component={Link}
                            to='/game'
                        >
                            Connect
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

MultiPlayerPage.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(MultiPlayerPage))