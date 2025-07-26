"use client";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contato() {
  return (
    <section
      id="contato"
      className="w-full py-16 px-4 bg-white border-t border-[#EFE8D8]"
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Info lateral */}
        <div className="flex-1 flex flex-col justify-center gap-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#A68F61] mb-2">
            Fale conosco
          </h2>
          <p className="text-[#786A4D] mb-4">
            Tire suas dúvidas ou agende uma visita. Nossa equipe está pronta para atender você!
          </p>
          <div className="flex items-center gap-3 text-[#786A4D]">
            <Mail className="w-5 h-5" />
            <span>contato@maisonprime.com.br</span>
          </div>
          <div className="flex items-center gap-3 text-[#786A4D]">
            <Phone className="w-5 h-5" />
            <span>(87) 98888-8888</span>
          </div>
          <div className="flex items-center gap-3 text-[#786A4D]">
            <MapPin className="w-5 h-5" />
            <span>Av. Principal, 1234 - Petrolina, PE</span>
          </div>
        </div>

        {/* Formulário */}
        <form className="flex-1 bg-[#F7F5EF] p-8 rounded-2xl shadow-md flex flex-col gap-5">
          <div className="flex gap-4 flex-col md:flex-row">
            <input
              type="text"
              className="w-full bg-white border border-[#EFE8D8] rounded-xl px-4 py-3 text-[#786A4D] focus:outline-none focus:ring-2 focus:ring-[#A68F61]/40 transition"
              placeholder="Seu nome"
              required
            />
            <input
              type="email"
              className="w-full bg-white border border-[#EFE8D8] rounded-xl px-4 py-3 text-[#786A4D] focus:outline-none focus:ring-2 focus:ring-[#A68F61]/40 transition"
              placeholder="Seu e-mail"
              required
            />
          </div>
          <input
            type="text"
            className="w-full bg-white border border-[#EFE8D8] rounded-xl px-4 py-3 text-[#786A4D] focus:outline-none focus:ring-2 focus:ring-[#A68F61]/40 transition"
            placeholder="Assunto"
          />
          <textarea
            className="w-full bg-white border border-[#EFE8D8] rounded-xl px-4 py-3 text-[#786A4D] focus:outline-none focus:ring-2 focus:ring-[#A68F61]/40 transition"
            rows={4}
            placeholder="Sua mensagem"
            required
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-[#A68F61] hover:bg-[#8C794E] text-white font-semibold px-8 py-3 rounded-full shadow transition"
          >
            <Send className="w-5 h-5" /> Enviar mensagem
          </button>
        </form>
      </div>
    </section>
  );
}
