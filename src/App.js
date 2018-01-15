import React, { Component } from 'react'
import logo from './logo.png'
import { queue } from './queue'

import './app.css'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      runQueue : queue(),
      patient : {
        name : '',
        emergencyCode : 0
      }
    }
  }
  resetForm = () => {
    this.setState({
      patient : {
        name : '',
        emergencyCode : 0
      }
    })
  }

  addQueue = e => {
    const { patient , runQueue } = this.state
    runQueue.enqueue(patient)
    e.preventDefault()
      if(patient.name && patient.emergencyCode){
        this.resetForm()
      }
  }
  onInputChange = e => {
    this.setState({
      patient : {
        ...this.state.patient,
        name : e.target.value
      }
    })
  }
  onDropdownChange = e => {
    const value = parseInt(e.target.value,10)
    this.setState({
      patient : {
        ...this.state.patient,
        emergencyCode : value
      }
    })
  }

  currentQueue = () => {
    const { runQueue } = this.state
    runQueue.dequeue()
    this.forceUpdate()
  }

  render () {
    const { patient , runQueue } = this.state
    const nextQueue = runQueue.front()
    const lastQueue = runQueue.back()
    return (
      <div>
        <div>
        <form onSubmit={this.addQueue}>
          <input 
            name="name" 
            type="text" 
            value={patient.name} 
            onChange={this.onInputChange}
          />
          <select 
            value={patient.emergencyCode}
            onChange={this.onDropdownChange}
          >
            <option >pick priority</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
          </select>
        <button>
          ADD QUEUE
        </button>
        </form>
        </div>
        <div>
          <h4>Queues : {runQueue.length()}</h4>
          <div>
            <p>Next Queue</p>
            {runQueue.front() && <label>{runQueue.front().name}</label>}<br/>
            {runQueue.front() && <label>{runQueue.front().emergencyCode}</label>}
          </div>
          <div>
            <p>Last Queue</p>  
            {runQueue.back() && <label>{runQueue.back().name}</label>}<br/>
            {runQueue.back() && <label>{runQueue.back().emergencyCode}</label>}          
          </div>
          <div>
            <button onClick={this.currentQueue}>Next Queue</button>
          </div>
        </div>
      </div>
    )
  }
}

export default App
