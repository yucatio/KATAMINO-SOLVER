const solver = {
  solverStack : [],
  timer: null,
  speed: config.defaultSpeed,

  init : (targetPieces) => {
    const kataminoField = new Array(5).fill().map(() => (
      new Array(targetPieces.length).fill(-1)
    ))

    solver.solverStack  = []
    timer = null

    const minEmpty = {x:0, y:0}
    const placedPieces = []
    targetPieces.forEach((pieceId) => {
      solver.solverStack.push({kataminoField, minEmpty, pieceId, spinId:null, spin:null, unPlacedPieces: targetPieces, placedPieces})
      KATAMINO_ARR[pieceId].forEach((spin, spinId) => {
        solver.solverStack.push({kataminoField, minEmpty, pieceId, spinId, spin, unPlacedPieces: targetPieces, placedPieces})
      })
    })
  },

  solve : ({onUpdatePieces = (placedPieces)=>{}, onSolved = ()=>{}, onNotSolved} = ()=>{}) => {
    if (solver.solverStack.length <= 0) {
      console.log("解けなかった")
      onNotSolved()
      return
    }

    const {kataminoField, minEmpty, pieceId, spinId, spin, unPlacedPieces, placedPieces} = solver.solverStack.pop()

    if (! spin) {
      const timeout = state.placedPieces.length === placedPieces.length ? 0 : solver.speed
      onUpdatePieces(placedPieces)
      solver.timer = setTimeout(() => solver.solve({onUpdatePieces, onSolved, onNotSolved}), timeout)
      return
    }

    console.log("pieceId", pieceId)
    console.log("spinId", spinId)

    const offset = {x: minEmpty.x, y: minEmpty.y - spin[0].y}

    if (! solver.isAllEmpty(kataminoField, spin, offset)) {
      // フィールドの外か、すでにピースが置かれている
      console.log("フィールドの外か、すでにピースが置かれている")
      solver.timer = setTimeout(() => solver.solve({onUpdatePieces, onSolved, onNotSolved}), 0)
      return
    }

    console.log("ピースが置ける")

    const nextField = util.copyArrayOfArray(kataminoField)
    solver.placeSpin(nextField, spin, offset, pieceId)
    console.log("nextField", nextField)

    const nextUnPlaced = unPlacedPieces.filter(id => id !== pieceId)
    console.log("nextUnPlaced", nextUnPlaced)

    const nextPlacedPieces = [...placedPieces, {pieceId, spinId, spin, offset}]

    onUpdatePieces(nextPlacedPieces)

    if (nextUnPlaced.length <= 0) {
      console.log("完成")
      onSolved()
      return
    }

    const nextEmpty = solver.findNextEmpty(nextField, minEmpty)
    console.log("nextEmpty", nextEmpty)

    if (! solver.hasAllFiveTimesCells(nextField, nextEmpty)){
      console.log("フィールドが5の倍数以外で分断されている")
      solver.timer = setTimeout(() => solver.solve({onUpdatePieces, onSolved, onNotSolved}), solver.speed)
      return
    }

    nextUnPlaced.forEach((nextPieceId) => {
      solver.solverStack.push({kataminoField: nextField, minEmpty: nextEmpty, pieceId:nextPieceId, spinId:null, spin: null, unPlacedPieces: nextUnPlaced, placedPieces: nextPlacedPieces})
      KATAMINO_ARR[nextPieceId].forEach((nextSpin, nextSpinId) => {
        solver.solverStack.push({kataminoField: nextField, minEmpty: nextEmpty, pieceId:nextPieceId, spinId:nextSpinId, spin: nextSpin, unPlacedPieces: nextUnPlaced, placedPieces: nextPlacedPieces})
      })
    })

    solver.timer = setTimeout(() => solver.solve({onUpdatePieces, onSolved, onNotSolved}), solver.speed)
  },

  stop: () => {
    clearTimeout(solver.timer)
  },

  isAllEmpty: (kataminoField, places, offset) => {
    return places.every((place) => (
      solver.isEmpty(kataminoField, {x: place.x + offset.x, y: place.y + offset.y})
    ))
  },

  isEmpty: (kataminoField, place) => {
    return (
      kataminoField[place.x] !== undefined &&
      kataminoField[place.x][place.y] !== undefined &&
      kataminoField[place.x][place.y] < 0
    )
  },

  placeSpin: (kataminoField, places, offset, pieceId) => {
    places.forEach((place) => {
      kataminoField[place.x + offset.x][place.y + offset.y] = pieceId
    })
  },

  findNextEmpty : (kataminoField, previousEmpty) => {
    const minEmptyX = kataminoField.slice(previousEmpty.x).findIndex(row =>
      row.some((val) => val < 0)
    )
    if (minEmptyX < 0) {
      // 空白マスが見つからなかった
      return undefined
    }
    const x = previousEmpty.x + minEmptyX

    const y = kataminoField[x].findIndex(val => val < 0)

    return {x, y}
  },

  /**
   * 全ての連続した空白マスの数が5の倍数か判定します
   */
   hasAllFiveTimesCells: (kataminoField, minEmpty) => {
     const kataminoFieldCopy = util.copyArrayOfArray(kataminoField)
     let nextEmpty = minEmpty

     while (nextEmpty) {
       if (! solver.hasFiveTimesCells(kataminoFieldCopy, nextEmpty)) {
         return false
       }
       nextEmpty = solver.findNextEmpty(kataminoFieldCopy, nextEmpty)
     }
     return true
   },

  /**
   * emptyPlaceを含む連続した空白マスの個数が5の倍数か判定します
   */
   hasFiveTimesCells: (kataminoField, emptyPlace) => {
     const queue = [emptyPlace]
     let count = 0

     while (queue.length > 0) {
       const currentPlace = queue.shift()

       if (! solver.isEmpty(kataminoField, currentPlace)) {
         continue
       }

       count++
       kataminoField[currentPlace.x][currentPlace.y] = 100

       queue.push({x:currentPlace.x + 1, y: currentPlace.y})
       queue.push({x:currentPlace.x, y: currentPlace.y + 1})
       queue.push({x:currentPlace.x - 1, y: currentPlace.y})
       queue.push({x:currentPlace.x, y: currentPlace.y - 1})
     }

     return count%5 === 0
   },

   setSpeed: (speed) => {
     solver.speed = speed
   }
}
