const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

const wordle = 'SUPER'

const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '<',
]

const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
]

let currentRow = 0
let currentTile = 0

// Create the 6 rows each containing 5 tiles.
guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id',  'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement)
})

// Create buttons using the keys array and assign attributes and event listeners.
// Add buttons to the keyboard container.
keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})

const handleClick = (letter) => {
    console.log('clicked', letter)
    if (letter === '<') {
        deleteLetter()
        return
    }
    if (letter === 'ENTER') {
        checkRow()
        return
    }
    addLetter(letter)
}

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter;
    
        // Add the letter to the guess array for later comparison.
        guessRows[currentRow][currentTile] = letter
    
        // Add the letter to the data attribute so they can be coloured later.
        tile.setAttribute('data', letter)
    
        // Move on to the next tile.
        currentTile++
    }    
}

const deleteLetter = () => {
    if (currentTile > 0) {
        // Go to the previous tile.
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        
        // Remove deleted text from the guess, text content and data attribute
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')

    if (currentTile === 5) {
        console.log('guess is ' + guess, 'wordle is ' + wordle)
        if (wordle == guess) {
            showMessage('Magnificent!')
        }
    }
}

// Show message in the message bar.
const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)

    // Set timer to remove the message after 2 seconds.
    setTimeout(() => messageDisplay.removeChild(messageElement), 2000)
}