import React, { ChangeEvent } from "react"
import { createUseStyles } from "react-jss"

//https://medium.com/@willhowardgb/building-a-beautiful-text-input-component-in-react-f85564cc7e86

const INPUT_HEIGHT = 30
const LABEL_HEIGHT = 15

const useStyles = createUseStyles({
	wrapper: {
		fontFamily: '"Bubblegum Sans", cursive',
		marginBottom: 20,
		marginTop: 20,
	},
	label: {
		display: "flex",
		alignItems: "flex-start",
		flexDirection: "column-reverse",
		padding: "2px 10px",
		borderRadius: 5,
		position: "relative",
		backgroundColor: "rgba(255,255,255,0.4)",
		transition: "0.3s all",
		//transition: '0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out'
		boxShadow: "2px 2px 4px grey",

		cursor: "text",

		"&:hover": {
			backgroundColor: "white",
		},
	},

	input: {
		width: "100%",
		height: INPUT_HEIGHT,
		background: "transparent",
		overflow: "hidden",
		border: 0,
		outline: 0,
		opacity: 0,
		color: "#555",
		// textAlign: 'center',
		fontSize: `${(INPUT_HEIGHT * 3) / 4}`,
		transform: `translateY(-${LABEL_HEIGHT / 2}px)`,
		"&, & + $labelText": {
			fontFamily: '"Bubblegum Sans", cursive',
			transition:
				"transform .1s ease-in-out, opacity .1s ease-in-out, color .1s ease-in-out",
		},
		"&:focus, &:not(:placeholder-shown)": {
			"&, & + $labelText": {
				transform: "translateY(0) scale(1)",
				opacity: 1,
			},
			"& + $labelText": {
				color: "var(--tiffany-extra-dark)",
			},
		},
		// https://medium.com/@TusharKanjariya/input-floating-labels-using-only-pure-css-80d5f99831e3
		// https://css-tricks.com/float-labels-css/
	},

	labelText: {
		width: "auto",
		display: "block",
		color: "#C3C1C1",
		fontSize: LABEL_HEIGHT,
		lineHeight: `${LABEL_HEIGHT}px`,
		transformOrigin: "left",
		transform: `translateY(${INPUT_HEIGHT / 2}px) scale(${
			INPUT_HEIGHT / LABEL_HEIGHT
		})`,
	},

	error: {
		fontSize: LABEL_HEIGHT,
		color: "#a40000",
		padding: [10, 10, 0, 10],
		display: "inline-block",
	},
})

type TextInputProps = {
	className?: string
	value: string
	error?: string | null
	label: string
	onChange: (event: ChangeEvent<HTMLInputElement>) => any
	placeholder: string
	[x: string]: any
}

const TextInput: React.FC<TextInputProps> = ({
	value,
	error,
	label,
	className,
	onChange,
	...rest
}) => {
	const classes = useStyles()

	return (
		<div className={`${classes.wrapper} ${className}`}>
			<label className={classes.label}>
				<input
					className={classes.input}
					type="text"
					value={value}
					onChange={onChange}
					{...rest}
				/>
				<span className={classes.labelText}>{label}</span>
			</label>
			{error && <span className={classes.error}>{error}</span>}
		</div>
	)
}

export default TextInput
