import dotenv from 'dotenv';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // Expor a variável HUGGINGFACE_API_KEY para o código frontend
    HUGGINGFACE_API_KEY: process.env.HUGGINGFACE_API_KEY,
  },
};

export default nextConfig;
