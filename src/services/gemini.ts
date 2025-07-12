import { GoogleGenAI } from '@google/genai'

const gemini = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
})

const model = 'gemini-2.5-flash'

export async function transcribeAudio(audio: string, mimeType: string) {
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: 'Transcreva o áudio para o português do Brasil. Seja preciso e natural na transcrição, mantendo a pontuação adequada e dividindo o texto em parágrafos quando for apropriado.',
      },
      {
        inlineData: {
          mimeType,
          data: audio,
        },
      },
    ],
  })
  if (!response.text) {
    throw new Error('Unable to transcribe audio')
  }
  return response.text
}

export async function generateEmbeddings(text: string) {
  const response = await gemini.models.embedContent({
    model: 'text-embedding-004',
    contents: [
      {
        text,
      },
    ],
    config: {
      taskType: 'RETRIEVAL_DOCUMENT',
    },
  })
  if (!response.embeddings || response.embeddings.length === 0) {
    throw new Error('Unable to generate embeddings')
  }
  return response.embeddings[0].values
}

export async function generateAnswer(
  question: string,
  transcription: string[]
): Promise<string> {
  const context = transcription.join('\n\n')
  const prompt =
    `Você é um assistente inteligente que responde perguntas em português com base em um contexto fornecido. 
    O contexto é o seguinte:
    \n\n${context}
    \n\nPergunta: 
    ${question}\n\n
    Responda de forma clara e concisa, utilizando o contexto para fundamentar sua resposta.
    Se não houver contexto, busque informações adicionais para responder à pergunta, mas não mencione que não há contexto.
    Apenas seja claro e objetivo.`.trim()
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt,
      },
    ],
  })
  if (!response.text) {
    throw new Error('Unable to generate answer')
  }
  return response.text
}
