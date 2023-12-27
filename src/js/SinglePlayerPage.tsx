import React, { useCallback, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useHistory } from 'react-router-dom'

import Button from './components/Button'
import Radiobutton from './components/Radiobutton'
import TextInput from './components/TextInput'


const useStyles = createUseStyles({
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
})

const SinglePlayerPage: React.FC<{}> = () => {
    const [nickname, setNickname] = useState("")
    const classes = useStyles()
    const history = useHistory()

    const handleSubmit = useCallback(() => {
        history.push({
            pathname: "/game/",
            search: `?player=P1&nickname=${nickname}`
        })
    }, [nickname])

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(event?.target.value)
    }, [])

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <img
                    src={require('!file-loader!../svg/logo.svg').default}
                    className={classes.logo}
                />

                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextInput
                        className={classes.input}
                        value={nickname}
                        name='nickname'
                        label='Nickname'
                        error={null}
                        onChange={handleChange}
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

export default SinglePlayerPage