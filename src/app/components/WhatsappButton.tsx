// components/WhatsappButton.tsx
"use client";

export default function WhatsappButton() {
  return (
    <a
      href="https://wa.me/5587999999999?text=Olá%2C+gostaria+de+fazer+um+orçamento+de+imóvel."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
      aria-label="Fale pelo WhatsApp"
    >
      <span className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-5 rounded-full shadow-lg transition-all text-base">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" width={26} height={26}>
          <circle cx="16" cy="16" r="16" fill="#25D366"/>
          <path fill="#fff" d="M23.8 20.7c-.3-.1-1.7-.9-2-1-..."/>
          <path d="M16 4.7A11.3 11.3 0 0 0 6.3 21.2l-1.1 3.3c-.2.5.3 1 .8.8l3.3-1.1A11.3 11.3 0 1 0 16 4.7Zm0 20.6a9.3 9.3 0 0 1-4.6-1.2l-.3-.2-2.4.8.8-2.4-.2-.3a9.3 9.3 0 1 1 6.7 3.3Z" fill="#fff"/>
        </svg>
        Quero saber mais
      </span>
    </a>
  );
}
