import React, { useState } from 'react'
import Background from './components/Background'
import Foreground from './components/Foreground'
import PageLoader from './components/PageLoader'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <div className='relative w-full min-h-dvh h-dvh bg-zinc-200 dark:bg-zinc-800 transition-colors duration-300'>
        <Background />
        <Foreground />
      </div>

      {isLoading && (
        <PageLoader onComplete={() => setIsLoading(false)} />
      )}
    </>
  )
}

export default App
