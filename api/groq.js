export default async function handler(req, res) {
  const { pergunta } = req.query;

  try {
    const resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instruct", // modelo atualizado e suportado
        messages: [{ role: "user", content: pergunta }]
      })
    });

    const data = await resposta.json();

    // Captura segura da resposta
    const texto = data.choices?.[0]?.message?.content
               || data.choices?.[0]?.messages?.[0]?.content
               || JSON.stringify(data)
               || "Não encontrei resposta.";

    res.status(200).json({ answer: texto });
  } catch (error) {
    res.status(500).json({ answer: "Erro ao consultar Groq API." });
  }
}
