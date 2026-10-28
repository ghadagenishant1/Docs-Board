import React from 'react'

const Background = () => {
  return (
    <div className='w-full h-full fixed z-2 pointer-events-none'>
      <div className='w-full py-4 sm:py-7 px-4 text-zinc-300 dark:text-zinc-900 text-xs sm:text-base flex items-center justify-center text-center'>
        Manage Your Docs Easily.
      </div>
      <h1 className='text-[14vw] sm:text-[10vw] tracking-tight leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-zinc-300 dark:text-zinc-900 text-center px-4'>
        DocsBoard
      </h1>
    </div>
  )
}

export default Background
