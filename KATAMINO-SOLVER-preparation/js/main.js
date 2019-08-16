const KATAMINO_ARRAY = KATAMINO_ORG_ARRAY.map(piece => createKataminoSpinList(piece))

document.write("const KATAMINO_ARR = " + JSON.stringify(KATAMINO_ARRAY))

/*
 * 各ピースを回転・反転した時のピースの場所のリストを作成する
 */
function createKataminoSpinList(piece) {
  // 回転した形を格納する配列
  let spinArray = []

  spinArray[0] = copyArrayOfArray(piece)
  // 0番を転置したものが7番
  spinArray[7] = transpose(spinArray[0])
  // 7番をコピーして上下反転したものが1番
  spinArray[1] = copyArrayOfArray(spinArray[7]).reverse()
  // 1番を転置したものが6番
  spinArray[6] = transpose(spinArray[1])
  // 6番をコピーして上下反転したものが2番
  spinArray[2] = copyArrayOfArray(spinArray[6]).reverse()
  // 2番を転置したものが5番
  spinArray[5] = transpose(spinArray[2])
  // 5番をコピーして上下反転したものが3番
  spinArray[3] = copyArrayOfArray(spinArray[5]).reverse()
  // 3番を転置したものが4番
  spinArray[4] = transpose(spinArray[3])

  // スピンの重複を取り除く
  const uniqSpinArr = uniqSpin(spinArray)

  // 各スピンをリストの形式に変換する
  const spinLists = uniqSpinArr.map((uniqSpin) => matrixToList(uniqSpin))

  return spinLists
}

function copyArrayOfArray(arrayOfArray) {
  return arrayOfArray.map(arr => arr.concat())
}

/*
* 2次元配列の転置をする
*/
function transpose(spin) {
  // 転置した配列
  let transposed = spin[0].map(() => [])

  // 1番目のインデックスと2番目のインデックスを入れ替える
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
  // 変換後の値を格納する配列
  const places = []
  spin.forEach((row, i) => {
    row.forEach((value, j) => {
      if (value === 1) {
        // 値が1だったら場所を変換後の配列に追加する
        places.push({x:i, y:j})
      }
    })
  })
  return places
}
