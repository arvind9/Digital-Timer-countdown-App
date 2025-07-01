// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isTimeRunning: false, setMinutes: 25, totalSecounds: 0}

  componentWillUnmount() {
    clearInterval(this.intervelId)
  }

  onReset = () => {
    clearInterval(this.intervelId)
    this.setState({
      isTimeRunning: false,
      setMinutes: 25,
      totalSecounds: 0,
    })
  }

  onTimerIncrement = () => {
    const {isTimeRunning, totalSecounds} = this.state
    if (!isTimeRunning && totalSecounds === 0) {
      this.setState(prevState => ({setMinutes: prevState.setMinutes + 1}))
    }
  }

  onTimerDecrement = () => {
    const {isTimeRunning, setMinutes, totalSecounds} = this.state
    if (!isTimeRunning && setMinutes > 1 && totalSecounds === 0) {
      this.setState(prevState => ({setMinutes: prevState.setMinutes - 1}))
    }
  }

  onTimerDecrementSecounds = () => {
    const {totalSecounds, setMinutes} = this.state

    this.setState(prevState => ({totalSecounds: prevState.totalSecounds + 1}))

    if (totalSecounds === setMinutes * 60) {
      this.onTimerDecrement()
    }
  }

  onStartOrPause = () => {
    const {isTimeRunning} = this.state

    this.setState(prevState => ({isTimeRunning: !prevState.isTimeRunning}))
    if (isTimeRunning) {
      clearInterval(this.intervelId)
    } else {
      this.intervelId = setInterval(this.onTimerDecrementSecounds, 1000)
    }
  }

  render() {
    const {isTimeRunning, setMinutes, totalSecounds} = this.state
    const timeRemain = setMinutes * 60 - totalSecounds
    const minutes = Math.floor(timeRemain / 60)
    const secounds = Math.floor(timeRemain % 60)

    const startOrPauseIcon = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const stringyfiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringyfiedSecounds = secounds > 9 ? secounds : `0${secounds}`

    return (
      <div className="bg">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-align">
          <div className="time-section">
            <div className="timer-bg">
              <h1 className="timer">
                {stringyfiedMinutes}:{stringyfiedSecounds}
              </h1>
              <p>{isTimeRunning ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="buttons-group">
            <div className="buttons">
              <button type="button" onClick={this.onStartOrPause}>
                <img
                  src={startOrPauseIcon}
                  alt={isTimeRunning ? 'pause icon' : 'play icon'}
                  className="start-or-pause"
                />
                {isTimeRunning ? 'Pause' : 'Start'}
              </button>
              <button type="button" onClick={this.onReset}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="start-or-pause"
                />
                <p>Reset</p>
              </button>
            </div>
            <p>Set Timer limit</p>
            <div className="buttons">
              <button type="button" onClick={this.onTimerDecrement}>
                -
              </button>
              <p className="minutes">{setMinutes}</p>
              <button type="button" onClick={this.onTimerIncrement}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
