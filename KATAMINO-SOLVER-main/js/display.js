const display = {
  show : (kataminoField) => {
    const table = document.createElement("table")
    table.setAttribute("id","katamino-table")

    kataminoField.forEach((fieldRow) => {
      tableRow = table.insertRow(-1)
      fieldRow.forEach((val) => {
        cell = tableRow.insertCell(-1)
        if (val >= 0) {
          cell.classList.add('piece' + val)
          cell.appendChild(document.createTextNode(val))
        }
      })
    })

    const old = document.getElementById("katamino-table")
    document.getElementById("katamino-field").replaceChild(table, old)
  },
}
