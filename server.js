import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/search', async (req, res) => {
  const query = req.body.query;
  try {
    const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&skip_disambig=1`);
    const data = await response.json();

    // Pegando a resposta relevante
    const answer = data.AbstractText || data.RelatedTopics[0]?.Text || "Nenhuma resposta encontrada.";
    res.json({ answer });
  } catch (error) {
    res.json({ answer: "Erro ao buscar a resposta." });
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
