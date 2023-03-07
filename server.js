const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(bodyParser.json())

const apiUrl = 'https://api.openai.com/v1/completions'

app.post('/completions', async (req, res) => {
  const prompt = req.body.prompt
  try {
    const response = await axios({
      method: 'post',
      url: apiUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      data: {
        model: 'text-davinci-002',
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      }
    })
    if (response.data.choices && response.data.choices[0]) {
      res.json(response.data.choices[0].text.trim())
    } else {
      res.status(404).send('Nenhum resultado encontrado')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Ocorreu um erro na solicitação')
  }
})
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000')
})
