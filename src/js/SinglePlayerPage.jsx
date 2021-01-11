import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import { withRouter } from 'react-router-dom'

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

    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        //justifyContent: center
        width: 500,
        maxWidth: '100%',
        margin: 0,
        padding: 20,
        background: '#ECECEC',
        borderRadius: 5,
        boxShadow: '0px 1px 2px #0006',
        '& > *': {
            margin: '20px 0',
        },
    },

    logo: {
        width: '100%',
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    input: {
        width: '80%',
        marginTop: 0,
    },

    button: {
        padding: '12px 60px',
    },
}

class SinglePlayerPage extends React.Component {
    state = {
        nickname: '',
    }

    handleChange = (event) => {
        const { value, name } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = () => {
        this.props.history.push({
            pathname: '/game',
            players: {
                P1: this.state.nickname,
                P2: 'Rob 🤖',
            },
        })
    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <img
                        src={require('!file-loader!../svg/logo.svg').default}
                        className={classes.logo}
                    />

                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <TextInput
                            className={classes.input}
                            value={this.state.nickname}
                            name='nickname'
                            label='Nickname'
                            error={null}
                            onChange={this.handleChange}
                            placeholder='John Doe'
                            autoFocus
                        />
                        <Button className={classes.button}>
                            Play
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

SinglePlayerPage.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(SinglePlayerPage))