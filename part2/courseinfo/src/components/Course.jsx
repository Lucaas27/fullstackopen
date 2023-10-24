import React, { useState } from 'react'

const Course = ({ course }) => {
	return (
		<>
			{course.map((x) => {
				return (
					<div className="container" key={x.id}>
						<Header courseName={x.name} />
						<Content parts={x.parts} />
						<Total total={x.parts} />
					</div>
				)
			})}
		</>
	)
}

const Header = ({ courseName }) => {
	return (
		<>
			<h2>{courseName}</h2>
		</>
	)
}

const Content = ({ parts }) => {
	return (
		<ul>
			{parts.map((part) => (
				<Part key={part.id} part={part} />
			))}
		</ul>
	)
}

const Part = ({ part }) => {
	return (
		<li>
			{part.name} {part.exercises} exercises
		</li>
	)
}

const Total = ({ total }) => {
	return (
		<>
			<p>
				Number of exercises:{' '}
				{total.reduce((sum, currValue) => sum + currValue.exercises, 0)}
			</p>
		</>
	)
}

export default Course
