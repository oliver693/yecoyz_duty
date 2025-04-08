import { useState } from 'react'
import { VisibilityProvider, useVisibility } from './context/VisibilityContext'
import DutyContainer from "./components/DutyContainer"
import './App.css'

const ShowDuty = () => {
  const { isVisible } = useVisibility();
  return (
    <>
      {isVisible && <DutyContainer />}
    </>
  )
}

function App() {
  return (
    <VisibilityProvider>
      <ShowDuty />
    </VisibilityProvider>
  )
}

export default App