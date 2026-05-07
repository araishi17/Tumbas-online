# Tumbas Online API

Backend API untuk **Tumbas Online** - Marketplace pedesaan untuk meningkatkan UMK di desa tertentu.

## 📋 Fitur

- ✅ Autentikasi User (Register & Login dengan JWT)
- ✅ Role Management (Buyer & Seller)
- ✅ Profile Management (KTP, Alamat, Bank Account)
- ✅ Upgrade ke Seller Role
- ✅ Shop Management untuk Sellers
- ✅ Password Change

## 🚀 Setup & Installation

### 1. Clone Repository
```bash
git clone https://github.com/araishi17/Tumbas-online.git
cd Tumbas-online
```

### 2. Install Dependencies
```bash
cd apps/api
npm install
```

### 3. Setup Environment Variables
```bash
cp .env.example .env
```

Edit `.env` file dengan nilai yang sesuai:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tumbas-online
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d
```

### 4. Jalankan Server
```bash
npm run dev
```

Server akan berjalan di `http://localhost:5000`

## 📚 API Endpoints

### Authentication Routes

#### 1. Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "username": "username",
  "fullName": "Full Name",
  "phoneNumber": "08123456789"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "username": "username",
    "fullName": "Full Name",
    "role": "buyer"
  }
}
```

#### 2. Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### 3. Get Current User Profile
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### 4. Update User Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "fullName": "New Full Name",
  "phoneNumber": "08987654321",
  "profilePicture": "https://example.com/pic.jpg"
}
```

#### 5. Update KTP Data
```http
PUT /api/auth/profile/ktp
Authorization: Bearer <token>
Content-Type: application/json

{
  "ktpNumber": "3217020505960001",
  "ktpImage": "https://example.com/ktp.jpg",
  "birthDate": "1996-05-05",
  "gender": "male"
}
```

#### 6. Update Address
```http
PUT /api/auth/profile/address
Authorization: Bearer <token>
Content-Type: application/json

{
  "street": "Jl. Main Street No. 123",
  "city": "Bandung",
  "province": "West Java",
  "postalCode": "40123"
}
```

#### 7. Upgrade to Seller
```http
POST /api/auth/upgrade-to-seller
Authorization: Bearer <token>
Content-Type: application/json

{
  "shopName": "My Shop",
  "category": "Electronics",
  "phoneNumber": "08123456789",
  "address": "Jl. Main Street No. 123, Bandung"
}
```

#### 8. Change Password
```http
PUT /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "password123",
  "newPassword": "newpassword123"
}
```

## 🗂️ Project Structure

```
apps/api/src/
├── config/
│   └── database.js           # MongoDB connection
├── controllers/
│   └── authController.js     # Authentication logic
├── middlewares/
│   └── auth.js              # JWT & role checking
├── models/
│   ├── User.js              # User schema
│   ├── Profile.js           # User profile schema
│   └── Shop.js              # Shop schema
├── routes/
│   └── auth.js              # Auth routes
├── .env.example             # Environment template
├── server.js                # Express app setup
└── package.json             # Dependencies
```

## 🔐 Authentication

API menggunakan JWT (JSON Web Token) untuk autentikasi. Setiap request ke protected routes harus menyertakan token di header:

```
Authorization: Bearer <token>
```

## 👥 Role-Based Access Control

- **Buyer** - User biasa yang dapat berbelanja
- **Seller** - User yang telah upgrade dan memiliki toko

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-Origin Resource Sharing
- **slugify** - URL slug generator
- **dotenv** - Environment variables

## 🧪 Testing API

Gunakan Postman atau curl untuk testing:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456","username":"testuser","fullName":"Test User"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

## 📝 Error Handling

Semua error response mengikuti format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

## 🔄 CORS Configuration

API sudah dikonfigurasi dengan CORS untuk menerima request dari berbagai domain.

## 📄 License

MIT License - Feel free to use this project for your own purposes

## 👨‍💻 Author

**araishi17** - https://github.com/araishi17

---

**Dibuat dengan ❤️ untuk mengembangkan UMK di pedesaan**
