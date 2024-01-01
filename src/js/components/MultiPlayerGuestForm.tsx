import React, { FormEvent, useState } from "react"
import { useStyles } from "../MultiPlayerPage"
import Button from "./Button"
import TextInput from "./TextInput"
import { GameExistsResponse } from "../../.."

type MultiPlayerGuestFormProps = {
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

const MultiPlayerGuestForm = ({ onGameStart }: MultiPlayerGuestFormProps) => {
	const classes = useStyles()
	const [state, setState] = useState({ nickname: "", code: "" })
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleChange = (event: React.ChangeEvent) => {
		const { value, name } = event.target as HTMLInputElement
		setState({ ...state, [name]: value })
	}

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()
		setIsLoading(true)
		setError(null)
		const result = (await fetch(`/api/game-exists/?code=${state.code}`).then(
			(res) => res.json(),
		)) as GameExistsResponse
		setIsLoading(false)
		console.log("result", result)
		if (result.gameExists) {
			onGameStart({ code: state.code, nickname: state.nickname, player: "P2" })
		} else setError(`The room "${state.code}" does not exist.`)
	}

	return (
		<form className={classes.form} onSubmit={handleSubmit}>
			<TextInput
				className={classes.input}
				name="nickname"
				value={state.nickname}
				label="Nickname"
				error={null}
				onChange={handleChange}
				placeholder="John Doe"
				required
			/>
			<TextInput
				className={classes.input}
				value={state.code}
				name="code"
				label="Code"
				error={error}
				onChange={handleChange}
				placeholder="1234"
				required
			/>
			<Button disabled={isLoading} className={classes.button}>
				Connect
			</Button>
		</form>
	)
}

export default MultiPlayerGuestForm
