import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = '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';

app.post('/ask', async (req, res) => {
  try {
    const question = req.body.question;
    const response = await fetch(
      "https://api-inference.huggingface.co/models/meta-llama/LLaMA-2-7b-chat",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: question })
      }
    );
    const data = await response.json();
    res.json({ answer: data.generated_text || "Erro na resposta da IA." });
  } catch {
    res.json({ answer: "Erro ao processar a pergunta." });
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
