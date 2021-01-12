export const checkWinCondition = (grid, x, y) => {
    const getRightBoundary = (array, startPoint) => {
        for (let i = startPoint; i < array.length; i++) {
            if (array[i] !== array[startPoint]) return i - 1
        }
        return array.length - 1
    }

    const getLeftBoundary = (array, startPoint) => {
        for (let i = startPoint; i >= 0; i--) {
            if (array[i] !== array[startPoint]) return i + 1
        }
        return 0
    }

    const getBoundariesForVector = (vector, startIndex) => {
        const rightBoundary = getRightBoundary(vector, startIndex)
        const leftBoundary = getLeftBoundary(vector, startIndex)
        const length = rightBoundary - leftBoundary + 1

        return { rightBoundary, leftBoundary, length }
    }

    const column = grid[x]
    const columnBoundaries = getBoundariesForVector(column, y)
    const winSequences = []

    if (columnBoundaries.length >= 4) {
        winSequences.push({
            length: columnBoundaries.length,
            origin: { x, y: columnBoundaries.leftBoundary },
            rotation: 0,
        })
    }

    const row = grid.map(column => column[y])
    const rowBoundaries = getBoundariesForVector(row, x)

    if (rowBoundaries.length >= 4) {
        winSequences.push({
            length: rowBoundaries.length,
            origin: { y, x: rowBoundaries.leftBoundary },
            rotation: Math.PI / 2,
        })
    }

    // Diagonal that looks like a '/'
    const diagonalForwardSlash = grid
        .map((column, i) => column[y - x + i])
    const diagonalForwardSlashBoundaries =
        getBoundariesForVector(diagonalForwardSlash, x)

    if (diagonalForwardSlashBoundaries.length >= 4) {
        winSequences.push({
            length: diagonalForwardSlashBoundaries.length,
            origin: {
                x: diagonalForwardSlashBoundaries.leftBoundary,
                y: y - x + diagonalForwardSlashBoundaries.leftBoundary,
            },
            rotation: Math.PI / 4,
        })
    }

    // Diagonal that looks like a '\'
    const diagonalBackSlash = grid
        .map((column, i) => column[y + x - i])
    const diagonalBackSlashBoundaries =
        getBoundariesForVector(diagonalBackSlash, x)

    if (diagonalBackSlashBoundaries.length >= 4) {
        winSequences.push({
            length: diagonalBackSlashBoundaries.length,
            origin: {
                x: diagonalBackSlashBoundaries.rightBoundary,
                y: y + x - diagonalBackSlashBoundaries.rightBoundary,
            },
            rotation: -Math.PI / 4,
        })
    }

    return winSequences
}