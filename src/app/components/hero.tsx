"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Home } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [busca, setBusca] = useState("");
  const router = useRouter();

  // Corrigido: tipos explicitados no parâmetro
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Faz busca no db.json
    if (!busca.trim()) return;

    try {
      const res = await fetch("/db.json");
      const data = await res.json();
      const input = busca.trim().toLowerCase();

      // Busca por código exato (apenas números)
      const imovelPorCodigo = data.imoveis.find(
        (item: { codigo: string | number, id: string | number }) =>
          String(item.codigo) === input || String(item.id) === input
      );

      if (imovelPorCodigo) {
        router.push(`/imovel/${imovelPorCodigo.id}`);
        return;
      }

      // Busca por cidade, bairro ou local (retorna o primeiro resultado)
      const imovelPorTermo = data.imoveis.find(
        (item: { cidade: string, local: string, titulo: string, id: string | number }) =>
          item.cidade.toLowerCase().includes(input) ||
          item.local.toLowerCase().includes(input) ||
          item.titulo.toLowerCase().includes(input)
      );

      if (imovelPorTermo) {
        router.push(`/imovel/${imovelPorTermo.id}`);
        return;
      }

      alert("Imóvel não encontrado!");
    } catch {
      alert("Erro ao buscar imóvel.");
    }
  }

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center min-h-[82vh] md:min-h-[88vh] bg-[#F7F5EF] overflow-hidden"
    >
      {/* Imagem de fundo */}
      <Image
        src="/hero-img-1.jpg"
        alt="Fachada sofisticada de imóvel"
        fill
        priority
        className="object-cover object-center w-full h-full absolute top-0 left-0 z-0"
        style={{ filter: "brightness(0.75) blur(0.5px)" }}
      />
      {/* Overlay escuro azulado com degradê */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#243147cc] via-[#2c2c1a40] to-transparent z-10" />

      {/* Conteúdo principal */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-5 flex flex-col items-center text-center">
        {/* Headline e slogan */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-playfair text-[2.1rem] md:text-5xl font-extrabold text-white tracking-tight mb-2 drop-shadow-xl"
        >
          Viver bem é morar bem
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.14 }}
          className="text-white/90 font-inter text-lg md:text-2xl mb-7 mt-2 max-w-2xl mx-auto font-medium tracking-wide drop-shadow-md"
        >
          Encontre imóveis exclusivos, atendimento premium<br />
          e toda segurança para seu próximo investimento.
        </motion.p>

        {/* Barra de busca */}
        <motion.form
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="w-full flex flex-col md:flex-row gap-3 md:gap-5 bg-white/90 border border-[#E5DED3] rounded-2xl shadow-lg px-4 py-4 md:py-3 items-center justify-center max-w-3xl mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-2 bg-[#f7f5ef] rounded-xl px-3 py-2 w-full md:w-[160px] border border-transparent focus-within:border-[#a68f61]">
            <Home size={18} className="text-[#a68f61]" />
            <select className="bg-transparent w-full outline-none text-[#685f44] font-medium" disabled>
              <option value="">Comprar</option>
              <option value="">Alugar</option>
            </select>
          </div>
          <input
            className="w-full md:flex-1 px-4 py-2 bg-transparent outline-none text-[#2d2a1b] placeholder:text-[#a8a089] font-normal rounded-xl border border-transparent focus:border-[#a68f61] transition"
            placeholder="Buscar cidade, bairro, condomínio ou código"
            value={busca}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBusca(e.target.value)}
          />
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#a68f61] hover:bg-[#8C794E] text-white font-bold rounded-xl px-5 py-2 text-base shadow-md transition-all"
          >
            <Search size={20} /> Buscar
          </button>
        </motion.form>
      </div>
    </section>
  );
}
