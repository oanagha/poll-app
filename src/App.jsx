import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import './App.css'
import CreatePoll from './pages/CreatePoll'
import VotePoll from './pages/VotePoll'
import LivePollResults from './pages/LivePollResults'
import LandingPage from './pages/LandingPage'
// import HomePage from './pages/HomePage'

function App() {
 

  return (
    <>
    
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/create' element={<CreatePoll/>}/>
      <Route path='/poll' element={<VotePoll/>}/>
      <Route path='/result' element={<LivePollResults/>}/>
    </Routes>
      {/* <div className="App">
      <CreatePoll />
      <VotePoll/>
      <LivePollResults/>
    </div> */}



    </>
  )
}

export default App
