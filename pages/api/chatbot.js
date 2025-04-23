import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Variável global para armazenar os dados do currículo
let curriculumData = {};

// Função para carregar o currículo do arquivo JSON
async function loadCurriculumData() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'curriculum.json');
  try {
    const data = await fs.readFile(filePath, 'utf8');
    curriculumData = JSON.parse(data);
    console.log('Currículo carregado com sucesso.');
  } catch (err) {
    console.error('Erro ao carregar o currículo:', err.message);
    curriculumData = {}; // Define como vazio em caso de erro
  }
}

// Carrega o currículo ao iniciar o servidor
loadCurriculumData();

// Configuração da chave de API do Wit.ai
const witApiKey = process.env.WIT_API_KEY;

// Função para enviar requisição para o Wit.ai
async function getWitAiResponse(messageInput) {
  try {
    const context = `
      Aqui estão algumas informações sobre a Andressa:
      - Soft skills: Comunicação, trabalho em equipe, organização.
      - Hard skills: Java, SQL, APIs RESTful.
      - Projetos: ChamaElas, Capivara System, Hotel Eclipse.
    `;

    const query = `${context} Pergunta: ${messageInput}`;

    console.log('Enviando para Wit.ai a mensagem:', query);

    const response = await axios.post(
      'https://api.wit.ai/message',
      null,
      {
        params: { q: query, v: '20241219' },
        headers: { Authorization: `Bearer ${witApiKey}` },
      }
    );

    if (response.data && response.data.text) {
      return response.data.text.trim();
    } else {
      console.error('Resposta inesperada da API do Wit.ai:', response.data);
      return 'Desculpe, não consegui gerar uma resposta no momento.';
    }
  } catch (error) {
    console.error('Erro ao chamar a API do Wit.ai:', error.response?.data || error.message);
    return 'Não entendi. Pode reformular a sua pergunta? 🤔';
  }
}

// Função para tratar saudações
function handleGreetings(message) {
  const greetings = ['olá', 'oi', 'bom dia', 'boa tarde', 'boa noite', 'e aí', 'tudo bem'];
  const lowerCaseMessage = message.toLowerCase();

  const responses = [
    'Olá! Sou Laura, assistente virtual da Andressa. Como posso ajudar você hoje? 👋😊',
    'Oi! Como você está? Sou a assistente da Andressa, pronta para te ajudar! 💬✨',
    'Olá! Qualquer dúvida sobre a Andressa, estou à disposição! 🤔👩‍💻',
    'Oi! Em que posso te ajudar hoje? Pergunte o que quiser sobre a Andressa! 🤖💬',
    'Olá! Vamos conversar? O que posso contar sobre a Andressa? 🤝📚',
  ];

  if (greetings.some(greeting => lowerCaseMessage.includes(greeting))) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  return null;
}

// Função para tratar agradecimentos e despedidas
function handleThanksAndGoodbyes(message) {
  const thanks = ['obrigado', 'obrigada', 'valeu', 'agradeço'];
  const goodbyes = ['tchau', 'até mais', 'até logo', 'adeus'];

  const lowerCaseMessage = message.toLowerCase();

  // Respostas para agradecimentos
  if (thanks.some(thank => lowerCaseMessage.includes(thank))) {
    return [
      'De nada! Posso ajudar com mais alguma coisa?',
      'Por nada! Se precisar de algo mais, é só falar.',
    ][Math.floor(Math.random() * 2)];
  }

  // Respostas para despedidas
  if (goodbyes.some(goodbye => lowerCaseMessage.includes(goodbye))) {
    return [
      'Tchau! Tenha um ótimo dia!',
      'Até mais! Estou aqui sempre que precisar.',
    ][Math.floor(Math.random() * 2)];
  }

  return null;
}

