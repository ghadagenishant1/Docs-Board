import React from 'react'
import Card from './Card'

const CardBoard = ({
    boardRef,
    cards,
    isFirstTime,
    showForm,
    onBackgroundClick,
    onDelete
}) => {
    return (
        <div
            ref={boardRef}
            onClick={onBackgroundClick}
            className={`fixed top-0 left-0 w-full h-full z-3 flex gap-3 sm:gap-10 flex-wrap content-start p-3 sm:p-5 pt-14 sm:pt-16 overflow-y-auto overscroll-contain ${isFirstTime ? 'cursor-pointer' : ''}`}
        >
            {isFirstTime && !showForm && (
                <div className='absolute inset-0 flex items-center justify-center pointer-events-none px-6'>
                    <p className='text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm text-center max-w-xs'>
                    </p>
                </div>
            )}
            {cards.map((item) => (
                <Card
                    key={item.id}
                    data={item}
                    reference={boardRef}
                    onDelete={() => onDelete(item.id)}
                />
            ))}
        </div>
    )
}

export default CardBoard
