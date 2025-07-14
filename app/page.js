"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import ProjectSection from "../components/📄 components/ProjectSection.jsx";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Olá! Sou a Laura, como posso ajudar você a saber mais sobre a Andressa e seu currículo?😊',
    },
  ]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const submitForm = async (e) => {
    e.preventDefault();
    if (!messageInput.trim()) {
      console.error('Mensagem vazia. Por favor, insira uma mensagem.');
      return;
    }

    const newMessages = [...messages, { role: 'user', content: messageInput }];
    setMessages(newMessages);
    setMessageInput('');

    try {
      const apiResponse = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageInput }),
      });

      const data = await apiResponse.json();
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
            <li><a href="#sobre">Home</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projetos">Projetos</a></li>
             <li><a href="#chatbot">Chatbot</a></li>
            <li>
              <a href="mailto:andressa.rodrigues.2172@gmail.com" className="button" target="blanck" rel="noopener noreferrer">
                Contato
              </a>
            </li>
          </ul>

          <a href="#" className="mobile-toggle" onClick={toggleMobileMenu}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
            </svg>
          </a>

          <button onClick={() => setDarkMode(!darkMode)} className="button white" style={{ marginLeft: '1rem' }}>
            {darkMode ? ' ☀️' : ' 🌙'}
          </button>
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
                <a href="https://wa.me/5561981227461" className="button white" target="_blank">
                    Fale comigo
                </a>
              </div>
              <div className="social-links">
                <a href="https://github.com/andressarodriguesdev" target="blanck">
                  <img 
                    src={darkMode ? "./imgs/github-amarelo.png" : "./imgs/github.png"} 
                    alt="Github" 
                    width="48" 
                  />
                </a>
                <a href="https://www.linkedin.com/in/andressa-macedo-rodrigues/" target="blanck">
                  <img 
                    src={darkMode ? "./imgs/linkedin-amarelo.png" : "./imgs/linkedin.png"} 
                    alt="Linkedin" 
                    width="48" 
                  />
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
                <img src="./imgs/spring-logo.png" width="128" alt="spring" />
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
                <img src="./imgs/spring-logo.png" width="128" alt="spring" />
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
              <li>Python</li>
              <li>Spring Framework</li>
              <li>SQL</li>
              <li>Thymeleaf</li>
              <li> Node.js</li>
              <li> MySQL</li>
              <li>PostgreSQL</li>
              <li> JUnit</li> 
              <li>Git/GitHub</li>
              <li>Docker</li>
             </ul>
              <h3>Frontend</h3>
              <ul>
                <li>React</li>
                <li>Tailwind CSS</li>
                <li>JavaScript</li>
                <li>Vue.js</li>
                <li>XML (Layouts Android)</li>
                <li>HTML / CSS</li>
              </ul>             
            </div>
            <div className="right-column">
              <h3>Fã de códigos, café e desafios 🚀</h3>
              <p> 
                  Sou desenvolvedora de software em constante evolução, com vivência prática em projetos full stack e mobile. Já participei de soluções como o AdminStay, ChamaElas, Capivara System e um app Android com interface em XML. Atuei também como estagiária de banco de dados . Tenho experiência com Java, Spring Boot, React, Node.js, Docker e bancos relacionais. Busco desafios onde eu possa crescer, colaborar e criar soluções com impacto.
              </p>
             
            </div>
          </div>
        </section>

     <ProjectSection />

        <section id = "chatbot"className="chatbot container">
          <h2>
            <small>Fale comigo</small>
            Chatbot
          </h2>
          <div className="chatbot-blue">
            <div className="chat-info">
              <h3>Laura - Chatbot</h3>
              <p>Eu montei um chatbot  aqui que conhece todas as minhas habilidades, experiências  e tem uma cópia do meu CV/Resume. Você pode usá-lo para fazer perguntas sobre mim para ter uma ideia melhor de quem eu sou e o que eu fiz.</p>
              <p>Você também pode baixar meu currículo aqui se quiser dar uma olhada. Atualmente, estou procurando novas oportunidades, então, se você tem um projeto que acha que eu sou uma boa opção, entre em contato!</p>
              <a href="/Andressa_Rodrigues.pdf" className="button white" target="blanck" >
                    Baixar curriculum</a>
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