// Função para normalizar o texto
function normalizeText(query) {
  const synonymMap = {
    'competência': 'competencia',
    'habilidades interpessoais': 'soft skills',
    'habilidades técnicas': 'hard skills',
    'experiência': 'experiência profissional',
    'projetos': 'experiência',
    'educação': 'formação',
    'graduação': 'formação',
    'curso': 'cursos complementares',
    'tecnologias': 'hard skills',
    'programação': 'hard skills',
    'objetivo profissional': 'objetivo',
    'contato': 'dados de contato',
    'e-mail': 'contato',
    'telefone': 'contato',
    'localização': 'contato',
  };

  let normalizedQuery = query.toLowerCase();
  for (const [key, value] of Object.entries(synonymMap)) {
    normalizedQuery = normalizedQuery.replace(new RegExp(key, 'g'), value);
  }
  return normalizedQuery;
}


// Função para buscar informações no currículo
function searchCurriculum(query) {
  const normalizedQuery = normalizeText(query);

  const responses = {
    softSkills: [
      `As soft skills da Andressa incluem:
      - Comunicação eficaz
      - Trabalho em equipe
      - Organização e gestão de tempo
      - Resolução de problemas
      - Adaptabilidade. 😊`,
      'A Andressa é muito boa em comunicação, organização e resolução de problemas! 🧠💡',
    ],
    hardSkills: [
      `As hard skills da Andressa incluem:
      - Linguagens: Java, JavaScript, SQL
      - Frameworks: Spring Boot, Node.js
      - Ferramentas: Git, Docker, MySQL. 🛠️`,
      'Java, Spring Boot, Docker... a Andressa domina tudo isso e mais! 🚀',
    ],
    languages: [
      `As linguagens de programação que Andressa domina são:
      - Java
      - JavaScript
      - SQL. 💻`,
      'Ela tem experiência em Java, JavaScript e SQL. 🚀',
    ],
    languagesSpoken: [
      `Os idiomas falados por Andressa são:
      - Português (nativo)
      - Inglês (intermediário). 🌍`,
      'Andressa fala português e tem conhecimento intermediário de inglês. 🇧🇷🇺🇸',
    ],
    education: [
      `A formação acadêmica da Andressa é:
      - Centro Universitário das Américas (FAM)
      - Conclusão: Julho de 2028. 🎓`,
      'Andressa está cursando Sistemas da Informação, com previsão de conclusão em 2028. 📚',
    ],
    experience: [
      `VTREAL Tecnologia – Estagiária de Banco de Dados (3 meses) 
      - Atuação com atualização e manutenção de bases de dados.
      - Suporte à integridade e organização dos dados utilizados nos sistemas da empresa.
      - Experiência prática com rotinas de banco de dados em ambiente profissional.`,
    ],
    contact: [
      `Dados de contato da Andressa:
      - E-mail: andressa.rodrigues.2172@gmail.com
      - Celular: (61) 9 8122-7461
      - Localização: Brasília - DF. 📞`,
      'Você pode falar com a Andressa pelo e-mail ou WhatsApp. 📧📱',
    ],
    goal: [
      'O objetivo da Andressa é atuar no desenvolvimento de software, utilizando suas habilidades em Java e outras tecnologias para criar soluções eficientes e inovadoras. 💻',
      'Andressa busca uma oportunidade no desenvolvimento de sistemas, com foco em resolver problemas através de tecnologias como Java, sempre aberta a desafios em diversas áreas do desenvolvimento de software. 🚀',
      'Ela deseja trabalhar no desenvolvimento de soluções tecnológicas, aplicando seu conhecimento em Java e outras ferramentas, seja no back-end ou em outras áreas do desenvolvimento de software. 💡',
    ]
    ,
    complementaryCourses: [
      ` Entre os cursos que Andressa fez estão:
        Bootcamp Potência Tech iFood (2023): Fundamentos de programação.
        Bootcamp ElasTech (2024): Java, Spring Boot e MySQL.
        Java Backend (Ada Tech, 2024): POO e design patterns.
        Fundamentos de Testes de Software (2024): Testes unitários e integração.
        Inglês (EF Education First, em andamento): Aperfeiçoamento do idioma.
        Esses cursos complementam seu conhecimento técnico e de negócios. 📚🚀 ', `  
            
    ],
  };

  // Verifica se a consulta contém um dos tópicos programados
  if (normalizedQuery.includes('linguagens de programação') || normalizedQuery.includes('linguagens') || normalizedQuery.includes('programação')) {
    return responses.languages[Math.floor(Math.random() * responses.languages.length)];
  }

  if (normalizedQuery.includes('habilidades comportamentais') || normalizedQuery.includes('soft skills') || normalizedQuery.includes('competências interpessoais') || normalizedQuery.includes('habilidades interpessoais')) {
    return responses.softSkills[Math.floor(Math.random() * responses.softSkills.length)];
  }

  if (normalizedQuery.includes('habilidades técnicas') || normalizedQuery.includes('hard skills') || normalizedQuery.includes('habilidades') || normalizedQuery.includes('linguagens') || normalizedQuery.includes('frameworks') || normalizedQuery.includes('ferramentas') || normalizedQuery.includes('tecnologias') || normalizedQuery.includes('tecnicas') || normalizedQuery.includes('programação')) {
    return responses.hardSkills[Math.floor(Math.random() * responses.hardSkills.length)];
  }

  // Separando a verificação de cursos complementares e formação acadêmica
  if (normalizedQuery.includes('formação') || normalizedQuery.includes('educação') || normalizedQuery.includes('graduação')) {
    return responses.education[Math.floor(Math.random() * responses.education.length)];
  }

  if (normalizedQuery.includes('cursos complementares') || normalizedQuery.includes('cursos realizados') || normalizedQuery.includes('formação complementar')) {
    return responses.complementaryCourses[Math.floor(Math.random() * responses.complementaryCourses.length)];
  }

  if (normalizedQuery.includes('experiência') || normalizedQuery.includes('projetos') || normalizedQuery.includes('trabalhos') || normalizedQuery.includes('portfolio')) {
    return responses.experience[Math.floor(Math.random() * responses.experience.length)];
  }

  if (normalizedQuery.includes('contato') || normalizedQuery.includes('dados de contato') || normalizedQuery.includes('e-mail') || normalizedQuery.includes('celular') || normalizedQuery.includes('localização')) {
    return responses.contact[Math.floor(Math.random() * responses.contact.length)];
  }

  if (normalizedQuery.includes('objetivo') || normalizedQuery.includes('objetivo profissional') || normalizedQuery.includes('meta') || normalizedQuery.includes('meta profissional')) {
    return responses.goal[Math.floor(Math.random() * responses.goal.length)];
  }

  // Se não encontrar uma resposta programada, retorna uma mensagem com opções
  return `
    Desculpe, não consegui encontrar uma resposta para sua pergunta. Aqui estão alguns tópicos sobre os quais você pode perguntar:
    - Habilidades técnicas (ex.: "Quais linguagens de programação ela utiliza?")
    - Habilidades comportamentais (ex.: "Quais são as soft skills da Andressa?")
    - Experiência profissional (ex.: "Quais projetos ela já desenvolveu?")
    - Formação acadêmica (ex.: "Qual é a formação da Andressa?")
    - Contato (ex.: "Como posso entrar em contato com a Andressa?")
    
    Se precisar de mais ajuda, é só perguntar! 😊
  `;
}



// Handler principal para processar requisições
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Apenas requisições POST são permitidas.' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Mensagem não fornecida.' });
  }

  console.log('Mensagem recebida:', message);

  // Recarrega os dados do currículo antes de processar a solicitação
  await loadCurriculumData();

  // Verifica se é um agradecimento ou despedida
  const thanksOrGoodbyeResponse = handleThanksAndGoodbyes(message);
  if (thanksOrGoodbyeResponse) {
    return res.status(200).json({ reply: thanksOrGoodbyeResponse });
  }

  // Verifica saudações
  const greetingResponse = handleGreetings(message);
  if (greetingResponse) {
    return res.status(200).json({ reply: greetingResponse });
  }

  // Busca resposta programada no currículo
  const programmedResponse = searchCurriculum(message);
  if (programmedResponse) {
    return res.status(200).json({ reply: programmedResponse });
  }

  // Envia mensagem para o Wit.ai caso nenhuma resposta programada seja encontrada
  const witAiResponse = await getWitAiResponse(message);
  return res.status(200).json({ reply: witAiResponse });
}