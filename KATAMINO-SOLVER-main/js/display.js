const display = {
  updateDraggablePiece: () => {
    const element = $(".draggable-piece")

    element.draggable(state.solverState === "selectPiece" ? "enable" : "disable")

    element.children("img").show()
    state.placedPieces.forEach((place) => {
      $("#piece_" + place.pieceId + ">img").hide()
    })
  },

  updateStartButtons: () => {
    $("#start-button").prop(
      "disabled", state.solverState !== "selectPiece"
    ).toggle(
      (state.solverState === "selectPiece" || state.solverState === "solving")
      && state.targetPieces.length >= 3
    )
    $("#more-piece-button").toggle(state.targetPieces.length < 3)
    $("#reset-button").toggle(state.solverState === "solvedSuccess" || state.solverState === "solvedFailed" || state.solverState === "pause")
  },

  updateFieldMask: () => {
    $("#field-mask").css(
      "left", config.offset.left + state.targetPieces.length * config.cellSize
    ).css(
      "width", (12 - state.targetPieces.length) * config.cellSize
    )
  },

  updateFieldPiece : () => {
    $(".katamino-piece").hide()
    state.placedPieces.forEach((place) => {
      $("#piece_" + place.pieceId + "_" + place.spinId
      ).css("top", place.offset.x * config.cellSize + config.offset.top
      ).css("left", place.offset.y * config.cellSize + config.offset.left
      ).show()
    })
  },

  updatePauseResumeButton: () => {
    $("#pause-button").prop("disabled", state.solverState !== "solving")
    $("#resume-button").prop("disabled", state.solverState !== "pause")
  },

  updateResultMessage: () => {
    $("#solved-modal").modal(state.solverState === "solvedSuccess" ? "show" : "hide")
    $("#not-solved-modal").modal(state.solverState === "solvedFailed" ? "show" : "hide")
  },
}
