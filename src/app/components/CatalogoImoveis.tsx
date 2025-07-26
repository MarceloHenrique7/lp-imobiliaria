"use client";
import { useEffect, useState } from "react";
import { Bed, Bath, Car, BadgePercent } from "lucide-react";
import Image from "next/image";

type Imovel = {
  id: number;
  imagem: string;
  titulo: string;
  local: string;
  quartos: number;
  banheiros: number;
  vagas: number;
  codigo: number;
  preco: string;
  desc?: string;
};

const PROMO_LABELS = [
  "Oferta imperdível",
  "Promoção exclusiva",
  "Oportunidade",
  "Destaque da semana"
];

export default function CatalogoImoveis() {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);

  useEffect(() => {
    fetch("/db.json")
      .then(res => res.json())
      .then(data => setImoveis(data.imoveis?.slice(0, 4) || [])); // apenas 4 imóveis!
  }, []);

  function srcImagem(imagem: string | undefined) {
    return imagem && imagem.trim() !== "" ? imagem : "/sem-imagem.jpg";
  }

  return (
    <section id="imoveis" className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-[#786A4D] mb-8 text-center">
          Ofertas Imperdíveis
        </h2>
        <p className="text-[#a68f61] font-medium text-center mb-12 text-lg max-w-2xl mx-auto">
          Imóveis selecionados com descontos exclusivos para você aproveitar agora.<br />
          <span className="font-bold text-[#8C794E]">Garanta as melhores oportunidades do mercado imobiliário!</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {imoveis.map((item, idx) => (
            <div
              key={item.id}
              className="relative border-2 border-[#EFE8D8] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition group bg-[#F7F5EF]"
              style={{
                borderColor: idx === 0 ? "#A68F61" : "#EFE8D8",
                boxShadow: idx === 0 ? "0 8px 32px 0 #a68f6140" : undefined,
              }}
            >
              {/* Badge Promo */}
              <span className={`absolute left-0 top-0 z-10 flex items-center gap-2 rounded-tr-2xl rounded-bl-2xl px-4 py-2 text-xs font-bold tracking-wide shadow
                ${idx === 0
                  ? "bg-[#a68f61] text-white"
                  : "bg-[#e6d5b4] text-[#786A4D]"}
              `}
              >
                <BadgePercent size={16} className="inline -ml-1 mr-1" />
                {PROMO_LABELS[idx % PROMO_LABELS.length]}
              </span>
              <div className="w-full h-48 bg-[#EFE8D8] flex items-center justify-center overflow-hidden">
                <Image
                  src={srcImagem(item.imagem)}
                  alt={item.titulo}
                  width={380}
                  height={192}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  style={{ background: "#ece3d7" }}
                />
              </div>
              <div className="p-5 flex flex-col gap-2">
                <h3 className="text-lg font-bold text-[#a68f61] group-hover:text-[#8C794E] transition">{item.titulo}</h3>
                <p className="text-sm text-[#7A7A7A]">{item.local}</p>
                {item.desc && (
                  <p className="text-xs text-[#948D7D] mb-1">{item.desc}</p>
                )}
                <div className="flex items-center gap-4 mt-1 text-[#786A4D]">
                  <div className="flex items-center gap-1 text-xs font-medium">
                    <Bed size={15} /> {item.quartos}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium">
                    <Bath size={15} /> {item.banheiros}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium">
                    <Car size={15} /> {item.vagas}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-[#C8B894]">Cód: {item.codigo}</div>
                  <div className="text-lg font-bold text-[#A68F61] group-hover:text-[#8C794E] transition">{item.preco}</div>
                </div>
                <button
                  className="mt-3 w-full bg-[#A68F61] hover:bg-[#8C794E] text-white font-semibold py-2 rounded-full shadow transition"
                  style={{
                    letterSpacing: 1,
                    fontSize: 15,
                  }}
                  tabIndex={-1}
                >
                  Tenho interesse
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
