"use client"; // <- Adicione isso na PRIMEIRA linha!

import Image from "next/image";
import { MapPin, Mail, Phone, ArrowUp, Instagram, Facebook, Home, KeyRound, UserRound, Star, Plus, House } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f7f5ef] border-t border-[#EFE8D8] pt-12 pb-7 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 justify-between items-start">
        {/* Logo e Info */}
        <div className="flex-1 flex flex-col gap-5">
                <a href="#" className="flex items-center gap-3 select-none">
                <House size={32} className="text-[#A68F61]" />
                <span className="flex flex-col leading-tight">
                    <span className="font-playfair text-xl md:text-2xl font-extrabold tracking-tight text-[#a68f61]">
                    Maison Prime
                    </span>
                    <span className="text-xs font-light tracking-widest text-[#C8B894] font-inter mt-[-3px]">
                    Imóveis
                    </span>
                </span>
                </a>
          <div className="flex items-center gap-2 text-[#A68F61]">
            <MapPin className="w-4 h-4" />
            <span>Av. Principal, 1234 - Petrolina, PE</span>
          </div>
          <div className="flex items-center gap-2 text-[#A68F61]">
            <Phone className="w-4 h-4" />
            <span>(87) 98888-8888</span>
          </div>
          <div className="flex items-center gap-2 text-[#A68F61]">
            <Mail className="w-4 h-4" />
            <span>contato@maisonprime.com.br</span>
          </div>
          <div className="flex gap-3 mt-2">
            <a href="#" target="_blank" rel="noopener" aria-label="Instagram" className="p-2 bg-[#E5DED3] rounded-full hover:bg-[#a68f61]/20 transition">
              <Instagram className="w-5 h-5 text-[#A68F61]" />
            </a>
            <a href="#" target="_blank" rel="noopener" aria-label="Facebook" className="p-2 bg-[#E5DED3] rounded-full hover:bg-[#a68f61]/20 transition">
              <Facebook className="w-5 h-5 text-[#A68F61]" />
            </a>
          </div>
        </div>

        {/* Links do site */}
        <div className="flex-1 flex flex-col sm:flex-row gap-10 justify-between text-[#786A4D]">
          <div>
            <div className="font-semibold mb-2 text-[#a68f61]">Site</div>
            <ul className="flex flex-col gap-2 text-sm">
              <li className="flex items-center gap-1"><Home size={14} /> Comprar</li>
              <li className="flex items-center gap-1"><KeyRound size={14} /> Alugar</li>
              <li className="flex items-center gap-1"><Star size={14} /> Favoritos</li>
              <li className="flex items-center gap-1"><Plus size={14} /> Cadastrar imóvel</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2 text-[#a68f61]">Institucional</div>
            <ul className="flex flex-col gap-2 text-sm">
              <li className="flex items-center gap-1"><UserRound size={14} /> Sobre</li>
              <li className="flex items-center gap-1"><Mail size={14} /> Contato</li>
            </ul>
          </div>
        </div>

        {/* Mapa (pode trocar o iframe pelo embed do Google Maps) */}
        <div className="flex-1 flex flex-col items-center gap-3">
          <div className="rounded-2xl overflow-hidden w-full max-w-xs h-48 border border-[#EFE8D8] shadow-sm">
            <iframe
              title="Mapa"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-40.5107,-9.3887,-40.4950,-9.3800&layer=mapnik"
              className="w-full h-full"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Rodapé final */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mt-10 pt-6 border-t border-[#EFE8D8] text-xs text-[#948D7D] gap-3">
        <div>
          Copyright © 2025 Maison Prime Imóveis. Todos os direitos reservados.
        </div>
        <div className="flex gap-2 items-center">
          <span>Desenvolvido por <a href="#" className="underline hover:text-[#A68F61]">Maison Prime Studio</a></span>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-1 text-[#a68f61] hover:text-[#786A4D] transition"
        >
          <ArrowUp size={16} /> <span className="hidden sm:inline">Voltar ao topo</span>
        </button>
      </div>
    </footer>
  );
}
