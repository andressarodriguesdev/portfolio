import axios from 'axios';

const WIT_AI_TOKEN = process.env.WIT_AI_TOKEN;

export async function getWitAiResponse(message) {
  try {
    const response = await axios.get('https://api.wit.ai/message', {
      headers: {
        Authorization: `Bearer ${WIT_AI_TOKEN}`,
      },
      params: {
        v: '20241219', // Versão da API
        q: message,    // A mensagem que o usuário enviou
      },
    });

    if (response.data) {
      return response.data;
    } else {
      throw new Error('Nenhuma resposta retornada do Wit.ai');
    }
  } catch (error) {
    console.error('Erro ao chamar a API do Wit.ai:', error);
    return { error: 'Erro ao comunicar com o Wit.ai.' };
  }
}
