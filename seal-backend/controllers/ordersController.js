import Order from '../models/Order.js'
import Seal from '../models/Seal.js'

// @desc   Skapa en ny order
// @route  POST /api/orders
// @access Private
export async function createOrder(req, res) {
  const { customer, items, total } = req.body

  if (!customer || !items || !total) {
    return res.status(400).json({ error: 'Kundinfo, varor och totalsumma krävs' })
  }

  try {
    // Hämta sälarna och kontrollera att de finns och är tillgängliga
    const sealIds = items.map(item => item._id)
    const seals = await Seal.find({ _id: { $in: sealIds }, available: true })

    if (seals.length !== sealIds.length) {
      return res.status(409).json({ error: 'En eller flera sälar är inte längre tillgängliga' })
    }

    // Skapa ordern - userId är null om man handlar som gäst
    const order = await Order.create({
      customer,
      items: seals.map(s => s._id),
      total,
      userId: req.user?.userId || null
    })

    // Markera sälarna som adopterade
    await Seal.updateMany({ _id: { $in: sealIds } }, { available: false })

    res.status(201).json(order)
  } catch (err) {
    res.status(500).json({ error: 'Något gick fel när ordern skapades' })
  }
}

// @desc   Hämta en specifik order
// @route  GET /api/orders/:id
// @access Public
export async function getOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.id).populate('items')
    if (!order) return res.status(404).json({ error: 'Ordern hittades inte' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte hämta ordern' })
  }
}

// @desc   Hämta alla ordrar för den inloggade användaren
// @route  GET /api/orders/mine
// @access Private
export async function getMyOrders(req, res) {
  try {
    const orders = await Order.find({ userId: req.user.userId })
      .populate('items')
      .sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: 'Kunde inte hämta dina ordrar' })
  }
}
