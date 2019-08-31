const stateManager = {
  setSolverState: (solverState) => {
    state.solverState = solverState

    display.updateDraggablePiece()
    display.updateStartButtons()
    display.updateFieldPiece()
    display.updatePauseResumeButton()
    display.updateResultMessage()
  },

  setTargetPieces: (targetPieces) => {
    state.targetPieces = targetPieces

    display.updateStartButtons()
    display.updateFieldMask()
  },

  setPlacedPieces: (placedPieces) => {
    state.placedPieces = placedPieces

    display.updateDraggablePiece()
    display.updateFieldPiece()
  },
}
