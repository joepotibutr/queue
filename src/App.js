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
    e.preventDefault()
      if(patient.name && patient.emergencyCode){
        runQueue.enqueue(patient)        
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
      <div style={{padding:'40px'}}>
        <div>
        <form onSubmit={this.addQueue}>
          <h4>Patient Form</h4>
          <label for="name">Patient Name : </label>
          <input 
            name="name" 
            type="text" 
            value={patient.name} 
            onChange={this.onInputChange}
          />
          <br/><br/>
          <label>Patient Priority : </label>
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
          <br/><br/>
        <button>
          ADD QUEUE
        </button>
        </form>
        </div>
        <div>
          <h4>Queues : {runQueue.length()}</h4>
          <div>
            <h4>Next Queue</h4>
            <label> Name : {runQueue.front() && runQueue.front().name}</label><br/>
           <label> Priority : {runQueue.front() && runQueue.front().emergencyCode}</label>
          </div>
          <div>
            <h4>Last Queue</h4>  
            <label>Name : {runQueue.back() && runQueue.back().name}</label><br/>
           <label>Priority : {runQueue.back() && runQueue.back().emergencyCode} </label>        
          </div>
          <br/>
          <div>
            <button onClick={this.currentQueue}>Next Queue</button>
          </div>
        </div>
      </div>
    )
  }
}

export default App
