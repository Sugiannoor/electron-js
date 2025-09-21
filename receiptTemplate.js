// receiptTemplate.js
function generateReceipt(title, items, total) {
  const rows = items
    .map(
      (it) =>
        `<tr><td>${it.name}</td><td>${it.qty} x ${
          it.price
        }</td><td style="text-align:right">${it.qty * it.price}</td></tr>`
    )
    .join("");

  return `
  <html>
    <body style="width:58mm;font-family:monospace;font-size:12px;margin:0">
      <h3 style="text-align:center">${title}</h3>
      <table style="width:100%">
        ${rows}
      </table>
      <hr/>
      <p style="text-align:right">TOTAL: ${total}</p>
      <p style="text-align:center">Terima kasih 🙏</p>
    </body>
  </html>`;
}

module.exports = { generateReceipt };
