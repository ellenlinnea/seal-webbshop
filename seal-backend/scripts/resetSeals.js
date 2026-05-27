import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Seal from '../models/Seal.js'
import Order from '../models/Order.js'

// Återställer alla sälar till tillgängliga och rensar ordrar
// Användare och favoriter påverkas inte
// Kör med: npm run reset-seals

dotenv.config()

await mongoose.connect(process.env.MONGO_URI)
console.log('Ansluten till MongoDB')

//Tar bara bort ordrar så att sälar kan köpas igen
await Order.deleteMany({})
console.log('Ordrar rensade')

//Sätter alla sälar till available: true, så de kan köpas igen
await Seal.updateMany({}, { available: true })
console.log('Alla sälar återställda till tillgängliga')

await mongoose.disconnect()
console.log('Klart!')
