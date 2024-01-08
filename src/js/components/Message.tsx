import React from "react"
import Modal from "react-modal"

type MessageProps = {
	text: string
}

const Message: React.FC<MessageProps> = ({ text }) => {
	return <div>{text}</div>
}

export default Message
