"use client";
import Image from "next/image";
import Link from "next/link";

/**
 * 👉 COMO USAR (versão JavaScript puro)
 * 1. Coloque este arquivo em `components/ProjectSection.jsx`.
 * 2. Importe no seu `Home` (ou página onde quer mostrar):
 *      import ProjectSection from "../components/ProjectSection";
 * 3. Atualize o array `projects` com seus próprios projetos.
 * 4. Garanta que as imagens estejam na pasta `public/imgs/` (ou ajuste os paths).
 */

// Array simples com seus projetos – edite à vontade
const projects = [
  {
    title: "Admin Stay",
    description: "Sistema de reservas e dashboard para hotéis/pousadas.",
    techs: ["React", "Tailwind", "Spring Boot", "PostgreSQL"],
    image: "/imgs/bento-2.png",
    githubUrl: "https://github.com/andressarodriguesdev/Admin_Stay.git",
    liveUrl: "https://admin-stay-front.vercel.app/",
    category: "Fullstack",
  },
  {
    title: "Capivara Management",
    description: "Capivara Management System é um software desenvolvido para ajudar na catalogação de capivaras em zoológicos, substituindo o registro manual e facilitando a organização de informações como idade, peso, estado de saúde, e foto via URL.",
    techs: ["Spring Boot", "React", "MySQL", "Docker"],
    image:"/imgs/bento-1 (3).png",
    githubUrl: "https://github.com/andressarodrigues2172dev/capivara-management",
    category: "Fullstack",
  },
  {
    title: "Chama Elas",
    description: "Api de gerenciamento de chamados técnicos.",
    techs: ["Vue.js", "Node.js", "PostgreSQL"],
    image: "/imgs/bento-3.png",
    githubUrl: "https://github.com/andressarodriguesdev/chamaelas.git",
    category: "Frontend",
  },
  {
  title: "Frases Abençoadas",
  description: "Um aplicativo Android simples desenvolvido em Kotlin, que exibe frases abençoadas de forma aleatória para inspirar seu dia! ☀️",
  techs: ["Kotlin", "Android Studio", "UI XML"],
  image: "/imgs/bento-4.png",
  githubUrl: "https://github.com/andressarodriguesdev/FrasesAbencoadas.git",
  liveUrl: "", // Pode deixar vazio se não tiver link de deploy
  category: "Mobile",
},

];

function ProjectCard({ project }) {
  return (
    <div className="project-card relative overflow-hidden rounded-2xl bg-white shadow-lg transition-transform duration-300 hover:scale-105">
      <Image
        src={project.image}
        alt={project.title}
        width={800}
        height={600}
        className="h-56 w-full object-cover"
      />
      <div className="p-5">
        <span className="mb-2 inline-block rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
          {project.category}
        </span>
        <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
        <p className="mb-4 text-sm text-gray-600">{project.description}</p>

        {/* Tech badges */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.techs.map((tech) => (
            <span
              key={tech}
              className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Link href={project.githubUrl} target="_blank" className="button black text-sm">
            GitHub
          </Link>
          {project.liveUrl && (
            <Link href={project.liveUrl} target="_blank" className="button white text-sm">
              Live
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectSection() {
  return (
    <section id="projetos" className="container py-16">
          <h2>
            <small>Em destaque</small>
            Projetos
          </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 max-w-6xl mx-auto">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
