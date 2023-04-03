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

## Defining Methods in Objects

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
