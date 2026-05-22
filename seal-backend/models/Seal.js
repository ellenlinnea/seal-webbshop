import mongoose from 'mongoose'

const sealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['hane', 'hona'], required: true },
  size: { type: String, enum: ['liten', 'mellan', 'stor'], required: true },
  weight: { type: String, required: true },
  price: { type: Number, required: true },
  housetrained: { type: Boolean, default: false },
  popularity: { type: Number, default: 0 },
  personality: { type: String, required: true },
  traits: [{ type: String }],
  bio: { type: String, required: true },
  image: { type: String, required: true },
  available: { type: Boolean, default: true }
})

export default mongoose.model('Seal', sealSchema)
