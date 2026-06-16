import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'

const app = express() // 1. cria o app primeiro

app.use(cors()) // 2. libera CORS pro HTML
app.use(express.json()) // 3. lê JSON do body

// Conexão com MySQL do XAMPP
const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'api_db' // cuidado: no final do teu código tava 'api_bd' errado
})

console.log('Conectado ao MySQL')

// POST - cria usuário
app.post('/usuarios', async (req, res) => {
  const { nome, email, idade } = req.body
  try {
    const [result] = await db.query(
      'INSERT INTO usuarios (nome, email, idade) VALUES (?,?,?)',
      [nome, email, idade]
    )
    res.status(201).json({ id: result.insertId, nome, email, idade })
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

// GET - lista usuários
app.get('/usuarios', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})