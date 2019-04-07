const KATAMINO_ARRAY = KATAMINO_ORG_ARRAY.map((piece, pieceId) => createKataminoSpinList(piece, pieceId))

document.write("const KATAMINO_ARR = " + JSON.stringify(KATAMINO_ARRAY))

function createKataminoSpinList(piece, pieceId) {
  let kataminoSpinArray = []
  kataminoSpinArray[0] = copyArrayOfArray(piece)
  kataminoSpinArray[7] = transpose(copyArrayOfArray(kataminoSpinArray[0]))
  kataminoSpinArray[1] = copyArrayOfArray(kataminoSpinArray[7]).reverse()
  kataminoSpinArray[6] = transpose(copyArrayOfArray(kataminoSpinArray[1]))
  kataminoSpinArray[2] = copyArrayOfArray(kataminoSpinArray[6]).reverse()
  kataminoSpinArray[5] = transpose(copyArrayOfArray(kataminoSpinArray[2]))
  kataminoSpinArray[3] = copyArrayOfArray(kataminoSpinArray[5]).reverse()
  kataminoSpinArray[4] = transpose(copyArrayOfArray(kataminoSpinArray[3]))

  const uniqSpinArr = uniqKatamino(kataminoSpinArray)

  return uniqSpinArr.map((uniqSpin, spinId) => matrixToList(uniqSpin))
}

function matrixToList(katamino) {
  let places = []
  katamino.forEach((row, i) => {
    row.forEach((value, j) => {
      if (value === 1) {
        places.push({x:i, y:j})
      }
    })
  })
  return places
}

function uniqKatamino(kataminoSpinArray) {
  return kataminoSpinArray.filter((spin, index, array) => (
      index === array.findIndex((spin2) => (
        JSON.stringify(spin) === JSON.stringify(spin2)
      ))
  ))
}

function copyArrayOfArray(katamino) {
  return katamino.map(value => value.concat())
}

function transpose(katamino) {
  // new array filled with "[]"
  let transposed = new Array(katamino[0].length).fill().map(() => [])

  katamino.forEach((row, i) => {
    row.forEach((value, j) => {
      transposed[j][i] = value
    })
  })

  return transposed
}
