import { useState } from 'react'

// A function that takes a counter and returns a string to be used as the content
const Display = ({ counter }) => <div>{counter}</div>
// Creates a function that can be used to create a button on the page. The function takes two arguments : the handleClick function and the text
const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>{text}</button>
)

/**
 * This component is used to display reset and increase buttons.
 * Increases by one and decreases by one. Sets to zero when reset button is clicked.
 * The counter is updated to reflect the change and can be used to reset the counter in the component.
 */
const App = () => {
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
