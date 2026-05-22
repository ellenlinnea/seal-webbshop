import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Ansluten till MongoDB')
  } catch (err) {
    console.error('Kunde inte ansluta till MongoDB:', err.message)
    process.exit(1)
  }
}

export default connectDB
