import React, { FormEvent, useState } from "react"
import Button from "./Button"
import TextInput from "./TextInput"
import { useStyles } from "../MultiPlayerPage"

type MultiPlayerHostFormProps = {
	onGameStart: ({
		code,
		nickname,
		player,
	}: {
		code: string
		nickname: string
		player: string
	}) => any
}
const MultiPlayerHostForm = ({ onGameStart }: MultiPlayerHostFormProps) => {
	const classes = useStyles()
	const [nickname, setNickname] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	const handleChange = (event: React.ChangeEvent) => {
		setNickname((event.target as HTMLInputElement).value)
	}

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()
		setIsLoading(true)
		const result = await fetch("/api/new-game", {
			method: "POST",
			body: JSON.stringify({ nickname }),
		}).then((res) => res.json())
		setIsLoading(false)
		onGameStart({ code: result.code, nickname, player: "P1" })
	}

	return (
		<form className={classes.form} onSubmit={handleSubmit}>
			<TextInput
				className={classes.input}
				name="nickname"
				value={nickname}
				label="Nickname"
				error={null}
				onChange={handleChange}
				placeholder="John Doe"
				autoFocus
				required
				disabled={isLoading}
			/>
			<Button className={classes.button}>Host a new game</Button>
		</form>
	)
}

export default MultiPlayerHostForm
