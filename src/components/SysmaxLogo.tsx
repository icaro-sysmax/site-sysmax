import { useState } from 'react';
import { Phone } from 'lucide-react';

export const SYSMAX_LOGO_LIGHT = 'https://apidata.sysmax.com.br/id-visual-chatwoot/Blue%20(2).png';
export const SYSMAX_LOGO_DARK = 'https://apidata.sysmax.com.br/id-visual-chatwoot/Blue.png';

interface SysmaxLogoProps {
  /**
   * 'dark': Força o logo para fundos escuros (Blue.png)
   * 'light': Força o logo para fundos claros (Blue (2).png)
   * 'auto': Alterna dinamicamente via CSS e media queries
   */
  variant?: 'dark' | 'light' | 'auto';
  className?: string;
  alt?: string;
  showTextFallback?: boolean;
}

export function SysmaxLogo({
  variant = 'auto',
  className = 'h-9 sm:h-10 w-auto object-contain',
  alt = 'Sysmax Tecnologia & Telecomunicações',
  showTextFallback = true,
}: SysmaxLogoProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError && showTextFallback) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-cyan-500/20">
          <Phone className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-extrabold tracking-tight text-white leading-none">
            SYS<span className="text-cyan-400">MAX</span>
          </span>
          <span className="text-[10px] tracking-wider uppercase text-slate-400 font-medium">
            Telefonia & TI
          </span>
        </div>
      </div>
    );
  }

  // Se variant for forçada especificamente para tema claro
  if (variant === 'light') {
    return (
      <img
        src={SYSMAX_LOGO_LIGHT}
        alt={alt}
        className={className}
        onError={() => setHasError(true)}
        loading="eager"
      />
    );
  }

  // Se variant for forçada especificamente para tema escuro
  if (variant === 'dark') {
    return (
      <img
        src={SYSMAX_LOGO_DARK}
        alt={alt}
        className={className}
        onError={() => setHasError(true)}
        loading="eager"
      />
    );
  }

  // Modo 'auto': Alterna dinamicamente respeitando temas claros e escuros via CSS e picture element
  return (
    <picture className="inline-block shrink-0">
      {/* Imagem para tema claro */}
      <source
        media="(prefers-color-scheme: light)"
        srcSet={SYSMAX_LOGO_LIGHT}
      />
      {/* Imagem para tema escuro (padrão) */}
      <source
        media="(prefers-color-scheme: dark)"
        srcSet={SYSMAX_LOGO_DARK}
      />
      {/* Fallback padrão */}
      <img
        src={SYSMAX_LOGO_DARK}
        alt={alt}
        className={className}
        onError={() => setHasError(true)}
        loading="eager"
      />
    </picture>
  );
}
