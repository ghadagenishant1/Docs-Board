import { useRef, useState } from 'react'
import { ALLOWED_TYPES, EMPTY_FORM, MAX_FILE_SIZE } from '../utils/constants'
import { formatFileSize } from '../utils/formatFileSize'

export const useDocForm = () => {
    const fileInputRef = useRef(null)
    const [form, setForm] = useState(EMPTY_FORM)
    const [fileError, setFileError] = useState('')

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!ALLOWED_TYPES.includes(file.type)) {
            setFileError('Only PDF, JPEG, PNG, and WebP files allowed (max 2MB)')
            e.target.value = ''
            return
        }

        if (file.size > MAX_FILE_SIZE) {
            setFileError('File must be under 2MB')
            e.target.value = ''
            return
        }

        const reader = new FileReader()
        reader.onload = () => {
            setForm(prev => ({
                ...prev,
                file: {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    data: reader.result
                },
                desc: prev.desc.trim() || file.name.replace(/\.[^/.]+$/, '')
            }))
            setFileError('')
        }
        reader.readAsDataURL(file)
    }

    const removeFile = () => {
        setForm(prev => ({ ...prev, file: null }))
        setFileError('')
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const resetForm = () => {
        setForm(EMPTY_FORM)
        setFileError('')
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const buildCard = () => {
        if (!form.desc.trim()) return null

        return {
            id: crypto.randomUUID(),
            desc: form.desc.trim(),
            fileSize: form.file ? formatFileSize(form.file.size) : '0kb',
            file: form.file,
            tag: {
                isOpen: form.showTag,
                tagTitle: form.tagTitle.trim() || 'Download Now',
                tagColor: form.tagColor
            }
        }
    }

    return {
        form,
        fileError,
        fileInputRef,
        handleChange,
        handleFileChange,
        removeFile,
        resetForm,
        buildCard
    }
}
