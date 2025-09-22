const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { generateReceipt } = require("./receiptTemplate");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile("renderer.html");
});

// List printers
ipcMain.handle("printers:list", async () => {
  const printers = await mainWindow.webContents.getPrintersAsync();
  console.log(
    "Printer ditemukan:",
    printers.map((p) => p.name)
  );
  return printers;
});

// Utility: print content to printer
async function printToDevice(html, deviceName, show = false) {
  const printWin = new BrowserWindow({ show });
  await printWin.loadURL("about:blank");

  await printWin.webContents.executeJavaScript(
    `document.write(\`${html}\`); document.close();`
  );

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      printWin.webContents.print(
        {
          silent: true,
          deviceName,
          printBackground: true,
          margins: { marginType: "none" },
        },
        (success, failureReason) => {
          console.log(`Print to ${deviceName}:`, success, failureReason);
          if (!success) reject(failureReason);
          else resolve(success);
          if (!printWin.isDestroyed()) printWin.close();
        }
      );
    }, 300);
  });
}

// Case 1: Save to PDF (dialog selalu muncul)
ipcMain.handle("print:pdf", async () => {
  const html = generateReceipt(
    "STRUK PDF TEST",
    [
      { name: "Item A", qty: 2, price: 5000 },
      { name: "Item B", qty: 1, price: 7000 },
    ],
    17000
  );

  return printToDevice(html, "Microsoft Print to PDF", false);
});

// Case 2: Print langsung ke thermal printer (WOYA)
ipcMain.handle("print:device", async (event, deviceName) => {
  const html = generateReceipt(
    "TOKO MAJU JAYA",
    [
      { name: "Indomie", qty: 3, price: 3500 },
      { name: "Aqua Botol", qty: 2, price: 4000 },
    ],
    18500
  );

  return printToDevice(html, deviceName, false);
});

ipcMain.handle("print:escpos", async () => {
  return new Promise((resolve, reject) => {
    try {
      const device = new escpos.USB();
      const printer = new escpos.Printer(device);

      device.open(() => {
        printer
          .align("CT")
          .text("TOKO MAJU JAYA")
          .align("LT")
          .text("Indomie   3 x 3500   10500")
          .text("Aqua Botol 2 x 4000   8000")
          .drawLine()
          .align("RT")
          .text("TOTAL: 18500")
          .align("CT")
          .text("Terima kasih 🙏")
          .cut()
          .close();
        resolve(true);
      });
    } catch (e) {
      reject(e);
    }
  });
});
