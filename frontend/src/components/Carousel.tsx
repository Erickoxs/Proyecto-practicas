import React, { useState, useEffect } from "react";

interface CarouselItem {
  id: number;
  src: string;
  alt: string;
  href?: string; // Añadido `href` como opcional para las imágenes
}

const Carousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const items: CarouselItem[] = [
    { id: 1, src: "/img/America.webp", alt: "Slide 1", href: "/categories/67ba4bb165b937a27bbd2280" },
    { id: 2, src: "/img/Nacional.jpg", alt: "Slide 2", href: "/categories/67ba4bc365b937a27bbd2283" },
    { id: 3, src: "/img/Millonarios.png", alt: "Slide 3", href: "/categories/67ba4bcc65b937a27bbd2286" },
    { id: 4, src: "/img/balones.jpg", alt: "Slide 4" },
    { id: 5, src: "/img/guayos.jpg", alt: "Slide 5" },
  ];

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  // Cambiar de imagen automáticamente cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    }, 5000); // Intervalo de 3 segundos (3000 ms)

    // Limpiar el intervalo cuando el componente se desmonte o cuando cambie el índice
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div id="carousel" className="relative w-full">
      {/* Carousel Wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
              index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <a href={item.href || "#"}> {/* `href` ahora es opcional */}
              <img
                src={item.src}
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt={item.alt}
              />
            </a>
          </div>
        ))}
      </div>

      {/* Slider Indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {items.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === activeIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
            aria-current={index === activeIndex}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>

      {/* Slider Controls */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handlePrev}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <img
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            src="/img/angulo-circulo-izquierda.svg"
            alt="Prev"
          />
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handleNext}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <img
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            src="/img/angulo-circulo-derecha.svg"
            alt="Next"
          />
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
