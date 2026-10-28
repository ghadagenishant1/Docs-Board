import React from 'react'
import { motion } from 'motion/react'
import { IoMdAdd } from 'react-icons/io'

const AddDocButton = ({ onClick }) => {
    return (
        <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            className='fixed top-4 right-4 sm:top-5 sm:right-5 z-10 w-10 h-10 bg-zinc-100 dark:bg-zinc-900/90 hover:bg-green-500 dark:hover:bg-green-500 text-zinc-900 dark:text-white hover:text-white rounded-full flex items-center justify-center shadow-lg border border-zinc-300 dark:border-zinc-700 cursor-pointer transition-colors'
            title='Add new doc'
            aria-label='Add new doc'
        >
            <IoMdAdd size='1.4em' />
        </motion.button>
    )
}

export default AddDocButton
