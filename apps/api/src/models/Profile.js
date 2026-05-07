const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    ktpNumber: {
      type: String,
      unique: true,
      sparse: true,
      default: null,
    },
    ktpImage: {
      type: String,
      default: null,
    },
    birthDate: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      default: null,
    },
    address: {
      street: {
        type: String,
        default: null,
      },
      city: {
        type: String,
        default: null,
      },
      province: {
        type: String,
        default: null,
      },
      postalCode: {
        type: String,
        default: null,
      },
    },
    bankAccount: {
      bankName: {
        type: String,
        default: null,
      },
      accountNumber: {
        type: String,
        default: null,
      },
      accountHolder: {
        type: String,
        default: null,
      },
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Profile', profileSchema);
