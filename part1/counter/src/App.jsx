import { useState } from 'react'

const Display = ({ counter }) => <div>{counter}</div>
const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>{text}</button>
)

function App() {
	const [counter, setCounter] = useState(0)
	const increaseByOne = () => setCounter(counter + 1)
	const decreaseByOne = () => setCounter(counter - 1)
	const setToZero = () => setCounter(0)

	return (
		<>
			<Display counter={counter} />
			<Button handleClick={decreaseByOne} text="-" />
			<Button handleClick={setToZero} text="Reset" />
			<Button handleClick={increaseByOne} text="+" />
		</>
	)
}

export default App
