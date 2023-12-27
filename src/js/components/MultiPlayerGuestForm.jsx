import React, { useState } from "react"
import { useStyles } from "../MultiPlayerPage"
import Button from './Button'
import TextInput from './TextInput'
import { Link, withRouter } from 'react-router-dom'


const MultiPlayerGuestForm = (onGameStart) => {
    const classes = useStyles()
    const [state, setState] = useState({nickname: "", code: ""})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    
    const handleChange = (event) => {
        const { value, name } = event.target
        setState({ ...state, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        setError(null)
        // TODO: DO this better Freddy
        const result = await fetch(`http://127.0.0.1:1234/game-exists/?code=${state.code}`, {method: "GET"} )
            .then(res => res.json())
        console.log(result)
        if (result.roomExists) {
            onGameStart({ code: state.code, nickname: state.nickname, player: "P2" })
        } else (
            setError(`The room "${state.code}" does not exist.`)
        )
        setIsLoading(false)
    }

    console.log(state)
    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <TextInput
                className={classes.input}
                name='nickname'
                value={state.nickname}
                label='Nickname'
                error={null}
                onChange={handleChange}
                placeholder='John Doe'
                required
            />
            <TextInput
                className={classes.input}
                value={state.code}
                name='code'
                label='Code'
                error={error}
                onChange={handleChange}
                placeholder='1234'
                required
            />
            <Button className={classes.button}>
                Connect
            </Button>
        </form>
    )
}

export default MultiPlayerGuestForm