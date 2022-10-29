let number = 0

const genNumber = () => { number = Math.floor(Math.random() * 100) + 1; };

const getNumber = () => { return number; };

export { genNumber, getNumber };