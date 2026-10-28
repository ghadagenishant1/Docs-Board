export const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes}b`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}kb`
    return `${(bytes / (1024 * 1024)).toFixed(1)}mb`
}
