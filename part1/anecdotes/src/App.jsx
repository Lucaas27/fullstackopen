import { useState } from 'react'

const Button = ({ text, handleClick }) => {
	return <button onClick={handleClick}>{text}</button>
}

const Display = ({ text, votes, max }) => {
	if (max && votes > 0) {
		return (
			<>
				<h1>Anecdote Most Voted </h1>
				<p>{text}</p>
				<p>{votes} vote(s)</p>
			</>
		)
	}
	if (max === false) {
		return (
			<>
				<h1>Anecdote of the day</h1>
				<p>{text}</p>
				<p>{votes} vote(s)</p>
			</>
		)
	} else {
		return null
	}
}

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
		'The only way to go fast, is to go well.',
	]
	// console.log(Math.floor(Math.random() * anecdotes.length) + 1)
	//const values = new Array(anecdotes.length).fill(0)

	const [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
	const maxVote = Math.max(...votes)
	const maxVoteIndex = votes.indexOf(maxVote)

	const handleAnecdote = () => {
		const randomNumber = Math.floor(Math.random() * anecdotes.length)
		setSelected(randomNumber)
	}

	const handleVote = () => {
		const votesCopy = [...votes]
		votesCopy[selected] += 1
		setVotes(votesCopy)
		// console.log(votesCopy)
	}

	return (
		<>
			<Display text={anecdotes[selected]} votes={votes[selected]} max={false} />
			<Display text={anecdotes[maxVoteIndex]} votes={maxVote} max={true} />
			<Button handleClick={handleAnecdote} text="Random anecdote" />
			<Button handleClick={handleVote} text="Vote as good" />
		</>
	)
}

export default App
