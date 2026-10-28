import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FaRegFilePdf, FaRegFileImage } from 'react-icons/fa'
import { MdOutlineFileUpload, MdCheck } from 'react-icons/md'
import { IoMdClose } from 'react-icons/io'
import { formatFileSize } from '../utils/formatFileSize'

const DocFormModal = ({
    isOpen,
    form,
    fileError,
    fileInputRef,
    onClose,
    onChange,
    onFileChange,
    onRemoveFile,
    onSubmit
}) => {
    const FileIcon = form.file?.type?.startsWith('image/') ? FaRegFileImage : FaRegFilePdf

    const openFilePicker = () => fileInputRef.current?.click()

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className='fixed inset-0 z-20 bg-black/10 dark:bg-black/10 backdrop-blur-sm'
                        onClick={onClose}
                    />
                    <motion.form
                        initial={{ opacity: 0, scale: 0.85, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 30 }}
                        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                        onSubmit={onSubmit}
                        onClick={(e) => e.stopPropagation()}
                        className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 shrink-0 w-40 h-48 sm:w-60 sm:h-72 bg-zinc-100/95 dark:bg-zinc-900/95 rounded-[28px] sm:rounded-[40px] text-zinc-900 dark:text-white py-5 px-4 sm:py-10 sm:px-8 overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-700 max-h-[90dvh]'
                    >
                        <input
                            ref={fileInputRef}
                            type='file'
                            accept='.pdf,.jpg,.jpeg,.png,.webp'
                            onChange={onFileChange}
                            className='hidden'
                        />

                        <button
                            type='button'
                            onClick={onClose}
                            className='absolute top-3 right-3 sm:top-5 sm:right-5 w-6 h-6 sm:w-7 sm:h-7 bg-zinc-300 dark:bg-zinc-700 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors cursor-pointer z-10'
                            title='Close'
                            aria-label='Close form'
                        >
                            <IoMdClose size='1em' />
                        </button>

                        <button
                            type='button'
                            onClick={openFilePicker}
                            className='cursor-pointer hover:opacity-80 transition-opacity text-lg sm:text-2xl'
                            title={form.file ? 'Change file' : 'Upload file'}
                            aria-label={form.file ? 'Change file' : 'Upload file'}
                        >
                            <FileIcon />
                        </button>

                        {fileError && (
                            <p className='text-[10px] text-red-500 dark:text-red-400 mt-2 leading-tight'>{fileError}</p>
                        )}

                        <textarea
                            name='desc'
                            value={form.desc}
                            onChange={onChange}
                            placeholder='Enter description...'
                            rows={3}
                            className='w-full text-xs sm:text-sm mt-3 sm:mt-5 leading-tight bg-transparent outline-none resize-none placeholder:text-zinc-500 dark:placeholder:text-zinc-400'
                            required
                        />

                        <div className='footer absolute bottom-0 w-full left-0'>
                            <div className='flex items-center justify-between mb-2 sm:mb-3 px-4 sm:px-8 py-2 sm:py-3'>
                                <h5 className='text-xs sm:text-sm'>
                                    {form.file ? formatFileSize(form.file.size) : '0kb'}
                                </h5>
                                <div className='flex items-center gap-2'>
                                    <label className='flex items-center gap-1 text-[10px] text-zinc-500 dark:text-zinc-400 cursor-pointer'>
                                        <input
                                            type='checkbox'
                                            name='showTag'
                                            checked={form.showTag}
                                            onChange={onChange}
                                            className='accent-green-500 w-3 h-3'
                                        />
                                        Tag
                                    </label>
                                    {form.file ? (
                                        <button
                                            type='button'
                                            onClick={onRemoveFile}
                                            className='w-7 h-7 bg-zinc-300 dark:bg-zinc-600 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors cursor-pointer text-zinc-900 dark:text-white'
                                            title='Remove file'
                                            aria-label='Remove file'
                                        >
                                            <IoMdClose size='.8em' />
                                        </button>
                                    ) : (
                                        <button
                                            type='button'
                                            onClick={openFilePicker}
                                            className='w-7 h-7 bg-zinc-300 dark:bg-zinc-600 hover:bg-green-500 rounded-full flex items-center justify-center transition-colors cursor-pointer text-zinc-900 dark:text-white'
                                            title='Upload file'
                                            aria-label='Upload file'
                                        >
                                            <MdOutlineFileUpload size='.8em' />
                                        </button>
                                    )}
                                    {form.showTag && (
                                        <button
                                            type='submit'
                                            className='w-7 h-7 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors cursor-pointer text-zinc-900'
                                            title='Create card'
                                            aria-label='Create card'
                                        >
                                            <MdCheck size='.8em' />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {form.showTag ? (
                                <div
                                    className={`tag w-full py-3 sm:py-5 ${form.tagColor === 'blue' ? 'bg-blue-500' : 'bg-green-500'} flex items-center justify-center`}
                                >
                                    <input
                                        name='tagTitle'
                                        value={form.tagTitle}
                                        onChange={onChange}
                                        placeholder='Download Now'
                                        className='text-xs sm:text-sm font-semibold bg-transparent outline-none text-center placeholder:text-white/70 w-full px-4 sm:px-8 text-white'
                                    />
                                </div>
                            ) : (
                                <button
                                    type='submit'
                                    className='tag w-full py-3 sm:py-5 bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors cursor-pointer'
                                >
                                    <h3 className='text-xs sm:text-sm font-semibold text-zinc-900'>Create Card</h3>
                                </button>
                            )}
                        </div>

                        {form.showTag && (
                            <select
                                name='tagColor'
                                value={form.tagColor}
                                onChange={onChange}
                                className='absolute bottom-6 left-6 sm:left-8 text-[10px] bg-zinc-300 dark:bg-zinc-700 dark:text-white rounded px-1.5 py-0.5 outline-none cursor-pointer z-10'
                            >
                                <option value='green'>Green</option>
                                <option value='blue'>Blue</option>
                            </select>
                        )}
                    </motion.form>
                </>
            )}
        </AnimatePresence>
    )
}

export default DocFormModal
