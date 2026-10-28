export const STORAGE_KEY = 'docs-cards'
export const THEME_STORAGE_KEY = 'docs-theme'

export const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB

export const ALLOWED_TYPES = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp'
]

export const EMPTY_FORM = {
    desc: '',
    showTag: true,
    tagTitle: 'Download Now',
    tagColor: 'green',
    file: null
}
