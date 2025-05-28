require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const API_KEY = process.env.CAT_API_KEY;
const headers = { 'x-api-key': API_KEY };

// Página inicial com raças e imagens aleatórias
app.get('/', async (req, res) => {
  try {
    const raças = await axios.get('https://api.thecatapi.com/v1/breeds', { headers });
    const imagens = await axios.get('https://api.thecatapi.com/v1/images/search?limit=9', { headers });

    res.render('index', { raças: raças.data, imagens: imagens.data });
  } catch (err) {
    res.send('Erro ao carregar gatinhos 🐱');
  }
});

// Página de detalhes de uma raça
app.get('/detalhes/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const imagem = await axios.get(`https://api.thecatapi.com/v1/images/${id}`, { headers });
    res.render('detalhes', { gato: imagem.data });
  } catch (err) {
    res.send('Erro ao buscar detalhes do gatinho.');
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});