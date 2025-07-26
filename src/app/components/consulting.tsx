"use client";
import { useEffect, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Tipos para dados
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

type EstadoType = "Pernambuco" | "Bahia" | "Ceará" | "Paraíba" | "Alagoas";
const ESTADOS: EstadoType[] = ["Pernambuco", "Bahia", "Ceará", "Paraíba", "Alagoas"];
const CIDADES: Record<EstadoType, string[]> = {
  Pernambuco: ["Petrolina", "Recife", "Olinda"],
  Bahia: ["Juazeiro", "Salvador"],
  Ceará: ["Fortaleza"],
  Paraíba: ["João Pessoa"],
  Alagoas: ["Maceió"],
};

// Conversão de preço BR para número
function parsePreco(preco: string) {
  if (!preco) return 0;
  let val = preco.replace("R$", "").trim().replace(/\./g, "").replace(",", ".");
  return Math.round(Number(val));
}

// Imagem fallback
function srcImagem(imagem: string | undefined) {
  return imagem && imagem.trim() !== "" ? imagem : "/sem-imagem.jpg";
}

export default function Consulting() {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [busca, setBusca] = useState("");
  const [quartos, setQuartos] = useState("");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");
  const [ordenar, setOrdenar] = useState("padrao");
  const [loading, setLoading] = useState(true);
  const [mostrarTodos, setMostrarTodos] = useState(false);

  // Carregar imóveis do db.json
  useEffect(() => {
    setLoading(true);
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => setImoveis(data.imoveis || []))
      .finally(() => setLoading(false));
  }, []);

  // Filtro e ordenação
  const imoveisFiltrados = imoveis
    .filter((i) => !estado || i.estado === estado)
    .filter((i) => !cidade || i.cidade === cidade)
    .filter((i) => !quartos || i.quartos >= Number(quartos))
    .filter(
      (i) => {
        const precoNum = parsePreco(i.preco);
        const min = precoMin ? parsePreco(precoMin) : 0;
        const max = precoMax ? parsePreco(precoMax) : Infinity;
        return precoNum >= min && precoNum <= max;
      }
    )
    .filter(
      (i) =>
        !busca ||
        i.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        i.desc.toLowerCase().includes(busca.toLowerCase()) ||
        i.local.toLowerCase().includes(busca.toLowerCase())
    )
    .sort((a, b) => {
      if (ordenar === "menor-preco") return parsePreco(a.preco) - parsePreco(b.preco);
      if (ordenar === "maior-preco") return parsePreco(b.preco) - parsePreco(a.preco);
      if (ordenar === "mais-quartos") return b.quartos - a.quartos;
      return 0;
    });

  // Exibir 4 cards ou todos
  const imoveisParaExibir = mostrarTodos ? imoveisFiltrados : imoveisFiltrados.slice(0, 4);

  function limparFiltros() {
    setEstado("");
    setCidade("");
    setBusca("");
    setQuartos("");
    setPrecoMin("");
    setPrecoMax("");
    setOrdenar("padrao");
    setMostrarTodos(false);
  }

  return (
    <section
      id="consulting"
      className="w-full py-16 px-4 bg-[#F7F5EF] border-t border-[#E5DED3]"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#a68f61] text-center mb-2 tracking-tight">
          Consultoria Imobiliária Exclusiva
        </h2>
        <p className="text-[#7B7059] text-center max-w-2xl mx-auto mb-10">
          Encontre o imóvel perfeito filtrando por localização, faixa de preço, quartos e muito mais!
        </p>
        {/* Barra de filtros */}
        <form
          className="flex flex-col md:flex-row flex-wrap gap-4 justify-center items-center mb-8"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Estado */}
          <div className="relative">
            <select
              className="appearance-none bg-white border border-[#E5DED3] rounded-full py-2 px-5 pr-10 text-[#7B7059] font-semibold shadow focus:ring-2 focus:ring-[#a68f61]/30 outline-none transition"
              value={estado}
              onChange={e => { setEstado(e.target.value); setCidade(""); }}
            >
              <option value="">Estado</option>
              {ESTADOS.map(e => <option key={e}>{e}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a68f61] w-4 h-4 pointer-events-none" />
          </div>
          {/* Cidade */}
          <div className="relative">
            <select
              className="appearance-none bg-white border border-[#E5DED3] rounded-full py-2 px-5 pr-10 text-[#7B7059] font-semibold shadow focus:ring-2 focus:ring-[#a68f61]/30 outline-none transition"
              value={cidade}
              onChange={e => setCidade(e.target.value)}
              disabled={!estado}
            >
              <option value="">Cidade</option>
              {estado && CIDADES[estado as EstadoType]?.map(c => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a68f61] w-4 h-4 pointer-events-none" />
          </div>
          {/* Quartos */}
          <div className="relative">
            <select
              className="appearance-none bg-white border border-[#E5DED3] rounded-full py-2 px-5 pr-8 text-[#7B7059] font-semibold shadow focus:ring-2 focus:ring-[#a68f61]/30 outline-none transition"
              value={quartos}
              onChange={e => setQuartos(e.target.value)}
            >
              <option value="">Quartos</option>
              {[1, 2, 3, 4, 5].map(q => (
                <option key={q} value={q}>{q}+</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-[#a68f61] w-4 h-4 pointer-events-none" />
          </div>
          {/* Preço mínimo */}
          <input
            className="bg-white border border-[#E5DED3] rounded-full py-2 px-5 w-32 text-[#7B7059] font-semibold shadow focus:ring-2 focus:ring-[#a68f61]/30 outline-none transition"
            type="text"
            placeholder="Preço mín."
            value={precoMin}
            onChange={e => setPrecoMin(e.target.value)}
          />
          {/* Preço máximo */}
          <input
            className="bg-white border border-[#E5DED3] rounded-full py-2 px-5 w-32 text-[#7B7059] font-semibold shadow focus:ring-2 focus:ring-[#a68f61]/30 outline-none transition"
            type="text"
            placeholder="Preço máx."
            value={precoMax}
            onChange={e => setPrecoMax(e.target.value)}
          />
          {/* Busca livre */}
          <div className="relative w-full md:w-[200px]">
            <input
              className="bg-white border border-[#E5DED3] rounded-full py-2 px-9 pr-8 text-[#7B7059] font-semibold shadow focus:ring-2 focus:ring-[#a68f61]/30 outline-none transition w-full"
              type="text"
              placeholder="Buscar por palavra-chave"
              value={busca}
              onChange={e => setBusca(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a68f61] w-4 h-4 pointer-events-none" />
          </div>
          {/* Ordenar */}
          <div className="relative">
            <select
              className="appearance-none bg-white border border-[#E5DED3] rounded-full py-2 px-5 pr-9 text-[#a68f61] font-bold shadow focus:ring-2 focus:ring-[#a68f61]/30 outline-none transition"
              value={ordenar}
              onChange={e => setOrdenar(e.target.value)}
            >
              <option value="padrao">Ordenar</option>
              <option value="menor-preco">Menor preço</option>
              <option value="maior-preco">Maior preço</option>
              <option value="mais-quartos">Mais quartos</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a68f61] w-4 h-4 pointer-events-none" />
          </div>
          {/* Limpar filtros */}
          <button
            type="button"
            className="bg-[#eee6d7] hover:bg-[#a68f61]/20 text-[#a68f61] font-semibold rounded-full px-6 py-2 shadow transition ml-2"
            onClick={limparFiltros}
          >
            Limpar filtros
          </button>
        </form>

        {/* Cards de Imóveis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
          {loading ? (
            <div className="col-span-full text-[#a68f61] font-semibold text-center py-8 bg-white/80 rounded-2xl shadow">
              Carregando imóveis...
            </div>
          ) : imoveisFiltrados.length === 0 ? (
            <div className="col-span-full text-[#a68f61] font-semibold text-center py-8 bg-white/80 rounded-2xl shadow">
              Nenhum imóvel encontrado para os filtros selecionados.
            </div>
          ) : (
            imoveisParaExibir.map((imovel) => (
              <Link
                key={imovel.id}
                href={`/imovel/${imovel.id}`}
                className="relative bg-white rounded-2xl shadow-lg border border-[#E5DED3] p-7 flex flex-col gap-4 hover:shadow-xl transition hover:ring-2 hover:ring-[#a68f61]/30 outline-none focus:ring-2 focus:ring-[#a68f61]/60 cursor-pointer group"
              >
                {/* Badge Código */}
                <span className="absolute -top-4 right-5 px-4 py-1 rounded-full text-xs font-bold shadow-md bg-[#A68F61] text-white select-none z-10">
                  Cód: {imovel.codigo}
                </span>
                {/* Imagem do imóvel */}
                {srcImagem(imovel.imagem) && (
                  <div className="rounded-xl overflow-hidden mb-2 h-44 bg-[#F7F5EF] flex items-center justify-center">
                    <Image
                      src={srcImagem(imovel.imagem)}
                      alt={imovel.titulo}
                      width={380}
                      height={180}
                      className="object-cover w-full h-full group-hover:scale-[1.04] transition"
                      style={{ background: "#ece3d7" }}
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold text-[#a68f61] mb-1">{imovel.titulo}</h3>
                <div className="text-[#7B7059] text-sm mb-1">{imovel.cidade} • {imovel.estado}</div>
                <p className="text-[#786A4D] mb-2">{imovel.desc}</p>
                <ul className="flex flex-wrap gap-4 mb-1 text-[#a68f61] font-bold">
                  <li>Quartos: {imovel.quartos}</li>
                  <li>Banheiros: {imovel.banheiros}</li>
                  <li>Vagas: {imovel.vagas}</li>
                </ul>
                <div className="text-lg font-bold text-[#A68F61]">{imovel.preco}</div>
                <span className="mt-2 self-start bg-[#a68f61] hover:bg-[#8C794E] text-white font-bold rounded-full px-7 py-2 text-sm shadow transition">
                  Consultar imóvel
                </span>
              </Link>
            ))
          )}
        </div>
        {/* Botão "Ver mais imóveis" */}
        {!mostrarTodos && imoveisFiltrados.length > 4 && (
          <div className="mt-8 flex justify-center">
            <button
              className="bg-[#a68f61] hover:bg-[#8C794E] text-white font-semibold rounded-full px-7 py-3 shadow transition"
              onClick={() => setMostrarTodos(true)}
            >
              Ver mais imóveis
            </button>
          </div>
        )}
        {/* Botão "Ver menos" se necessário */}
        {mostrarTodos && imoveisFiltrados.length > 4 && (
          <div className="mt-5 flex justify-center">
            <button
              className="bg-[#eee6d7] hover:bg-[#a68f61]/20 text-[#a68f61] font-semibold rounded-full px-7 py-2 shadow transition"
              onClick={() => setMostrarTodos(false)}
            >
              Ver menos imóveis
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
