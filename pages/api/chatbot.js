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
    curriculumData = {};
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
      - Projetos: ChamaElas, Capivara System, Admin Stay.
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

  if (thanks.some(thank => lowerCaseMessage.includes(thank))) {
    return [
      'De nada! Posso ajudar com mais alguma coisa?',
      'Por nada! Se precisar de algo mais, é só falar.',
    ][Math.floor(Math.random() * 2)];
  }

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
    ],
    hardSkills: [
      `As hard skills da Andressa incluem:
      - Linguagens: Java, JavaScript, SQL, Python
      - Frameworks: Spring Boot, React, Node.js, Thymeleaf
      - Ferramentas: Git, Docker, JUnit, Mockito, Postman
      - Banco de dados: MySQL, PostgreSQL, H2
      - Desenvolvimento: APIs RESTful, integração com banco de dados
      - Metodologias: Scrum, práticas ágeis. 🛠️`,
    ],
    languages: [
      `As linguagens de programação que Andressa domina são:
      - Java
      - JavaScript
      - SQL
      - Python (básico). 🐍`,
    ],
    languagesSpoken: [
      `Os idiomas falados por Andressa são:
      - Inglês (intermediário). 🌍`,
    ],
    education: [
      `A formação acadêmica da Andressa é:
      - Sistemas da Informação (Graduação)
      - Centro Universitário das Américas (FAM)
      - Conclusão: Julho de 2028. 🎓`,
    ],
    experience: [
      `Experiência profissional da Andressa:

🔹 **VTREAL Tecnologia (3 meses)**  
Estagiária de Banco de Dados:  
- Atualização e manutenção de bases de dados  
- Suporte à integridade e organização das informações  
- Experiência prática com rotinas de banco de dados em ambiente profissional. 💼`,
    ],
   projects: [
  `Projetos desenvolvidos por Andressa:

🔹 **Admin Stay (2025)**  
Sistema fullstack para gestão de hotéis e pousadas.  
Funcionalidades: cadastro de clientes e quartos, controle de reservas, histórico e consultas detalhadas.  
Tecnologias: Java (Spring Boot), React, Tailwind CSS, MySQL/H2, Docker, Swagger, Postman, JUnit, Mockito.

🔹 **ChamaElas (2024)**  
Plataforma de gestão de chamados desenvolvida no Bootcamp ElasTech.  
Funcionalidades: atribuição de técnicos, controle de chamados, interface amigável.  
Tecnologias: Java, Spring Boot, MySQL, Thymeleaf.

🔹 **Capivara System**  
Sistema para catalogar capivaras.  
Funcionalidades: cadastro, alteração, exclusão e filtro por habitat.  
Tecnologias: Node.js e Vue.js.

🗂️ Todos os projetos estão disponíveis no GitHub:  
👉 https://github.com/andressarodrigues2172dev`,
],
    contact: [
      `Dados de contato da Andressa:
      - E-mail: andressa.rodrigues.2172@gmail.com
      - Celular: (61) 9 8122-7461
      - Localização: Brasília - DF. 📞`,
    ],
    goal: [
      'O objetivo da Andressa é atuar no desenvolvimento de software, utilizando suas habilidades em Java e outras tecnologias para criar soluções eficientes e inovadoras. 💻',
    ],
    complementaryCourses: [
      `Entre os cursos que Andressa fez estão:
- Bootcamp Potência Tech iFood (2023): Fundamentos de programação.
- Bootcamp ElasTech (2024): Java, Spring Boot e MySQL.
- Java Backend (Ada Tech, 2024): Git, POO, design patterns e estrutura de dados.
- Fundamentos de Testes de Software (2024): Testes unitários e integração.
- Inglês (EF Education First, em andamento): Aperfeiçoamento do idioma.
Esses cursos complementam seu conhecimento técnico e de negócios. 📚🚀`,
    ],
  };

  if (normalizedQuery.includes('projetos') || normalizedQuery.includes('portfólio')) {
    return responses.projects[0];
  }

  if (
    normalizedQuery.includes('experiência profissional') ||
    normalizedQuery.includes('trabalhos anteriores') ||
    normalizedQuery.includes('empresas que trabalhou') ||
    normalizedQuery.includes('experiência em empresa')
  ) {
    return responses.experience[0];
  }

  if (normalizedQuery.includes('linguagens de programação') || normalizedQuery.includes('linguagens') || normalizedQuery.includes('programação')) {
    return responses.languages[Math.floor(Math.random() * responses.languages.length)];
  }

  if (normalizedQuery.includes('soft skills') || normalizedQuery.includes('habilidades interpessoais')) {
    return responses.softSkills[Math.floor(Math.random() * responses.softSkills.length)];
  }

  if (
    normalizedQuery.includes('hard skills') ||
    normalizedQuery.includes('habilidades técnicas') ||
    normalizedQuery.includes('frameworks') ||
    normalizedQuery.includes('ferramentas') ||
    normalizedQuery.includes('tecnologias')
  ) {
    return responses.hardSkills[Math.floor(Math.random() * responses.hardSkills.length)];
  }

  if (normalizedQuery.includes('formação') || normalizedQuery.includes('educação') || normalizedQuery.includes('graduação')) {
    return responses.education[Math.floor(Math.random() * responses.education.length)];
  }

  if (normalizedQuery.includes('cursos complementares') || normalizedQuery.includes('cursos realizados') || normalizedQuery.includes('formação complementar')) {
    return responses.complementaryCourses[Math.floor(Math.random() * responses.complementaryCourses.length)];
  }

  if (normalizedQuery.includes('contato') || normalizedQuery.includes('e-mail') || normalizedQuery.includes('celular') || normalizedQuery.includes('localização')) {
    return responses.contact[Math.floor(Math.random() * responses.contact.length)];
  }

  if (normalizedQuery.includes('objetivo') || normalizedQuery.includes('meta profissional')) {
    return responses.goal[Math.floor(Math.random() * responses.goal.length)];
  }

  return `
Desculpe, não consegui encontrar uma resposta para sua pergunta. Aqui estão alguns tópicos sobre os quais você pode perguntar:
- Projetos realizados
- Experiência profissional
- Habilidades técnicas e comportamentais
- Formação acadêmica
- Cursos complementares
- Contato da Andressa,

É só perguntar! 😊
`;
}

// Handler principal
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Apenas requisições POST são permitidas.' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Mensagem não fornecida.' });
  }

  console.log('Mensagem recebida:', message);

  await loadCurriculumData();

  const thanksOrGoodbyeResponse = handleThanksAndGoodbyes(message);
  if (thanksOrGoodbyeResponse) {
    return res.status(200).json({ reply: thanksOrGoodbyeResponse });
  }

  const greetingResponse = handleGreetings(message);
  if (greetingResponse) {
    return res.status(200).json({ reply: greetingResponse });
  }

  const programmedResponse = searchCurriculum(message);
  if (programmedResponse) {
    return res.status(200).json({ reply: programmedResponse });
  }

  const witAiResponse = await getWitAiResponse(message);
  return res.status(200).json({ reply: witAiResponse });
}
