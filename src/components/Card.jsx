import React from 'react'
import { FaRegFilePdf, FaRegFileImage } from 'react-icons/fa'
import { MdOutlineFileDownload } from 'react-icons/md'
import { IoMdClose } from 'react-icons/io'
import { motion } from 'motion/react'

const Card = ({ data, reference, onDelete }) => {
    const handleDownload = () => {
        if (!data.file?.data) return

        const link = document.createElement('a')
        link.href = data.file.data
        link.download = data.file.name
        link.click()
    }

    const FileIcon = data.file?.type?.startsWith('image/') ? FaRegFileImage : FaRegFilePdf

    return (
        <motion.div
            drag
            dragConstraints={reference}
            whileDrag={{ scale: 1.05 }}
            onClick={(e) => e.stopPropagation()}
            className='relative shrink-0 w-40 h-48 sm:w-60 sm:h-72 bg-zinc-100/95 dark:bg-zinc-900/90 rounded-[28px] sm:rounded-[40px] text-zinc-900 dark:text-white py-5 px-4 sm:py-10 sm:px-8 overflow-hidden shadow-md dark:shadow-none border border-zinc-200/80 dark:border-zinc-700/50'
        >
            <button
                onClick={onDelete}
                className='absolute top-3 right-3 sm:top-5 sm:right-5 w-6 h-6 sm:w-7 sm:h-7 bg-zinc-300 dark:bg-zinc-700 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors cursor-pointer z-10 text-zinc-900 dark:text-white'
                title='Delete card'
                aria-label='Delete card'
            >
                <IoMdClose size='0.85em' />
            </button>

            <FileIcon className='text-lg sm:text-2xl' />

            <p className='text-xs sm:text-sm mt-3 sm:mt-5 leading-tight line-clamp-3 sm:line-clamp-4'>{data.desc}</p>

            <div className='footer absolute bottom-0 w-full left-0'>
                <div className='flex items-center justify-between mb-2 sm:mb-3 px-4 sm:px-8 py-2 sm:py-3'>
                    <h5 className='text-xs sm:text-sm'>{data.fileSize}</h5>
                    {data.file ? (
                        <button
                            onClick={handleDownload}
                            className='w-6 h-6 sm:w-7 sm:h-7 bg-zinc-300 dark:bg-zinc-600 hover:bg-green-500 rounded-full flex items-center justify-center transition-colors cursor-pointer text-zinc-900 dark:text-white'
                            title='Download file'
                            aria-label='Download file'
                        >
                            <MdOutlineFileDownload size='.8em' />
                        </button>
                    ) : (
                        <span className='w-6 h-6 sm:w-7 sm:h-7 bg-zinc-300 dark:bg-zinc-600 rounded-full flex items-center justify-center text-zinc-900 dark:text-white'>
                            <MdOutlineFileDownload size='.8em' />
                        </span>
                    )}
                </div>
                {data.tag.isOpen && (
                    <div className={`tag w-full py-3 sm:py-5 ${data.tag.tagColor === 'blue' ? 'bg-blue-500' : 'bg-green-500'} flex items-center justify-center`}>
                        <h3 className='text-xs sm:text-sm font-semibold text-white px-3 sm:px-4 text-center'>{data.tag.tagTitle}</h3>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default Card
