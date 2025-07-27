"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Bed, Bath, Car } from "lucide-react";
import Image from "next/image";

// Defina o tipo Imovel
type Imovel = {
  id: number;
  imagem: string;
  titulo: string;
  desc: string;
  local: string;
  estado: string;
  cidade: string;
  quartos: number;
  banheiros: number;
  vagas: number;
  codigo: number;
  preco: string;
};

export default function PaginaImovel() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [imovel, setImovel] = useState<Imovel | null>(null);

  useEffect(() => {
    fetch("/db.json")
      .then(res => res.json())
      .then(data => {
        const achou = data.imoveis.find((i: Imovel) => String(i.id) === String(params.id));
        setImovel(achou ?? null);
      });
  }, [params.id]);

  if (!imovel) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white">
        <span className="text-lg text-[#a68f61] font-bold">Carregando imóvel...</span>
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f7f3] pt-0">
      {/* Banner da imagem do imóvel */}
      <section className="w-full h-[50vh] md:h-[70vh] relative">
        <Image
          src={imovel.imagem || "/sem-imagem.jpg"}
          alt={imovel.titulo}
          fill
          priority
          className="object-cover object-center w-full h-full"
          style={{ filter: "brightness(0.88)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f7f5efcc] via-[#f7f5ef40] to-transparent z-10" />
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-center">
          <span className="bg-[#a68f61]/90 px-5 py-2 rounded-full text-xs md:text-sm font-bold text-white shadow-lg uppercase tracking-wider">
            Código: {imovel.codigo}
          </span>
          <h1 className="font-playfair mt-4 text-white text-2xl md:text-4xl font-extrabold drop-shadow-lg">
            {imovel.titulo}
          </h1>
        </div>
      </section>

      {/* Detalhes do imóvel */}
      <section className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl -mt-16 mb-16 p-8 md:p-12 flex flex-col md:flex-row gap-10 items-start relative z-30">
        <div className="flex-1 flex flex-col items-center md:items-start">
          <Image
            src={imovel.imagem || "/sem-imagem.jpg"}
            alt={imovel.titulo}
            width={540}
            height={350}
            className="rounded-2xl object-cover border border-[#efe8d8] shadow"
            style={{ maxHeight: 350 }}
          />
        </div>
        <div className="flex-1 flex flex-col gap-5 md:pl-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-[#685f44] mb-2">{imovel.titulo}</h2>
            <p className="text-[#786a4d] text-base mb-3">{imovel.desc}</p>
          </div>
          <div className="flex gap-7 text-[#A68F61] font-semibold text-lg">
            <div className="flex items-center gap-1"><Bed size={22} />{imovel.quartos} Quartos</div>
            <div className="flex items-center gap-1"><Bath size={22} />{imovel.banheiros} Banheiros</div>
            <div className="flex items-center gap-1"><Car size={22} />{imovel.vagas} Vagas</div>
          </div>
          <div className="mt-3 text-[#8c794e] font-medium">{imovel.local}</div>
          <div className="text-[#a68f61] text-xl md:text-2xl font-extrabold mt-3">{imovel.preco}</div>
          <div className="mt-7 flex gap-4">
            <a
              href="#contato"
              className="bg-[#a68f61] hover:bg-[#8c794e] text-white font-bold rounded-full px-7 py-3 text-base shadow transition"
            >
              Quero saber mais
            </a>
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-white border border-[#a68f61] text-[#a68f61] font-semibold rounded-full px-6 py-3 shadow hover:bg-[#eee6d7] transition"
            >
              Voltar
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
