# 📄 README — Electron Silent Print Example

## 🖥️ Deskripsi

Proyek ini adalah contoh aplikasi **Electron** untuk:

1. Menyimpan struk ke **PDF** (via Microsoft Print to PDF).
2. Mencetak struk langsung ke **thermal printer** (misalnya WOYA Portable 80mm) dengan **silent print** (tanpa dialog).

Fitur utama:

- Menampilkan daftar printer yang tersedia di sistem.
- Tombol untuk menyimpan struk ke PDF.
- Tombol untuk cetak langsung ke printer thermal.
- Template struk terpisah (`receiptTemplate.js`) agar mudah dimodifikasi.

---

## ⚙️ Persyaratan

- **Node.js 20.12.2** (versi lain >=20 biasanya juga bisa).
- **npm** sudah terpasang.
- **Printer driver** sudah diinstal di sistem (contoh: _WOYA Portable 80mm_ kalau pakai bluetooth yang penting OS sudah bisa membaca).
- Windows / Linux / macOS yang mendukung Electron.

---

## 📂 Struktur Proyek

electron-printer-app/
├─ main.js # Main process, handle printing & window
├─ preload.js # IPC bridge ke renderer
├─ renderer.html # UI sederhana untuk demo
├─ receiptTemplate.js # Template HTML struk kasir
├─ package.json

## RUN

dont forget npm install electron --save-dev
use npm start (based on package.json)

Note: thermal perlu driver tambahan WinUSB/libusbK (Zadig), escpos
npm install escpos escpos-usb and need install driver ke printer nya
