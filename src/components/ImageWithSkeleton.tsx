// Em um novo arquivo, ex: components/ImageWithSkeleton.tsx

import React, { useState } from 'react';

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  className: string;
}

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* 1. O Esqueleto (Skeleton) */}
      {/* É exibido enquanto a imagem não carregou (isLoaded === false). */}
      {/* Possui as mesmas classes de estilo da imagem para evitar que a página "salte" (layout shift). */}
      {!isLoaded && (
        <div className={`${className} animate-pulse bg-gray-200`}></div>
      )}

      {/* 2. A Imagem Real */}
      {/* Fica invisível até ser totalmente carregada. */}
      {/* O atributo `loading="lazy"` é uma otimização extra para o navegador. */}
      {/* Quando o `onLoad` é disparado, o estado `isLoaded` vira `true`. */}
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ display: isLoaded ? 'block' : 'none' }} // Exibe a imagem apenas quando carregada
        onLoad={() => setIsLoaded(true)}
        loading="lazy" 
      />
    </>
  );
};

export default ImageWithSkeleton;