"use client";
import { Home, BadgeCheck, CalendarCheck, ShieldCheck, Building2 } from "lucide-react";

export default function Vantagens() {
  return (
    <section id="vantagens" className="bg-[#f7f5ef] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center font-playfair text-3xl md:text-4xl font-extrabold text-[#a68f61] mb-14">
          Vantagens da <span className="text-[#786A4D]">Maison Prime</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Vantagem 1 */}
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow border border-[#e5ded3]/60 hover:shadow-lg transition">
            <Home size={44} className="mb-3 text-[#a68f61]" />
            <h3 className="text-xl font-bold text-[#554c38] mb-2">Imóveis exclusivos</h3>
            <p className="text-[#7b7059] text-base">
              Seleção criteriosa de imóveis de alto padrão em Petrolina e região.
            </p>
          </div>
          {/* Vantagem 2 */}
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow border border-[#e5ded3]/60 hover:shadow-lg transition">
            <BadgeCheck size={44} className="mb-3 text-[#a68f61]" />
            <h3 className="text-xl font-bold text-[#554c38] mb-2">Atendimento personalizado</h3>
            <p className="text-[#7b7059] text-base">
              Consultoria completa, do início ao fim do seu negócio imobiliário.
            </p>
          </div>
          {/* Vantagem 3 */}
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow border border-[#e5ded3]/60 hover:shadow-lg transition">
            <ShieldCheck size={44} className="mb-3 text-[#a68f61]" />
            <h3 className="text-xl font-bold text-[#554c38] mb-2">Segurança e transparência</h3>
            <p className="text-[#7b7059] text-base">
              Negocie com toda a confiança, agilidade e suporte em todas as etapas.
            </p>
          </div>
        </div>
        {/* Linha extra de vantagens? */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow border border-[#e5ded3]/60 hover:shadow-lg transition">
            <CalendarCheck size={44} className="mb-3 text-[#a68f61]" />
            <h3 className="text-xl font-bold text-[#554c38] mb-2">Agende visitas online</h3>
            <p className="text-[#7b7059] text-base">
              Facilidade para visitar e conhecer os imóveis sem burocracia.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow border border-[#e5ded3]/60 hover:shadow-lg transition">
            <Building2 size={44} className="mb-3 text-[#a68f61]" />
            <h3 className="text-xl font-bold text-[#554c38] mb-2">Financiamento facilitado</h3>
            <p className="text-[#7b7059] text-base">
              Simule e conquiste as melhores taxas com nosso suporte especializado.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow border border-[#e5ded3]/60 hover:shadow-lg transition">
            <ShieldCheck size={44} className="mb-3 text-[#a68f61]" />
            <h3 className="text-xl font-bold text-[#554c38] mb-2">100% Digital</h3>
            <p className="text-[#7b7059] text-base">
              Faça todo o processo online, do conforto da sua casa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
