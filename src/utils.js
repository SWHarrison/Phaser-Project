/*function arrayPrint (array) {
  console.log(array.join(' '));
}

function arrayPrint2D (array) {

  if (Array.isArray(array[0])) {
    for (let i in array) {
      arrayPrint(array[i])
    }
  } else {
    arrayPrint(array)
  }
}

function arrayOfZeroes (h, w) {
  let to_return = [];
  for (let i = 0; i < h; i += 1){
    let to_add = [];
    for (let j = 0; j < w; j += 1){
      to_add.push(0);
    }
    to_return.push(to_add)
  }

  return to_return;
}

function combineArray (array1, array2) {
  let to_return = [];
  if (array1.length >= array2.length) {
    for (let i = 0; i < array2.length; i += 1){
      to_return.push(array2[i]);
    }

    for (let i = array2.length; i < array1.length; i += 1){
      to_return.push(array1[i]);
    }
  } else {
    for (let i = 0; i < array1.length; i += 1){
      to_return.push(array2[i]);
    }
  }
  return to_return;
}

function combineArrayAt (array1, array2, indent) {
  let to_return = [];
  for (let i = 0; i < indent; i += 1){
    to_return.push(array1[i]);
  }
  let to_add = ( combineArray( array1.slice(indent), array2));
  to_return = to_return.concat(to_add);

  return to_return;
}

function copyArray2D(array1, array2, x, y) {
  let to_return = [];
  const maxCol = Math.min(x+array2.length, array1.length)
  for (let c = x; c < maxCol; c += 1) {
    let maxRow = Math.min(c+array2[0].length, array1[0].length)
    for (let r = y; r < maxRow; r += 1) {
      array1[c][r] = array2[c-x][r-y];
    }
  }

  return to_return;
}*/


function randomInt(max){
  return Math.floor(Math.random() * max)
}

function anagram(word){
  let to_return = word;
  for (let letter in word){
    const index = randomInt(to_return.length - letter);
    const swappedLetter = to_return[index];
    const firstSection = to_return.substring(0,index);
    const secondSection = to_return.substring(index + 1);
    to_return = firstSection.concat(secondSection);
    to_return = to_return.concat(swappedLetter)
  }
  return to_return;
}

function anagramFirstLastKept(word) {
  const firstLetter = word[0];
  const lastLetter = word[word.length-1]
  const middle = anagram(word.substring(1,word.length-1))
  let to_return = firstLetter.concat(middle);
  to_return = to_return.concat(lastLetter);
  return to_return;
}

function scrambleSentence(sentence) {
  let words = sentence.split(' ');
  let to_return = ""
  for (let word in words){
    to_return = to_return.concat(anagram(words[word]));
    to_return = to_return + " "
  }
  return to_return;
}

function scrambleSentenceFirstLastKept(sentence) {
  let words = sentence.split(' ');
  let to_return = ""
  for (let word in words){
    to_return = to_return.concat(anagramFirstLastKept(words[word]));
    to_return = to_return + " "
  }
  return to_return;
}

function scrambleSentenceFunctions(sentence, func) {
  let words = sentence.split(' ');
  let to_return = ""
  for (let word in words){
    to_return = to_return.concat(func(words[word]));
    to_return = to_return + " "
  }
  return to_return;
}

function anagramPuncuation(word){
  const searchChars = '-,?!';
  let values = [];
  for (let i = 0; i < word.length; i += 1){
    let newValue = searchChars.indexOf(word.substring(i,i+1));
    if(newValue >= 0){
      values.push(i);
    }
  }
  console.log(values);
  let wordToScramble = word;
  let specialChars = [];
  for (let i = 0; i < values.length; i += 1){
    console.log("word is currently: " + wordToScramble);
    specialChars.push(wordToScramble[values[i]-i]);
    wordToScramble = wordToScramble.substring(0, values[i] - i).concat(wordToScramble.substring(values[i] + 1 - i))
  }
  console.log(specialChars)
  console.log("word is currently: " + wordToScramble);
  let scrambled = anagram(wordToScramble);
  console.log("scrambled without puncuation: " + scrambled)
  for (let i = 0; i < values.length; i+= 1){
    let scrambledFirst = scrambled.substring(0, values[i]) + specialChars[i];
    console.log("first: " + scrambledFirst)
    let scrambledLast = scrambled.substring(values[i]);
    console.log("last: " + scrambledLast)
    scrambled = scrambledFirst.concat(scrambledLast);
  }
  return scrambled;
}

console.log(anagram("boolean"))
console.log(anagramFirstLastKept("boolean"))
console.log(scrambleSentence("The rains in spain fall mainly on the plains"))
console.log(scrambleSentenceFirstLastKept("The rains in spain fall mainly on the plains"))
console.log(scrambleSentenceFunctions("The rains in spain fall mainly on the plains", anagramFirstLastKept))
console.log(anagramPuncuation("your-mine-ours?"));
// arrayPrint([32,14,5,8]);
//arrayPrint2D([33,15,6,9]);
//arrayPrint2D([ [1, 2, 3], [4, 5, 6], [7, 8, 9] ]);
// let board = arrayOfZeroes(4,6);
// console.log(combineArray([0,0,0,0,0,0], [5,4,3]));
// console.log(combineArray([0,0], [5,4,3]));
// console.log(combineArrayAt([0,0,0,0,0,0], [5,4,3], 2));
// console.log(combineArrayAt([0,0,0], [5,4,3], 2));
// console.log(board);
// let piece = [[0,1],[1,1]];
// console.log(piece);
// copyArray2D(board,piece, 2, 2);
// arrayPrint2D(board);

export { anagram, anagramFirstLastKept, scrambleSentence, scrambleSentenceFirstLastKept, scrambleSentenceFunctions, anagramPuncuation }
