import express from 'express'

const app = express()
const PORT = 3000
const API_URL = 'https://dummyjson.com/products'

app.get('/api/products', async (req, res) => {
  try {
    const response = await fetch(`${API_URL}?limit=10`)

    if (!response.ok) {
      throw new Error('Ошибка при получении списка продуктов')
    }

    const data = await response.json()

    const products = data.products.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      brand: product.brand,
      thumbnail: product.thumbnail,
    }))

    res.json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/products/search', async (req, res) => {
  try {
    const { q } = req.query

    if (!q) {
      throw new Error('Параметр поиска "q" обязателен')
    }

    const response = await fetch(`${API_URL}/search?q=${q}`)

    if (!response.ok) {
      throw new Error('Ошибка при поиске продуктов')
    }

    const data = await response.json()

    const products = data.products.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      brand: product.brand,
      thumbnail: product.thumbnail,
    }))

    res.json(products)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params

    const response = await fetch(`${API_URL}/${id}`)

    if (!response.ok) {
      throw new Error(`Продукт с id ${id} не найден`)
    }

    const data = await response.json()

    const product = {
      id: data.id,
      title: data.title,
      description: data.description,
      price: data.price,
      rating: data.rating,
      brand: data.brand,
      category: data.category,
      thumbnail: data.thumbnail,
    }

    res.json(product)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`)
})
