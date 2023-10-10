import React from 'react'


export default class AppClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bSquareIndex: 4,
      message: '',
      steps: 0,
      email: ''
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  getXY = (index) => {
    const { bSquareIndex } = this.state
    const y = Math.floor(bSquareIndex / 3) + 1
    const x = bSquareIndex % 3 + 1
    return `(${x}, ${y})`
  }

  reset = () => {
    this.setState({
      steps: 0,
      bSquareIndex: 4,
      message: '',
      email: ''
    })
  }


  getNextIndex = (direction) => {
    const { bSquareIndex } = this.state
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

  move = (direction) => {
    const { bSquareIndex, steps } = this.state
    const newIndex = this.getNextIndex(direction);
    if (newIndex !== this.state.bSquareIndex) {
      this.setState(prevState => ({
        steps: prevState.steps + 1,
        bSquareIndex: newIndex,
        message: ''
      }))
    } else {
      this.setState({ message: `You can't go ${direction}` })
    }
  }

  onSubmit = (evt) => {
    evt.preventDefault()
  const { bSquareIndex, steps, email } = this.state
  const coordinates = this.getXY(bSquareIndex)

  if (!email) {
    this.setState({ message: 'Ouch: email is required' })
    return
  } else {
    const name = email.split('@')[0]
    this.setState({ message: `${ name } win #30`})
    this.setState({ email: '' })
  }
    
  }
  render() {
    const { className } = this.props
    const { steps, message } = this.state
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {this.getXY()}</h3>
          <h3 id="steps">You moved {steps} {steps === 1 ? 'time' : 'times'}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.bSquareIndex ? ' active' : ''}`}>
                {idx === this.state.bSquareIndex ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={()=> this.move('left')}>LEFT</button>
          <button id="up" onClick={()=> this.move('up')}>UP</button>
          <button id="right" onClick={()=> this.move('right')}>RIGHT</button>
          <button id="down" onClick={()=> this.move('down')}>DOWN</button>
          <button id="reset" onClick={()=> this.reset('reset')}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input 
          id="email" 
          type="email" 
          placeholder="type email"
          value={this.state.email}
          onChange={(e)=> this.setState({ email: e.target.value })}
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
  }
