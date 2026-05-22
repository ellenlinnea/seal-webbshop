import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import Seal from '../models/Seal.js'
import User from '../models/User.js'
import Order from '../models/Order.js'

//Seedar alla sälar + testanvändare: user@mail.se - password
//Kan använda samma för att seeda om efter testande och borttagande av sälar för att återställa

dotenv.config()

const seals = [
  {
    name: 'Sture',
    age: 7,
    gender: 'hane',
    size: 'stor',
    weight: '142 kg',
    price: 12500,
    housetrained: true,
    popularity: 98,
    personality: 'lugn, eftertänksam',
    traits: ['Älskar sill', 'Ogillar måndagar', 'Snarkar diskret'],
    bio: 'Sture är en gentleman av den gamla skolan. Han uppskattar långa promenader på stranden och en god middag med sill och nubbe.',
    image: '/sture.jpg'
  },
  {
    name: 'Anna-Karin',
    age: 4,
    gender: 'hona',
    size: 'mellan',
    weight: '78 kg',
    price: 14200,
    housetrained: true,
    popularity: 94,
    personality: 'social, busig',
    traits: ['Pratar för mycket', 'Älskar Eurovision', 'Sjunger i duschen'],
    bio: 'Anna-Karin är hela hamnens drottning. Charmig, högljudd och fullständigt oemotståndlig på fredagar.',
    image: '/anna-karin.jpg'
  },
  {
    name: 'Stig',
    age: 11,
    gender: 'hane',
    size: 'stor',
    weight: '168 kg',
    price: 8900,
    housetrained: false,
    popularity: 71,
    personality: 'envis, mysig',
    traits: ['Vägrar äta strömming', 'Älskar P1', 'Behöver morgonkaffe'],
    bio: 'Stig vet vad han vill, och vad han inte vill. Mest av allt vill han ligga i skärgården och fundera.',
    image: '/stig.jpg'
  },
  {
    name: 'Birgitta',
    age: 6,
    gender: 'hona',
    size: 'mellan',
    weight: '92 kg',
    price: 13800,
    housetrained: true,
    popularity: 89,
    personality: 'omtänksam, klok',
    traits: ['Bästa lyssnaren', 'Ogillar oväsen', 'Strikt med rutiner'],
    bio: 'Birgitta är som en favoritmoster: alltid där med ett varmt blickfång och ibland en sträng ton.',
    image: '/birgitta.jpg'
  },
  {
    name: 'Bengt',
    age: 3,
    gender: 'hane',
    size: 'liten',
    weight: '52 kg',
    price: 9500,
    housetrained: false,
    popularity: 82,
    personality: 'lekfull, energisk',
    traits: ['Sover sällan', 'Älskar bollar', 'Stjäl tofflor'],
    bio: 'Bengt är ung och full av spring. Han skulle behöva en familj som har tålamod och många bollar.',
    image: '/bengt.jpg'
  },
  {
    name: 'Margareta',
    age: 9,
    gender: 'hona',
    size: 'stor',
    weight: '128 kg',
    price: 11200,
    housetrained: true,
    popularity: 76,
    personality: 'värdig, försiktig',
    traits: ['Dricker bara kallt vatten', 'Älskar opera', 'Mjukvarm'],
    bio: 'Margareta har sett mycket. Hon föredrar tystnad, klassisk musik och en god säng nära fönstret.',
    image: '/margareta.jpg'
  },
  {
    name: 'Yngve',
    age: 5,
    gender: 'hane',
    size: 'mellan',
    weight: '85 kg',
    price: 10800,
    housetrained: true,
    popularity: 88,
    personality: 'stoisk, pålitlig',
    traits: ['Aldrig sen', 'Punkt-säl', 'Goda manér'],
    bio: 'Yngve har de bästa manér i hela hamnen. Han hälsar artigt, äter prydligt och tackar alltid för maten.',
    image: '/yngve.jpg'
  },
  {
    name: 'Solveig',
    age: 8,
    gender: 'hona',
    size: 'mellan',
    weight: '88 kg',
    price: 12200,
    housetrained: true,
    popularity: 79,
    personality: 'drömmande, mjuk',
    traits: ['Stjärnskådare', 'Älskar regn', 'Sjunger i sömnen'],
    bio: 'Solveig är hela kustens romantiker. Hon kan ligga i timmar och titta på molnen.',
    image: '/solveig.jpg'
  },
  {
    name: 'Ragnar',
    age: 2,
    gender: 'hane',
    size: 'liten',
    weight: '38 kg',
    price: 8200,
    housetrained: false,
    popularity: 65,
    personality: 'busig, nyfiken',
    traits: ['Klättrar på allt', 'Öppnar lådor', 'Aldrig nöjd'],
    bio: 'Ragnar är pojken som måste se allt först. Energisk, lite stökig, helt charmig.',
    image: '/ragnar.jpg'
  },
  {
    name: 'Gunhild',
    age: 12,
    gender: 'hona',
    size: 'stor',
    weight: '155 kg',
    price: 7400,
    housetrained: true,
    popularity: 58,
    personality: 'tålmodig, varm',
    traits: ['Bakar i tankarna', 'Älskar barnbarn', 'Ger råd ofta'],
    bio: 'Gunhild är säl-mormor par excellence. Hon är klok, varm och har alltid en historia på lager.',
    image: '/gunhild.jpg'
  },
  {
    name: 'Kjell-Åke',
    age: 6,
    gender: 'hane',
    size: 'stor',
    weight: '135 kg',
    price: 11800,
    housetrained: true,
    popularity: 84,
    personality: 'jovialisk, högljudd',
    traits: ['Berättar samma vits', 'Ledare i flocken', 'Stor aptit'],
    bio: 'Kjell-Åke är hela kompisgängets centrum. Stor, glad, och alltid den sista som lämnar bryggan.',
    image: '/kjell-åke.jpg'
  },
  {
    name: 'Gun-Britt',
    age: 5,
    gender: 'hona',
    size: 'mellan',
    weight: '76 kg',
    price: 13400,
    housetrained: true,
    popularity: 91,
    personality: 'praktisk, smart',
    traits: ['Räknar fiskar i sömnen', 'Ordningsam', 'Älskar listor'],
    bio: 'Gun-Britt är säl-effektivitet personifierad. Hon vet alltid var allt är, och vad klockan är.',
    image: '/gun-britt.jpg'
  },
  {
    name: 'Doris',
    age: 7,
    gender: 'hona',
    size: 'mellan',
    weight: '81 kg',
    price: 13100,
    housetrained: true,
    popularity: 87,
    personality: 'bestämd, principfast',
    traits: ['Röstar i varje val', 'Har starka åsikter om allt', 'Skriver insändare på fritiden'],
    bio: 'Doris har en åsikt om allt och är inte rädd att dela med sig av den. Hon demonstrerade senast i tisdags och har redan skrivit tre insändare den här veckan.',
    image: '/doris.jpg'
  },
  {
    name: 'Gösta',
    age: 14,
    gender: 'hane',
    size: 'stor',
    weight: '172 kg',
    price: 6800,
    housetrained: true,
    popularity: 52,
    personality: 'trött, bitter',
    traits: ['Minns hur det var förr', 'Klagar på ungdomar', 'Somnar mitt i meningar'],
    bio: 'Gösta har levt ett långt liv och har synpunkter på precis allt som hänt sedan 1987. Han är inte sur — han är bara besviken.',
    image: '/gösta.jpg'
  },
  {
    name: 'Rigmor',
    age: 5,
    gender: 'hona',
    size: 'mellan',
    weight: '74 kg',
    price: 14600,
    housetrained: true,
    popularity: 78,
    personality: 'spirituell, intensiv',
    traits: ['Läser tarot varje morgon', 'Pratar med stenar', 'Misstror mikrovågsugnar'],
    bio: 'Rigmor är inne i en andlig resa och drar gärna med sig andra. Hon har kristaller i varje rum och hör kosmiska budskap i havsvinden.',
    image: '/rigmor.jpg'
  },
  {
    name: 'Torsten',
    age: 4,
    gender: 'hane',
    size: 'liten',
    weight: '49 kg',
    price: 9200,
    housetrained: false,
    popularity: 73,
    personality: 'lättdistraherad, entusiastisk',
    traits: ['Börjar aldrig färdigt', 'Älskar varje ny hobby i exakt två veckor', 'Har tre oavslutade pussel'],
    bio: 'Torsten kastar sig in i allt med full energi. Just nu håller han på att lära sig kalligrafi, spela bougataki och renovera en gammal fiskebåt. Samtidigt.',
    image: '/torsten.jpg'
  },
  {
    name: 'Melker',
    age: 3,
    gender: 'hane',
    size: 'liten',
    weight: '44 kg',
    price: 10400,
    housetrained: true,
    popularity: 81,
    personality: 'känslosam, dramatisk',
    traits: ['Gråter vid reklam', 'Tar allt personligt', 'Behöver bekräftelse dagligen'],
    bio: 'Melker känner allt på djupet. En solnedgång kan ta honom ur balans i tre dagar. Men han ger också världens bästa kramar.',
    image: '/melker.jpg'
  },
  {
    name: 'Rune',
    age: 9,
    gender: 'hane',
    size: 'stor',
    weight: '149 kg',
    price: 8600,
    housetrained: true,
    popularity: 63,
    personality: 'misstänksam, försiktig',
    traits: ['Litar inte på grannar', 'Kollar alltid att dörren är låst två gånger', 'Har aldrig öppnat en länk'],
    bio: 'Rune tar inga risker. Han har brandsläckare i varje rum, tre lager lås på dörren och har aldrig klickat på ett mejl i hela sitt liv.',
    image: '/rune.jpg'
  },
  {
    name: 'Anneli',
    age: 6,
    gender: 'hona',
    size: 'mellan',
    weight: '83 kg',
    price: 12700,
    housetrained: true,
    popularity: 85,
    personality: 'naturälskande, fridfull',
    traits: ['Plockar blommor varje dag', 'Pressar tång som konst', 'Pratar med sjögräs'],
    bio: 'Anneli hittar skönhet i allt som växer. Hon kommer hem med fickorna fulla av blommor, snäckor och konstiga bitar av trä som hon kallar "fynd".',
    image: '/anneli.jpg'
  },
  {
    name: 'Kent',
    age: 8,
    gender: 'hane',
    size: 'stor',
    weight: '138 kg',
    price: 9900,
    housetrained: true,
    popularity: 77,
    personality: 'tävlingsinriktad, överdrivet seriös',
    traits: ['Räknar kalorier på fisken', 'Tränar även på semester', 'Äter ingenting vitt'],
    bio: 'Kent är inte nöjd med silver. Han vaknar 05:00 varje morgon, oavsett väder, och har en personlig bästa-tid på nästan allting.',
    image: '/kent.jpg'
  },
  {
    name: 'Gudrun',
    age: 11,
    gender: 'hona',
    size: 'stor',
    weight: '161 kg',
    price: 7200,
    housetrained: true,
    popularity: 60,
    personality: 'nostalgisk, sentimental',
    traits: ['Sparar allt', 'Har tidningar från 1994', 'Gråter när IKEA byter sortiment'],
    bio: 'Gudrun kastar ingenting. Hennes hem är ett museum över saker som "kan komma till nytta". Hittills har ingenting kommit till nytta.',
    image: '/gudrun.jpg'
  },
  {
    name: 'Göran',
    age: 2,
    gender: 'hane',
    size: 'liten',
    weight: '41 kg',
    price: 11300,
    housetrained: false,
    popularity: 69,
    personality: 'cool, ointresserad',
    traits: ['Lyssnar bara på vinyl', 'Har aldrig sett en Marvel-film', 'Dricker bara vatten utan kolsyra'],
    bio: 'Göran är för cool för det mesta. Han kom inte på festen men hörde att den var okej. Han följer inte tillbaka på sociala medier men det är medvetet.',
    image: '/göran.jpg'
  },
  {
    name: 'Ulla',
    age: 10,
    gender: 'hona',
    size: 'mellan',
    weight: '95 kg',
    price: 8100,
    housetrained: true,
    popularity: 72,
    personality: 'överbeskyddande, kärleksfull',
    traits: ['Packar alltid för mycket mat', 'Oroar sig för allt', 'Skickar artiklar om hälsorisker'],
    bio: 'Ulla älskar för mycket och oroas ännu mer. Hon skickar väderleksrapporter innan du reser och ringer för att kolla att du kommit hem.',
    image: '/ulla.jpg'
  },
  {
    name: 'Bertil',
    age: 6,
    gender: 'hane',
    size: 'mellan',
    weight: '88 kg',
    price: 10100,
    housetrained: true,
    popularity: 66,
    personality: 'filosofisk, förvirrad',
    traits: ['Ställer frågor utan svar', 'Ifrågasätter allt', 'Har aldrig bestämt sig för något'],
    bio: 'Bertil undrar varför vi är här, vad tid egentligen är och om fisken han åt igår verkligen existerade. Han är trevlig att prata med men aldrig klar med ett resonemang.',
    image: '/bertil.jpg'
  }
]

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Ansluten till MongoDB')

    // Rensa befintlig data
    await Seal.deleteMany()
    await User.deleteMany()
    await Order.deleteMany()
    console.log('Befintlig data rensad')

    // Lägg in alla sälar
    await Seal.insertMany(seals)
    console.log(`${seals.length} sälar inlagda`)

    // Skapa standardanvändare (VG-krav: user/password)
    const hashedPassword = await bcrypt.hash('password', 10)
    await User.create({
      name: 'Standardanvändare',
      email: 'user@mail.se',
      password: hashedPassword
    })
    console.log('Standardanvändare skapad (user@mail.se / password)')

    console.log('Seeding klar!')
  } catch (err) {
    console.error('Något gick fel:', err.message)
  } finally {
    mongoose.disconnect()
  }
}

seed()
