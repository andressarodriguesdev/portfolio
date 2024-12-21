"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Olá! Sou a Laura, como posso ajudar você a saber mais sobre a Andressa e seu currículo?😊',
    },
  ]);

  const submitForm = async (e) => {
    e.preventDefault();
  
    // Verifique se a mensagem não está vazia antes de enviar
    if (!messageInput.trim()) {
      console.error('Mensagem vazia. Por favor, insira uma mensagem.');
      return;
    }
  
    const newMessages = [...messages, { role: 'user', content: messageInput }];
    setMessages(newMessages);
    setMessageInput(''); // Limpa o campo de entrada
  
    try {
      console.log('Enviando mensagem:', messageInput); // Verifique a mensagem que está sendo enviada
  
      const apiResponse = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageInput }),  // Envia a mensagem para o backend
      });
  
      const data = await apiResponse.json();
      console.log('Resposta da API:', data); // Verifique a resposta recebida da API
  
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setMessages([...newMessages, { role: 'assistant', content: 'Desculpe, ocorreu um erro.' }]);
    }
  };
  
  

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header>
        <a href="#" className="logo-holder">
          <div className="logo">AR</div>
          <div className="logo-text">Andressa Rodrigues</div>
        </a>
        <nav>
          <ul id="menu" className={menuOpen ? "active" : ""}>
            <li>
              <a href="#sobre">Home</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#projetos">Projetos</a>
            </li>
            <li>
              <a href="https://wa.me/5561912345678" className="button" target="blanck"  rel="noopener noreferrer">
              Contato</a>
            </li>
          </ul>

          <a href="#" 
            className="mobile-toggle"
            onClick={toggleMobileMenu}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
            </svg>
          </a>
        </nav>
      </header>

      <main>
        <section id="sobre" className="hero container">
          <div className="hero-blue">
            <div>
              <h1><small>Olá ! Eu sou </small>
                Andressa Rodrigues
              </h1>
              Desenvolvedora Backend.
              <p>
                <span>Sou fascinada por Inteligência Artificial e, como parte dessa jornada, desenvolvi um chatbot nesse portfólio. </span>
              </p>
              <div className="call-to-action">
                <a href="/Andressa_Rodrigues.pdf" className="button black" target="blanck" >
                    Curriculo
                </a>
                <a href="mailto:andressa.rodrigues.2172@gmail.com" className="button white" target="_blank">
                    Fale comigo
                </a>
              </div>
              <div className="social-links">
                <a href="https://github.com/andressarodrigues2172dev" target="blanck">
                    <img src="./imgs/github.png" alt="Github" width="48" />
                </a>
                <a href="https://www.linkedin.com/in/andressa-macedo-rodrigues/" target="blanck">
                    <img src="./imgs/linkedin.png" alt="Linkedin" width="48"/>
                </a>
              </div>
            </div>
          </div>
          <div className="hero-yellow">
            <img src="./imgs/hero-image2.png" alt="Andressa Rodrigues" width="100%"/>
          </div>
        </section>

        <section className="logos container ">
          <div className="marquee">
            <div className="track">
                <img src="./imgs/html.png" alt="HTML" width="128" />
                <img src="./imgs/JAVA.png" alt="JAVA" width="128" />
                <img src="./imgs/css.png" alt="CSS" width="128" />
                <img src="./imgs/javascript.png" alt="JS" width="128" />
                <img src="./imgs/Git.png" width="128" alt="Git" />
                <img src="./imgs/nextjs.png" width="128" alt="Next JS" />
                <img src="./imgs/vscode.png" width="128" alt="VS Code" />
                <img src="./imgs/python.png" width="128" alt="Python" />
                <img src="./imgs/postgresql.png" width="128" alt="Postgresql" />
                <img src="./imgs/intellij.png" width="128" alt="Intellij" />
                {/* Repetição dos ícones */}
                <img src="./imgs/html.png" alt="HTML" width="128" />
                <img src="./imgs/css.png" alt="CSS" width="128" />
                <img src="./imgs/javascript.png" alt="JS" width="128" />
                <img src="./imgs/Git.png" width="128" alt="Git" />
                <img src="./imgs/nextjs.png" width="128" alt="Next JS" />
                <img src="./imgs/JAVA.png" width="128" alt="JAVA" />
                <img src="./imgs/vscode.png" width="128" alt="VS Code" />
                <img src="./imgs/python.png" width="128" alt="Python" />
                <img src="./imgs/postgresql.png" width="128" alt="Postgresql" />
                <img src="./imgs/intellij" width="128" alt="Intellij" />
            </div>
          </div>
        </section>

        <section id="skills" className="skills container">
          <h2>
            <small>Sobre mim</small>
            Skills
          </h2>
          <div className="holder-blue">
            <div className="left-column">
              
              <h3>Backend</h3>
              <ul>
                <li>Java</li>
                <li>Node.Js</li>
                <li>SQL</li>
                <li>MySQL</li>
                <li>Spring Boot</li>
                <li>Postman</li>
                <li>Swagger</li>
                
              </ul>
              <h3>Frontend</h3>
              <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>Vue.JS</li>
              </ul>             
            </div>
            <div className="right-column">
              <h3>Fã de códigos, café e desafios 🚀</h3>
              <p> 
                  Desenvolvedora back-end,com foco em Java e Spring Boot. 
                  Tenho experiência no desenvolvimento de APIs RESTful, integração com bancos de dados como MySQL e PostgreSQL,
                  e uso de Git para versionamento.
              </p>
              <p> Participei de projetos como a ChamaElas e a Eclipse Hotel API, 
                  onde apliquei minhas habilidades em ambientes reais. 
                  Estou em busca de oportunidades para expandir meus
                  conhecimentos e contribuir com soluções inovadoras.
              </p>
            </div>
          </div>
        </section>

        <section id="projetos" className="bento container">
          <h2>
            <small>Prévia</small>
            Projetos
          </h2>
          <div className="bento-grid">
            <a href="https://github.com/andressarodrigues2172dev/capivara-management.git" className="bento-item" target="blanck">
              <img src="./imgs/bento-1 (3).png" alt="BGCCI" width="100%" />
            </a>
            <a href="https://github.com/andressarodrigues2172dev/HotelEclipse.git" className="bento-item">
              <img src="./imgs/bento-4.png" alt="BGCCI" width="100%" />
            </a>
            <a href="#" className="bento-item">
              <img src="./imgs/bento-2.png" alt="BGCCI" width="100%" />
            </a>
            <a href="https://github.com/andressarodrigues2172dev/chama-elas.git" className="bento-item">
              <img src="./imgs/bento-3.png" alt="BGCCI" width="100%" />
            </a>
            
          </div>
        </section>

        <section className="chatbot container">
          <h2>
            <small>Fale comigo</small>
            Chatbot
          </h2>
          <div className="chatbot-blue">
            <div className="chat-info">
              <h3>Laura - Chatbot</h3>
              <p>Eu montei um chatbot  aqui que conhece todas as minhas habilidades, experiências  e tem uma cópia do meu CV/Resume. Você pode usá-lo para fazer perguntas sobre mim para ter uma ideia melhor de quem eu sou e o que eu fiz.</p>
              <p>Você também pode baixar meu currículo aqui se quiser dar uma olhada. Atualmente, estou procurando novas oportunidades, então, se você tem um projeto que acha que eu sou uma boa opção, entre em contato!</p>
              <a href="/Andressa_Rodrigues.pdf" className="button black" target="blanck">Download Curriculo</a>
            </div>
            <div className="chat-box">
              <div className="scroll-area">
              <ul id="chat-log">
                     {messages.map((message, index) => (
                      <li key={index}>
                        <span 
                           className={`avatar ${message.role}`} 
                              style={{
                                  backgroundColor: message.role === 'user' ? 'var(--blue-400)' : 'transparent',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '64px',
                                  height: '64px',
                                  borderRadius: '50%',
                                  overflow: 'hidden' // Isso garante que a imagem respeite o círculo
                                }}
                              >
                                {message.role === 'user' ? (
                                  'User'
                                ) : (
                                  <img 
                                    src="imgs/avatar.png" 
                                    alt="Avatar AI" 
                                    style={{
                                      width: '100%', 
                                      height: '100%',
                                      objectFit: 'cover'
                                    }}
                                  />
                                )}
                              </span>
                    <div className="message">
                      {message.content.split('\n').map((line, lineIndex) => (
                        <p key={lineIndex} style={{ margin: '4px 0' }}>{line}</p>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
                 </div>
              <div className="chat-message">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Digite sua pergunta sobre o currículo"
                />
                <button onClick={submitForm} className="button black">
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}