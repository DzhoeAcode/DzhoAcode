const { Function: Func } = new(require('@neoxr/wb'))

Func.Styles = (text, style = 1) => {
   var xStr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('')
   var yStr = Object.freeze({
      1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
   })
   var replacer = []
   xStr.map((v, i) => replacer.push({
      original: v,
      convert: yStr[style].split('')[i]
   }))
   var str = text.toLowerCase().split('')
   var output = []
   str.map(v => {
      const find = replacer.find(x => x.original == v)
      find ? output.push(find.convert) : output.push(v)
   })
   return output.join('')
}

Func.fibonacci = (x, y, number, opr) => {
   let value = [x, y]
   for (let i = 1; i <= number; i++) {
      const x1 = value[value.length - 2]
      const x2 = value[value.length - 1]
      value.push(eval(x1 + opr + x2))
   }
   return value
}

Func.generateCryptarithm = () => {
   const num1 = Math.floor(Math.random() * 90) + 10
   const num2 = Math.floor(Math.random() * 90) + 10
   const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
   const letter1 = letters[Math.floor(Math.random() * letters.length)]
   const letter2 = letters[Math.floor(Math.random() * letters.length)]
   const operations = ['+', '-', '*', '/'];
   const operation = operations[Math.floor(Math.random() * operations.length)]
   let result;
   if (operation === '+') {
      result = num1 + num2;
   } else if (operation === '-') {
      result = num1 - num2;
   } else if (operation === '*') {
      result = num1 * num2;
   } else if (operation === '/') {
      result = num1 - (num1 % num2)
      result = result / num2
   } else {
      throw new Error("Invalid operation")
   }
   const num1Str = num1.toString()
   const num2Str = num2.toString()
   const resultStr = result.toString()
   const digitToLetter = {}
   const usedLetters = new Set()
   const allCharacters = num1Str + num2Str + resultStr + letter1 + letter2
   function getUnusedLetter() {
      for (let i = 0; i < letters.length; i++) {
         const letter = letters[i]
         if (!usedLetters.has(letter)) {
            usedLetters.add(letter)
            return letter
         }
      }
      throw new Error("Not enough letters to map all digits")
   }
   for (const character of allCharacters) {
      if (!digitToLetter[character]) {
         digitToLetter[character] = getUnusedLetter()
      }
   }
   const num1Crypt = num1Str.split('').map(digit => digitToLetter[digit]).join('')
   const num2Crypt = num2Str.split('').map(digit => digitToLetter[digit]).join('')
   const resultCrypt = resultStr.split('').map(digit => digitToLetter[digit]).join('')
   const letter1Crypt = digitToLetter[letter1]
   const letter2Crypt = digitToLetter[letter2]
   function findKeyByValue(obj, value) {
      for (let key in obj) {
         if (obj[key] === value) {
            return key
         }
      }
      return undefined
   }
   return {
      problem: `${num1Crypt} ${operation} ${num2Crypt} = ${resultCrypt}`,
      solution: `${num1} ${operation} ${num2} = ${result}`,
      mapping: digitToLetter,
      game: {
         question: `Jika *${num1Crypt} ${operation.replace(/[*]/g, '×')} ${num2Crypt} = ${resultCrypt}* dan diketahui *(${num2Crypt.split('').map(v => `${v} = ${findKeyByValue(digitToLetter, v)}`).join(', ')})*, jadi *${resultCrypt}* adalah ...?`,
         answer: String(result)
      }
   }
}