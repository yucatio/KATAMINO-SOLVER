const KATAMINO_ARRAY = KATAMINO_ORG_ARRAY.map(piece => createKataminoSpinList(piece))

document.write("const KATAMINO_ARR = " + JSON.stringify(KATAMINO_ARRAY))

/**
 * Creates list of transposed and reversed pieces
 */
function createKataminoSpinList(piece) {
  const spinArray = []

  spinArray[0] = copyArrayOfArray(piece)
  // Transposing 0th makes 7th
  spinArray[7] = transpose(spinArray[0])
  // Copying and reversing 7th makes 1stS
  spinArray[1] = copyArrayOfArray(spinArray[7]).reverse()
  // Transposing 1st makes 6th
  spinArray[6] = transpose(spinArray[1])
  // Copying and reversing 6th makes 2nd
  spinArray[2] = copyArrayOfArray(spinArray[6]).reverse()
  // Transposing 2nd makes 5th
  spinArray[5] = transpose(spinArray[2])
  // Copying and reversing 5th makes 3rd
  spinArray[3] = copyArrayOfArray(spinArray[5]).reverse()
  // Transposing 3rd makes 4th
  spinArray[4] = transpose(spinArray[3])

  const uniqSpinArr = uniqSpin(spinArray)

  const spinLists = uniqSpinArr.map((uniqSpin) => matrixToList(uniqSpin))

  return spinLists
}

function copyArrayOfArray(arrayOfArray) {
  return arrayOfArray.map(array => ([...array]))
}

/*
* Transpoose array of array
*/
function transpose(spin) {
  let transposed = spin[0].map(() => [])

  // Exchange 1st index and 2nd index
  spin.forEach((row, i) => {
    row.forEach((value, j) => {
      transposed[j][i] = value
    })
  })

  return transposed
}

function uniqSpin(spinArray) {
  return spinArray.filter((spin, index, array) => (
      index === array.findIndex((spinAnother) => (
        JSON.stringify(spin) === JSON.stringify(spinAnother)
      ))
  ))
}

function matrixToList(spin) {
  // For store transformed value
  const places = []
  spin.forEach((row, i) => {
    row.forEach((value, j) => {
      if (value === 1) {
        places.push({x:i, y:j})
      }
    })
  })
  return places
}
