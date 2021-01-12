import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import { withRouter } from 'react-router-dom'

import Button from './components/Button'
import Radiobutton from './components/Radiobutton'
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

    radioGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
    },

    easy: {
        background: '#86e2fdff',
    },

    easyTriangle: {
        background: '#529cffff',
    },

    medium: {
        background: '#9cfd7aff',
    },

    mediumTriangle: {
        background: '#2bd12ed9',
    },

    hard: {
        background: '#fca100ff',
    },

    hardTriangle: {
        background: '#f76404ff',
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
                            required
                        />
                        <div className={classes.radioGroup}>
                            <Radiobutton className={classes.easy} classes={{ triangle: classes.easyTriangle }}>Easy</Radiobutton>
                            <Radiobutton className={classes.medium} classes={{ triangle: classes.mediumTriangle }}>Medium</Radiobutton>
                            <Radiobutton className={classes.hard} classes={{ triangle: classes.hardTriangle }}>Hard</Radiobutton>
                        </div>
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