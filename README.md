# Integrasi Notes App dengan RESTful API

Aplikasi Notes App adalah aplikasi pencatatan yang memungkinkan pengguna untuk menambahkan, mengarsipkan, dan menghapus catatan. Aplikasi ini telah diintegrasikan dengan RESTful API untuk menyimpan dan mengambil data catatan dari server. Proyek ini menggunakan `anime.js` untuk animasi yang halus dan `webpack` sebagai module bundler.

## Fitur

- Menampilkan daftar catatan
- Menambahkan catatan baru
- Mengarsipkan dan menghapus catatan
- Menggunakan `anime.js` untuk animasi yang halus
- Menggunakan `webpack` sebagai module bundler
- Validasi real-time pada formulir
- Responsif untuk berbagai perangkat

## Teknologi yang Digunakan

- HTML, CSS, dan JavaScript
- Web Components
- RESTful API
- `anime.js` untuk animasi
- `webpack` untuk module bundling
- `sweetalert2` untuk menampilkan pesan

## API Endpoint

- **Base URL:** `https://notes-api.dicoding.dev/v2`

### API Endpoints

- **Get Notes (non-archived)**
  - **URL:** `/notes`
  - **Method:** `GET`
  
- **Get Archived Notes**
  - **URL:** `/notes/archived`
  - **Method:** `GET`

- **Create Note**
  - **URL:** `/notes`
  - **Method:** `POST`
  - **Request Body:**
    - `title` as string
    - `body` as string

- **Archive Note**
  - **URL:** `/notes/{note_id}/archive`
  - **Method:** `POST`

- **Unarchive Note**
  - **URL:** `/notes/{note_id}/unarchive`
  - **Method:** `POST`

- **Delete Note**
  - **URL:** `/notes/{note_id}`
  - **Method:** `DELETE`

## Cara Menjalankan Aplikasi

1. Clone repository ini
   ```bash
   git clone https://github.com/username/note-app-v2.git
   ```
2. Masuk ke direktori proyek
   ```bash
   cd note-app
   ```
3. Instal dependencies
   ```bash
   npm install
   ```
4. Jalankan aplikasi dalam mode pengembangan
   ```bash
   npm run start-dev
   ```
5. Untuk build aplikasi dalam mode produksi
   ```bash
   npm run build
   ```

## Struktur Proyek

```
note-app-v2/
│
├── dist/                     # Output dari build aplikasi
├── src/                      # Sumber kode aplikasi
│   ├── components/           # Web Components
│   │   ├── app-bar.js
│   │   ├── note-item.js
│   │   ├── note-form.js
│   │   ├── modal.js
│   │   └── loading-indicator.js
│   ├── data/                 # API interaction
│   │   ├── notes-data.js
│   ├── styles/               # CSS files
│   │   ├── main.css
│   ├── main.js               # Entry point aplikasi
│   └── index.html            # Halaman utama
├── package.json
├── webpack.dev.js            # Konfigurasi webpack untuk development
├── webpack.prod.js           # Konfigurasi webpack untuk production
└── README.md                 # Dokumentasi ini
```

## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, silakan fork repository ini dan ajukan pull request dengan perubahan Anda.

## Lisensi

Proyek ini dilisensikan di bawah MIT License.
```

Silakan ganti `https://github.com/username/note-app-v2.git` dengan URL repository GitHub Anda. Jika ada hal lain yang perlu ditambahkan atau diubah, beri tahu saya.
```