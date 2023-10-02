import React from 'react'

const ShowCountry = ({ isOpen, closeHandler, children }) => {
	return (
		<>
			{isOpen && (
				<div className="overlay">
					<div className="results__background" onClick={closeHandler} />
					<div className="results__container">
						<div className="results__controls">
							<button
								className="results__close"
								type="button"
								onClick={closeHandler}
							/>
						</div>
						{children}
					</div>
				</div>
			)}
		</>
	)
}

export default ShowCountry
