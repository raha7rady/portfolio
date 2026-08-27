"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

type ImageCarouselProps = {
  images?: string[];
  title: string;
};

export default function ImageCarousel({ images, title }: ImageCarouselProps) {
  const { dict } = useLocale();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const hasImages = Boolean(images && images.length > 0);
  const slides: string[] = images ?? [];
  const activeSlide = slides[index] ?? slides[0] ?? "";

  const goTo = useCallback(
    (next: number) => {
      if (!hasImages) return;
      const count = slides.length;
      setDirection(next > index ? 1 : -1);
      setIndex(((next % count) + count) % count);
    },
    [hasImages, index, slides.length],
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  // ناوبری با کیبورد وقتی روی اسلایدر فوکوس است.
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") goNext();
    if (e.key === "ArrowLeft") goPrev();
  };

  // تعویض خودکار اسلاید در صورت وجود بیش از یک تصویر.
  useEffect(() => {
    if (!hasImages || slides.length < 2) return;
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [hasImages, slides.length]);

  if (!hasImages) {
    return (
      <div className="mt-8 flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-surface px-6 text-center">
        <ImageOff size={28} className="text-muted" />
        <p className="text-sm font-medium text-muted">{dict.caseStudy.imagesComingSoon}</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div
        className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-surface outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={title}
        onKeyDown={handleKeyDown}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={activeSlide}
              alt={`${title} — screenshot ${index + 1}`}
              fill
              sizes="(min-width: 768px) 700px, 100vw"
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute inset-y-0 left-0 flex w-10 items-center justify-center bg-gradient-to-r from-black/30 to-transparent text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 sm:w-14"
            >
              <span className="rounded-full bg-black/40 p-1.5 backdrop-blur-sm">
                <ChevronLeft size={18} />
              </span>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="absolute inset-y-0 right-0 flex w-10 items-center justify-center bg-gradient-to-l from-black/30 to-transparent text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 sm:w-14"
            >
              <span className="rounded-full bg-black/40 p-1.5 backdrop-blur-sm">
                <ChevronRight size={18} />
              </span>
            </button>

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/30 px-2.5 py-1.5 backdrop-blur-sm">
              {slides.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to image ${i + 1}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>

            <span className="absolute right-3 top-3 rounded-full bg-black/40 px-2 py-0.5 font-mono text-[11px] text-white backdrop-blur-sm">
              {index + 1}/{slides.length}
            </span>
          </>
        )}
      </div>

      {slides.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {slides.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Thumbnail ${i + 1}`}
              className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                i === index ? "border-accent" : "border-border opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
