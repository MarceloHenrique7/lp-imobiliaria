"use client";
import { useState, useEffect } from "react";
import { House, Menu } from "lucide-react";

// Corrija os ids para baterem com seus sections!
const NAV_SECTIONS = [
  { id: "hero", label: "Início" },
  { id: "imoveis", label: "Catálogo" },
  { id: "consulting", label: "Consultoria" },
  { id: "contact", label: "Contato", isButton: true },
];

function scrollToSection(id: string) {
  if (typeof window !== "undefined") {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
}

// Após o .filter(Boolean), garanta para o TS que não tem null


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");

  // CORREÇÃO DA SEÇÃO ATIVA
    useEffect(() => {

      

      function onScroll() {
      const sections = NAV_SECTIONS.map(sec => {
        const el = document.getElementById(sec.id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return { id: sec.id, top: rect.top };
      }).filter(Boolean) as { id: string; top: number }[];


        let current = "hero";
        let minDist = Infinity;
        for (const sec of sections) {
          if (sec.top <= window.innerHeight * 0.4 && Math.abs(sec.top) < minDist) {
            current = sec.id;
            minDist = Math.abs(sec.top);
          }
        }
        setActive(current);
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }, []);


  function handleNav(id: string) {
    scrollToSection(id);
    setOpen(false);
  }

  return (
    <nav className="w-full bg-white/95 backdrop-blur-lg fixed top-0 left-0 z-40 shadow-sm border-b border-[#EFE8D8]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <a
          href="#hero"
          role="button"
          className="flex items-center gap-3 select-none cursor-pointer"
          onClick={() => handleNav("hero")}
        >
          <House size={32} className="text-[#A68F61] drop-shadow" />
          <span className="flex flex-col leading-tight">
            <span className="font-playfair text-xl md:text-2xl font-extrabold tracking-tight text-[#a68f61] drop-shadow">
              Maison Prime
            </span>
            <span className="text-xs font-light tracking-widest text-[#C8B894] font-inter mt-[-3px]">
              Imóveis
            </span>
          </span>
        </a>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-9 font-inter text-base font-medium text-[#786A4D] items-center">
          {NAV_SECTIONS.map(({ id, label, isButton }) =>
            isButton ? (
              <li key={id}>
                <button
                  onClick={() => handleNav(id)}
                  className={`bg-[#A68F61] hover:bg-[#8C794E] text-white rounded-full px-6 py-2 font-semibold shadow transition focus:outline-none focus:ring-2 focus:ring-[#C8B894] ${
                    active === id ? "ring-2 ring-[#A68F61] scale-105" : ""
                  }`}
                >
                  {label}
                </button>
              </li>
            ) : (
              <li key={id}>
                <button
                  onClick={() => handleNav(id)}
                  className={`group transition relative py-1 px-1 ${
                    active === id ? "text-[#A68F61] font-bold" : "hover:text-[#A68F61]"
                  }`}
                >
                  <span>{label}</span>
                  {/* linha animada sob o item ativo */}
                  <span
                    className={`block h-[2px] rounded bg-[#A68F61] mt-1 transition-all duration-300 ${
                      active === id ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </button>
              </li>
            )
          )}
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center p-2"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
        >
          <Menu size={30} className="text-[#a68f61]" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden flex flex-col gap-7 px-6 pb-6 bg-white/98 border-t border-[#EFE8D8] shadow animate-fade-in-down text-lg font-semibold text-[#786A4D]">
          {NAV_SECTIONS.map(({ id, label, isButton }) =>
            isButton ? (
              <li key={id}>
                <button
                  onClick={() => handleNav(id)}
                  className="bg-[#A68F61] text-white rounded-full px-5 py-2 shadow w-full"
                >
                  {label}
                </button>
              </li>
            ) : (
              <li key={id}>
                <button
                  onClick={() => handleNav(id)}
                  className="w-full text-left py-2"
                  style={{
                    color: active === id ? "#A68F61" : "#786A4D",
                    fontWeight: active === id ? 700 : 500,
                  }}
                >
                  {label}
                </button>
              </li>
            )
          )}
        </ul>
      )}

      {/* Animations/Fonts */}
      <style jsx>{`
        .font-playfair {
          font-family: 'Playfair Display', serif;
        }
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.22s;
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </nav>
  );
}
