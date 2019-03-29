const KATAMINO_ARRAY = KATAMINO_ORG_ARRAY.map((piece, pieceId) => createKataminoInfo(piece, pieceId))

document.write("const KATAMINO_ARR = " + JSON.stringify(KATAMINO_ARRAY))

function createKataminoInfo(piece, pieceId) {
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

  return uniqSpinArr.map((uniqSpin, spinId) => matricsToList(uniqSpin, pieceId, spinId))

}

function matricsToList(katamino, pieceId, spinId) {
  let list = []
  katamino.forEach((row, i) => {
    row.forEach((value, j) => {
      if (value == 1) {
        list.push({x:i, y:j})
      }
    })
  })
  return {pieceId, spinId, place: list, xLength: katamino.length, yLength: katamino[0].length}
}

function uniqKatamino(kataminoSpinArray) {
  let uniqKataminoSpinArray = []
  kataminoSpinArray.forEach((spin) => {
    if (!hasMember(uniqKataminoSpinArray, spin)) {
      uniqKataminoSpinArray.push(spin)
    }
  })

  return uniqKataminoSpinArray
}

function hasMember(uniqkataminoSpinArray, spin) {
  return uniqkataminoSpinArray.some(kataminoSpin =>
    JSON.stringify(kataminoSpin) === JSON.stringify(spin)
  )
}

function copyArrayOfArray(katamino) {
  return katamino.map(value => value.concat())
}

function transpose(katamino) {
  let transposed = []
  for(let i=0; i < katamino[0].length; i++) {
    transposed.push([])
  }
  katamino.forEach((row, i) => {
    row.forEach((value, j) => {
      transposed[j][i] = value
    })
  })

  return transposed
}
