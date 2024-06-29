---

# Aplikasi Web Tutoring dengan Flask dan React.js

Proyek ini adalah aplikasi web untuk layanan tutoring yang dibangun menggunakan Flask untuk backend dan React untuk frontend. Kami telah mengembangkan *BrightPath*, sebuah platform edukasi daring yang dirancang untuk mendukung siswa dari berbagai tingkat pendidikan melalui bimbingan belajar yang interaktif dan terarah. *BrightPath* menghubungkan siswa dengan tutor profesional yang ahli di bidang mereka masing-masing, memungkinkan sesi pembelajaran yang fleksibel dan efektif. Dengan menggunakan *BrightPath*, siswa dapat menerima bantuan akademis dalam berbagai pelajaran, memperdalam pemahaman mereka, dan mengembangkan keterampilan mereka dengan cara yang efisien dan mendukung.

## Persyaratan

Sebelum memulai, pastikan Anda telah menginstal perangkat berikut:

- **Python 3.7 atau yang lebih baru**: [Download Python](https://www.python.org/downloads/)
- **Node.js dan npm**: [Download Node.js dan npm](https://nodejs.org/en/)

## Instalasi dan Menjalankan Backend

1. **Navigasi ke Direktori Backend**  
   Buka terminal dan masuk ke direktori backend:
   ```bash
   cd backend
   ```

2. **Buat dan Aktifkan Virtual Environment**  
   Buat virtual environment:
   ```bash
   python -m venv env
   ```
   Aktifkan virtual environment:
   - Pada Windows:
     ```bash
     env\Scripts\activate
     ```
   - Pada MacOS/Linux:
     ```bash
     source env/bin/activate
     ```

3. **Instalasi Dependencies**  
   Instal semua paket yang diperlukan:
   ```bash
   pip install flask
   pip install flask_sqlalchemy
   pip install flask_migrate
   pip install flask_jwt_extended
   pip install flask_cors
   pip install werkzeug
   ```

4. **Konfigurasi Database**  
   Inisialisasi database:
   ```bash
   flask db init
   ```
   Buat migrasi database:
   ```bash
   flask db migrate
   ```
   Terapkan migrasi database:
   ```bash
   flask db upgrade
   ```

5. **Jalankan Server Backend**  
   Jalankan server Flask:
   ```bash
   flask run
   ```
   Server backend akan berjalan di `http://localhost:5000`.

## Instalasi dan Menjalankan Frontend

1. **Buka Terminal Baru**  
   Pada terminal yang sama di mana backend sedang berjalan, buka tab terminal baru (klik `+` pada ujung kanan tab terminal).

2. **Navigasi ke Direktori Frontend**  
   Masuk ke direktori frontend:
   ```bash
   cd frontend
   ```

3. **Instalasi Dependencies**  
   Instal semua paket yang diperlukan:
   ```bash
   npm install
   npm install react-bootstrap bootstrap
   ```

4. **Jalankan Aplikasi Frontend**  
   Jalankan aplikasi React:
   ```bash
   npm start
   ```
   Aplikasi frontend akan berjalan di `http://localhost:3000`.

## Struktur Proyek

```
project_root/
│
├── backend/
│   ├── env/                    # Virtual environment
│   ├── instance/               # Instance folder
│   ├── migrations/             # Migrations folder
│   ├── app.py                  # Main application file
│   └── ...
│
└── frontend/
    ├── node_modules/           # Node modules
    ├── public/                 # Public folder
    ├── src/                    # Source code
    └── ...
```

## Catatan

- Pastikan virtual environment diaktifkan setiap kali Anda bekerja pada proyek ini.
- Jika Anda mengalami masalah dengan migrasi database, coba jalankan ulang perintah `flask db migrate` dan `flask db upgrade`.
- Jika Anda ingin menjalankan backend dan frontend secara bersamaan, pastikan kedua terminal tetap aktif.

## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, silakan fork repositori ini dan buat pull request dengan perubahan Anda.

---

**Selamat mengembangkan!**

---
