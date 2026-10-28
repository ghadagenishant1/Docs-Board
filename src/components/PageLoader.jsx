import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'

const MIN_LOAD_MS = 2400
const EXIT_DURATION = 900

const PageLoader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0)
    const [isExiting, setIsExiting] = useState(false)

    useEffect(() => {
        const start = Date.now()

        const tick = setInterval(() => {
            const elapsed = Date.now() - start
            const pct = Math.min((elapsed / MIN_LOAD_MS) * 100, 100)
            setProgress(pct)

            if (pct >= 100) {
                clearInterval(tick)
                setIsExiting(true)
                setTimeout(onComplete, EXIT_DURATION)
            }
        }, 16)

        return () => clearInterval(tick)
    }, [onComplete])

    return (
        <motion.div
            className={`fixed inset-0 z-50 bg-zinc-100 dark:bg-zinc-900 will-change-transform transition-colors duration-300 ${isExiting ? 'pointer-events-none' : ''}`}
            initial={{ y: 0 }}
            animate={isExiting ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: EXIT_DURATION / 1000, ease: [0.76, 0, 0.24, 1] }}
        >
            <motion.div
                className='absolute inset-0 pointer-events-none'
                animate={isExiting ? { opacity: 0, y: -30 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className='absolute bottom-6 left-5 sm:bottom-10 sm:left-10'>
                    <div className='flex items-end leading-none text-zinc-900 dark:text-white select-none'>
                        <span className='text-[22vw] sm:text-[14vw] font-bold tabular-nums tracking-[-0.04em]'>
                            {Math.round(progress)}
                        </span>
                        <span className='text-[7vw] sm:text-[4vw] font-medium mb-[2vw] sm:mb-[1.2vw] ml-0.5 opacity-70'>
                            %
                        </span>
                    </div>
                    <p className='mt-2 sm:mt-3 text-[10px] sm:text-xs tracking-[0.35em] uppercase text-zinc-500 dark:text-white/40 pl-1'>
                        Loading
                    </p>
                </div>

                <div className='absolute bottom-6 right-5 sm:bottom-10 sm:right-10 max-w-35 sm:max-w-xs text-right'>
                    <p className='text-[10px] sm:text-xs leading-relaxed text-zinc-400 dark:text-white/35 uppercase tracking-[0.2em]'>
                        Docs Board
                    </p>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default PageLoader
