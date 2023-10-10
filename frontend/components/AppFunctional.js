import React, { useState } from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  const [bSquareIndex, setbSquareIndex] = useState(initialIndex);
  const [message, setMessage] = useState('');
  const [steps, setSteps] = useState(0);
  const [email, setEmail] = useState('');
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  function getNextIndex(direction) {
    switch (direction) {
      case 'left':
        return bSquareIndex % 3 !== 0 ? bSquareIndex - 1 : bSquareIndex;
      case 'up':
        return bSquareIndex >= 3 ? bSquareIndex - 3 : bSquareIndex;
      case 'right':
        return bSquareIndex % 3 !== 2 ? bSquareIndex + 1 : bSquareIndex;
      case 'down':
        return bSquareIndex <= 5 ? bSquareIndex + 3 : bSquareIndex;
      default:
        return bSquareIndex;
    }
  }

  function move(direction) {
    const newIndex = getNextIndex(direction);
    if (newIndex !== bSquareIndex) {
      setSteps(steps + 1);
      setbSquareIndex(newIndex);
      setMessage('');
    } else {
      // Handle error message for invalid move
      setMessage(`You can't go ${direction}`);
    }
  }

  function reset() {
    setSteps(0);
    setbSquareIndex(initialIndex);
    setMessage('');
  }

  function onChange(evt) {
    setEmail(evt.target.value);
  }

  function getXY(index) {
    const y = Math.floor(index / 3) + 1
    const x = index % 3 + 1
    return `(${x}, ${y})`
  }

  function onSubmit(evt) {
    evt.preventDefault()
    const coordinates = getXY(bSquareIndex)
    
    const payload = {
      x: coordinates.x,
      y: coordinates.y,
      steps: steps,
      email: email
    }

    fetch('http://localhost:9000/api/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (response.ok) {
        console.log('successfully sent request')
      } else if (response.status === 422) {
        console.error('invalid payload format')
      } else {
        console.log('error occured while sending the request')
      }
    })
    .catch(error => {
      console.error('error occurred while sending the request:', error)
    })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {getXY(bSquareIndex)}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === bSquareIndex ? ' active' : ''}`}>
              {idx === bSquareIndex ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => move('left')}>LEFT</button>
        <button id="up" onClick={() => move('up')}>UP</button>
        <button id="right" onClick={() => move('right')}>RIGHT</button>
        <button id="down" onClick={() => move('down')}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
