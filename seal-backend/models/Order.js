import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true }
  },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seal' }],
  total: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true })

export default mongoose.model('Order', orderSchema)
