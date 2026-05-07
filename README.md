# Tumbas Online - Marketplace UMKM Desa

Tumbas Online adalah platform marketplace modern untuk UMKM di tingkat desa, memudahkan pembeli menemukan dan membeli produk lokal dengan pengiriman yang efisien.

## 📋 Daftar Isi
- [Fitur Utama](#fitur-utama)
- [Tech Stack](#tech-stack)
- [Struktur Direktori](#struktur-direktori)
- [Instalasi & Setup](#instalasi--setup)
- [Dokumentasi API](#dokumentasi-api)
- [Kontribusi](#kontribusi)

## ✨ Fitur Utama

### Untuk Pembeli
- ✅ Browsing produk dari berbagai UMKM
- ✅ Sistem keranjang belanja
- ✅ Checkout dan pembayaran
- ✅ Tracking pesanan real-time
- ✅ Rating dan review produk
- ✅ Wishlist

### Untuk Penjual/UMKM
- ✅ Dashboard manajemen toko
- ✅ Kelola produk (CRUD)
- ✅ Kelola pesanan
- ✅ Analytics penjualan
- ✅ Kelola pengiriman

### Untuk Admin Desa
- ✅ Dashboard admin
- ✅ Manajemen UMKM
- ✅ Manajemen pengguna
- ✅ Laporan transaksi
- ✅ Manajemen kategori

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT + bcrypt
- **Validation**: Joi
- **Testing**: Jest

### Frontend Web
- **Framework**: Next.js 13+ (React)
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Form**: React Hook Form

### Mobile App
- **Framework**: React Native (Expo)
- **State Management**: Redux
- **Navigation**: React Navigation
- **HTTP**: Axios

### DevOps
- **Containerization**: Docker
- **Web Server**: Nginx
- **CI/CD**: GitHub Actions
- **Version Control**: Git

## 📁 Struktur Direktori

```
tumbas-online/
├── apps/
│   ├── api/                          # Backend API (Node.js + Express)
│   ├── web-client/                   # Frontend (Next.js)
│   ├── web-admin/                    # Admin Dashboard (Next.js)
│   └── mobile-app/                   # Mobile App (React Native)
├── packages/                         # Shared modules
├── docs/                             # Documentation
├── deployment/                       # DevOps config
├── .gitignore
├── docker-compose.yml
└── README.md
```

## 🚀 Instalasi & Setup

### Prerequisites
- Node.js v16+
- MongoDB
- Git

### Local Development

```bash
git clone https://github.com/araishi17/tumbas-online.git
cd tumbas-online
```

## 📞 Support

Untuk pertanyaan atau bantuan, silakan buka [Issue](https://github.com/araishi17/tumbas-online/issues).
