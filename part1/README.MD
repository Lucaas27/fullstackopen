## 1.2

```react
const App = () => {
 const course = 'Half Stack application development'
 const part1 = 'Fundamentals of React'
 const exercises1 = 10
 const part2 = 'Using props to pass data'
 const exercises2 = 7
 const part3 = 'State of a component'
 const exercises3 = 14

 return (
  <div className="container">
   <Header course={course} />
   <Content
    part1={part1}
    exercises1={exercises1}
    part2={part2}
    exercises2={exercises2}
    part3={part3}
    exercises3={exercises3}
   />
   <Total exercises={exercises1 + exercises2 + exercises3} />
  </div>
 )
}

const Header = (props) => {
 return (
  <>
   <h1>{props.course}</h1>
  </>
 )
}

const Part = (props) => {
 return (
  <>
   <p>
    {props.part} {props.exercises} exercises
   </p>
  </>
 )
}

const Content = (props) => {
 return (
  <>
   <Part part={props.part1} exercises={props.exercises1} />
   <Part part={props.part2} exercises={props.exercises2} />
   <Part part={props.part3} exercises={props.exercises3} />
  </>
 )
}

const Total = (props) => {
 return (
  <>
   <p>Number of exercises {props.exercises}</p>
  </>
 )
}

export default App
```

## 1.3

```react

const App = () => {
 const course = 'Half Stack application development'
 const part1 = {
  name: 'Fundamentals of React',
  exercises: 10,
 }
 const part2 = {
  name: 'Using props to pass data',
  exercises: 7,
 }
 const part3 = {
  name: 'State of a component',
  exercises: 14,
 }

 return (
  <div className="container">
   <Header course={course} />
   <Content
    part1={part1.name}
    exercises1={part1.exercises}
    part2={part2.name}
    exercises2={part2.exercises}
    part3={part3.name}
    exercises3={part3.exercises}
   />
   <Total exercises={part1.exercises + part2.exercises + part3.exercises} />
  </div>
 )
}

const Header = (props) => {
 return (
  <>
   <h1>{props.course}</h1>
  </>
 )
}

const Part = (props) => {
 return (
  <>
   <p>
    {props.part} {props.exercises} exercises
   </p>
  </>
 )
}

const Content = (props) => {
 return (
  <>
   <Part part={props.part1} exercises={props.exercises1} />
   <Part part={props.part2} exercises={props.exercises2} />
   <Part part={props.part3} exercises={props.exercises3} />
  </>
 )
}

const Total = (props) => {
 return (
  <>
   <p>Number of exercises {props.exercises}</p>
  </>
 )
}

export default App

```

## 1.4

```react
const App = () => {
 const course = 'Half Stack application development'
 const parts = [
  {
   name: 'Fundamentals of React',
   exercises: 10,
  },
  {
   name: 'Using props to pass data',
   exercises: 7,
  },
  {
   name: 'State of a component',
   exercises: 14,
  },
 ]

 return (
  <div className="container">
   <Header course={course} />
   <Content parts={parts} />
   <Total parts={parts} />
  </div>
 )
}

const Header = (props) => {
 return (
  <>
   <h1>{props.course}</h1>
  </>
 )
}

const Part = (props) => {
 return (
  <>
   <p>
    {props.part} {props.exercises} exercises
   </p>
  </>
 )
}

const Content = (props) => {
 return (
  <>
   <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
   <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
   <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
  </>
 )
}

const Total = (props) => {
 return (
  <>
   <p>
    Number of exercises =
    {props.parts[0].exercises +
     props.parts[1].exercises +
     props.parts[2].exercises}
   </p>
  </>
 )
}

export default App

```

## 1.5

```react
const App = () => {
 const course = {
  name: 'Half Stack application development',
  parts: [
   {
    name: 'Fundamentals of React:',
    exercises: 10,
   },
   {
    name: 'Using props to pass data:',
    exercises: 7,
   },
   {
    name: 'State of a component:',
    exercises: 14,
   },
  ],
 }

 return (
  <div className="container">
   <Header course={course.name} />
   <Content parts={course.parts} />
   <Total parts={course.parts} />
  </div>
 )
}

const Header = (props) => {
 return (
  <>
   <h1>{props.course}</h1>
  </>
 )
}

const Part = (props) => {
 return (
  <>
   <p>
    {props.part} {props.exercises} exercises
   </p>
  </>
 )
}

const Content = (props) => {
 return (
  <>
   <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
   <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
   <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
  </>
 )
}

const Total = (props) => {
 return (
  <>
   <p>
    Number of exercises:{' '}
    {props.parts[0].exercises +
     props.parts[1].exercises +
     props.parts[2].exercises}
   </p>
  </>
 )
}

export default App

```

### Defining Methods in Objects

We can assign methods to an object by defining properties that are functions:

```javascript
const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
  greet: function() {
    console.log('hello, my name is ' + this.name)
  },
}

arto.greet()  // "hello, my name is Arto Hellas" gets printed

```

Methods can be assigned to objects even after the creation of the object:

