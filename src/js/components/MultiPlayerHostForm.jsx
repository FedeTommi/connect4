import React, { useState } from "react"
import Button from './Button'
import TextInput from './TextInput'
import { useStyles } from "../MultiPlayerPage"


const MultiPlayerHostForm = ({ onGameStart }) => {
    const classes = useStyles()
    const [nickname, setNickname] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (event) => {
        setNickname(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        const result = await fetch('http://127.0.0.1:1234/new-game', {
            method: "POST",
            body: JSON.stringify({nickname})
        })
            .then(res => res.json())
        setIsLoading(false)
        onGameStart({ code: result.code, nickname, player: "P1" })
    }

    

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <TextInput
                className={classes.input}
                name='nickname'
                value={nickname}
                label='Nickname'
                error={null}
                onChange={handleChange}
                placeholder='John Doe'
                autoFocus
                required
                disabled={isLoading}
            />
            <Button className={classes.button}>
                Host a new game
            </Button>
        </form>
    )
}

export default MultiPlayerHostForm