const mongoose = require('mongoose');
const slugify = require('slugify');

const shopSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    shopName: {
      type: String,
      required: [true, 'Shop name is required'],
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['agriculture', 'handcraft', 'food', 'textile', 'other'],
    },
    description: {
      type: String,
      default: '',
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      street: String,
      city: String,
      province: String,
      postalCode: String,
    },
    shopImage: {
      type: String,
      default: null,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto generate slug before saving
shopSchema.pre('save', function (next) {
  if (this.isModified('shopName')) {
    this.slug = slugify(this.shopName, {
      lower: true,
      strict: true,
    });
  }
  next();
});

module.exports = mongoose.model('Shop', shopSchema);
