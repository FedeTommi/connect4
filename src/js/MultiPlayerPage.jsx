import React from 'react'
import withStyles from 'react-jss'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
    input: {
        width: '80%',
    },
    button: {
        padding: '12px 60px',
    },
}

class MultiPlayerPage extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            formdata: {
                nickname: '',
            }
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        //console.log(value)
        this.setState({ formdata: { nickname: value } })
    }
    
    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <form className={classes.form}>
                    <img
                        src={require("!file-loader!../svg/logo.svg").default}
                        className={classes.logo}
                    />
                    <TextInput
                        className={classes.input}
                        value={this.state.formdata.nickname}
                        label='Nickname'
                        error={null}
                        onChange={this.handleChange}
                        placeholder='John Doe'
                    />
                    <Button
                        Component={Link}
                        to='/game'
                    >
                        Host a new game
                    </Button>
                </form>
            </div>
        )
    }
}

MultiPlayerPage.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MultiPlayerPage)