import { useState } from 'react';
import { Phone } from 'lucide-react';

export const SYSMAX_LOGO_DARK = 'https://apidata.sysmax.com.br/id-visual-chatwoot/Blue.png';
export const SYSMAX_LOGO_LIGHT = 'https://apidata.sysmax.com.br/id-visual-chatwoot/Blue%20(2).png';

interface SysmaxLogoProps {
  /**
   * 'dark': Força o logo para fundos escuros (Blue.png / texto branco e ciano)
   * 'light': Força o logo para fundos claros (Blue (2).png / texto azul escuro)
   * 'auto': Respeita tema do sistema ou escuro por padrão
   */
  variant?: 'dark' | 'light' | 'auto';
  className?: string;
  alt?: string;
  showTextFallback?: boolean;
}

export function SysmaxLogo({
  variant = 'dark',
  className = 'h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105',
  alt = 'Sysmax Tecnologia & Telecomunicações',
  showTextFallback = true,
}: SysmaxLogoProps) {
  const [hasError, setHasError] = useState(false);
  const [srcIndex, setSrcIndex] = useState(0);

  // Origens para garantir carregamento em file:///, aaPanel, cPanel e CDN remoto
  const darkSources = [
    './assets/sysmax-logo-dark.png',
    './sysmax-logo-dark.png',
    '/assets/sysmax-logo-dark.png',
    '/sysmax-logo-dark.png',
    SYSMAX_LOGO_DARK,
  ];

  const lightSources = [
    './assets/sysmax-logo-light.png',
    './sysmax-logo-light.png',
    '/assets/sysmax-logo-light.png',
    '/sysmax-logo-light.png',
    SYSMAX_LOGO_LIGHT,
  ];

  const activeSources = variant === 'light' ? lightSources : darkSources;

  const handleError = () => {
    if (srcIndex < activeSources.length - 1) {
      setSrcIndex(srcIndex + 1);
    } else {
      setHasError(true);
    }
  };

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

  if (variant === 'auto') {
    return (
      <picture className="inline-block shrink-0">
        <source
          media="(prefers-color-scheme: light)"
          srcSet="./assets/sysmax-logo-light.png"
        />
        <source
          media="(prefers-color-scheme: dark)"
          srcSet="./assets/sysmax-logo-dark.png"
        />
        <img
          src={darkSources[srcIndex]}
          alt={alt}
          className={className}
          onError={handleError}
          loading="eager"
          decoding="async"
        />
      </picture>
    );
  }

  return (
    <img
      src={activeSources[srcIndex]}
      alt={alt}
      className={className}
      onError={handleError}
      loading="eager"
      decoding="async"
    />
  );
}
