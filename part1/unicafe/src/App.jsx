import { useState } from 'react'

const Statistics = ({ feedback }) => {
	if (feedback.good + feedback.neutral + feedback.bad === 0) {
		return (
			<>
				<table>
					<thead>
						<tr>
							<th>
								<h1>Statistics</h1>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>No feedback given</td>
						</tr>
					</tbody>
				</table>
			</>
		)
	} else {
		return (
			<>
				<table>
					<thead>
						<tr>
							<th>
								<h1>Statistics</h1>
							</th>
						</tr>
					</thead>
					<tbody>
						<Statistic text="Good" value={feedback.good} />
						<Statistic text="Neutral" value={feedback.neutral} />
						<Statistic text="Bad" value={feedback.bad} />
						<Statistic
							text="All"
							value={feedback.bad + feedback.good + feedback.neutral}
						/>
						<Statistic
							text="Average"
							value={
								feedback.bad +
								feedback.good +
								feedback.neutral / Object.keys(feedback).length
							}
						/>
						<Statistic
							text="Positive"
							value={`${Math.floor(
								(feedback.good /
									(feedback.bad + feedback.good + feedback.neutral)) *
									100
							)}%`}
						/>
					</tbody>
				</table>
			</>
		)
	}
}

const Statistic = ({ text, value }) => {
	return (
		<tr>
			<td>
				{text} : {value}
			</td>
		</tr>
	)
}

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>{text}</button>
)

const App = () => {
	//feedback object to store good, neutral and bad values to be used in the display component
	const [feedback, setFeedback] = useState({
		good: 0,
		neutral: 0,
		bad: 0,
	})

	const handleGoodClick = () =>
		setFeedback({ ...feedback, good: feedback.good + 1 })

	const handleNeutralClick = () =>
		setFeedback({ ...feedback, neutral: feedback.neutral + 1 })

	const handleBadClick = () =>
		setFeedback({ ...feedback, bad: feedback.bad + 1 })

	return (
		<div>
			<h1>Give feedback</h1>
			<Button handleClick={handleGoodClick} text="Good" />
			<Button handleClick={handleNeutralClick} text="Neutral" />
			<Button handleClick={handleBadClick} text="Bad" />
			<Statistics feedback={feedback} />
		</div>
	)
}

export default App
