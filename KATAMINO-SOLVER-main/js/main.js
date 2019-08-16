function startSolve() {
  console.log("startSolve")

  const pieceInputs = document.getElementsByName("piece")

  const targetPiece = Array.from(pieceInputs).filter(pieceElement =>
    pieceElement.checked
  ).map(pieceElement =>
    parseInt(pieceElement.value, 10)
  )

  console.log(targetPiece)

  if (targetPiece.length < 3) {
    // TODO: Show error message
    console.log("選択されたピースの個数が3未満")
    return
  }

  solver.init(targetPiece)
  solver.solve()
}
