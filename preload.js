const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("printerAPI", {
  listPrinters: () => ipcRenderer.invoke("printers:list"),
  printToPDF: () => ipcRenderer.invoke("print:pdf"),
  printToDevice: (deviceName) => ipcRenderer.invoke("print:device", deviceName),
});