```javascript
const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
  greet: function() {
    console.log('hello, my name is ' + this.name)
  },
}

arto.growOlder = function() {
  this.age += 1
}

console.log(arto.age)   // 35 is printed
arto.growOlder()
console.log(arto.age)   // 36 is printed
```

## 1.6

```react
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback </h1>
      <button onClick={() => setGood(good+1)}>good </button>
       <button onClick={() => setNeutral(neutral+1)}>neutral </button>
        <button onClick={() => setBad(bad+1)}>bad </button>

        <h1>Statistic</h1>

        <p>good {good} </p>
       <p>neutral {neutral} </p>
        <p>bad {bad} </p>
        
    </div>
  )
}
```

## 1.7

```react
import { useState } from 'react'

const Display = ({ feedback }) => {
 return (
  <>
   <h1>Statistics</h1>
   <p>Good {feedback.good}</p>
   <p>Neutral {feedback.neutral}</p>
   <p>Bad {feedback.bad}</p>
   <p>All {feedback.bad + feedback.good + feedback.neutral}</p>
   <p>
    Average{' '}
    {Math.floor(feedback.bad + feedback.good + feedback.neutral / 3)}
   </p>
   <p>
    Positive{' '}
    {Math.floor(
     ((feedback.good + feedback.neutral) /
      (feedback.bad + feedback.good + feedback.neutral)) *
      100
    )}{' '}
    %
   </p>
  </>
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
   <Display feedback={feedback} />
  </div>
 )
}

export default App
```

## 1.8

```react
import { useState } from 'react'

const Statistics = ({ feedback }) => {
 return (
  <>
   <h1>Statistics</h1>
   <p>Good {feedback.good}</p>
   <p>Neutral {feedback.neutral}</p>
   <p>Bad {feedback.bad}</p>
   <p>All {feedback.bad + feedback.good + feedback.neutral}</p>
   <p>
    Average{' '}
    {Math.floor(feedback.bad + feedback.good + feedback.neutral / 3)}
   </p>
   <p>
    Positive{' '}
    {Math.floor(
     ((feedback.good + feedback.neutral) /
      (feedback.bad + feedback.good + feedback.neutral)) *
      100
    )}{' '}
    %
   </p>
  </>
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

```

## 1.9

```react
import { useState } from 'react'

const Statistics = ({ feedback }) => {
 if (feedback.good + feedback.neutral + feedback.bad === 0) {
  return (
   <>
    <h1>Statistics</h1>
    <p>No feedback given</p>
   </>
  )
 } else {
  return (
   <>
    <h1>Statistics</h1>
    <p>Good {feedback.good}</p>
    <p>Neutral {feedback.neutral}</p>
    <p>Bad {feedback.bad}</p>
    <p>All {feedback.bad + feedback.good + feedback.neutral}</p>
    <p>
     Average{' '}
     {Math.floor(feedback.bad + feedback.good + feedback.neutral / 3)}
    </p>
    <p>
     Positive{' '}
     {Math.floor(
      ((feedback.good + feedback.neutral) /
       (feedback.bad + feedback.good + feedback.neutral)) *
       100
     )}{' '}
     %
    </p>
   </>
  )
 }
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
```

## 1.10

```react

const Statistics = ({ good, neutral, bad }) => {
  if(good + neutral +bad === 0){
    return(<div>
            <h1>Statistic</h1>
            <p>No feedback gathered </p>

    </div>)
  }
  return(
    <div>
      <h1>Statistic</h1>
      <Statistic text="good" value ={good} />
      <Statistic text="neutral" value ={neutral} />
      <Statistic text="bad" value ={bad} />
      <Statistic text="all" value ={good + neutral + bad} />
      <Statistic text="Average" value ={(good + (bad * -1)) / (good + neutral + bad)} />
      <Statistic text="Positive" value ={(good / (good + neutral + bad)) * 100} />
    </div>
  )
}

const Statistic = ({text, value}) => {
  return  <p>{text}  {value} </p>
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback </h1>
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

```

## 1.11

```react
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
```

## 1.12

```react
import { useState } from 'react'

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

 const [selected, setSelected] = useState(0)

 const handleClick = () => {
  const randomNumber = Math.floor(Math.random() * anecdotes.length)
  setSelected(randomNumber, console.log(selected))
 }

 return (
  <>
   <div>{anecdotes[selected]}</div>
   <button onClick={handleClick}> Random </button>
  </>
 )
}

export default App
```

## 1.13

```react
import { useState } from 'react'

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

 const handleClick = () => {
  const randomNumber = Math.floor(Math.random() * anecdotes.length)
  setSelected(randomNumber)
 }

 const handleVote = () => {
  const votesCopy = [...votes]
  votesCopy[selected] += 1
  setVotes(votesCopy)
  console.log(votesCopy)
 }

 return (
  <>
   <div>{anecdotes[selected]}</div>
   <p>{votes[selected]} vote(s)</p>
   <button onClick={handleClick}> Random anecdote </button>
   <button onClick={handleVote}> Vote as good </button>
  </>
 )
}

export default App
```

## 1.14

```react
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
```
