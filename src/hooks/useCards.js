import { useState, useEffect } from 'react'
import { STORAGE_KEY } from '../utils/constants'

export const useCards = () => {
    const [cards, setCards] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cards))
    }, [cards])

    const addCard = (card) => {
        setCards(prev => [...prev, card])
    }

    const deleteCard = (id) => {
        setCards(prev => prev.filter(card => card.id !== id))
    }

    return { cards, addCard, deleteCard, isFirstTime: cards.length === 0 }
}
