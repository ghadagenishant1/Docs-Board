import React, { useRef, useState } from 'react'
import { useCards } from '../hooks/useCards'
import { useDocForm } from '../hooks/useDocForm'
import { useTheme } from '../context/ThemeContext'
import AddDocButton from './AddDocButton'
import DocFormModal from './DocFormModal'
import CardBoard from './CardBoard'

const DOUBLE_TAP_MS = 300

const Foreground = () => {
    const boardRef = useRef(null)
    const lastTapRef = useRef(0)
    const singleTapTimerRef = useRef(null)
    const [showForm, setShowForm] = useState(false)

    const { cards, addCard, deleteCard, isFirstTime } = useCards()
    const { toggleTheme } = useTheme()
    const {
        form,
        fileError,
        fileInputRef,
        handleChange,
        handleFileChange,
        removeFile,
        resetForm,
        buildCard
    } = useDocForm()

    const openForm = () => setShowForm(true)

    const closeForm = () => {
        setShowForm(false)
        resetForm()
    }

    const handleBackgroundClick = (e) => {
        if (e.target !== e.currentTarget) return

        const now = Date.now()

        if (now - lastTapRef.current < DOUBLE_TAP_MS) {
            if (singleTapTimerRef.current) {
                clearTimeout(singleTapTimerRef.current)
                singleTapTimerRef.current = null
            }
            lastTapRef.current = 0
            toggleTheme()
            return
        }

        lastTapRef.current = now

        if (singleTapTimerRef.current) clearTimeout(singleTapTimerRef.current)

        singleTapTimerRef.current = setTimeout(() => {
            if (isFirstTime) openForm()
            singleTapTimerRef.current = null
        }, DOUBLE_TAP_MS)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newCard = buildCard()
        if (!newCard) return

        addCard(newCard)
        closeForm()
    }

    return (
        <>
            {!isFirstTime && <AddDocButton onClick={openForm} />}

            <DocFormModal
                isOpen={showForm}
                form={form}
                fileError={fileError}
                fileInputRef={fileInputRef}
                onClose={closeForm}
                onChange={handleChange}
                onFileChange={handleFileChange}
                onRemoveFile={removeFile}
                onSubmit={handleSubmit}
            />

            <CardBoard
                boardRef={boardRef}
                cards={cards}
                isFirstTime={isFirstTime}
                showForm={showForm}
                onBackgroundClick={handleBackgroundClick}
                onDelete={deleteCard}
            />
        </>
    )
}

export default Foreground
