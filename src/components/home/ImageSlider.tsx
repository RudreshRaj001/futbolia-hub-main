import React, { useEffect, useState, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { RootState, AppDispatch } from "@/store";
import { fetchTopTrendingNews } from "@/store/slices/newsSlice";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const trendingKeywords = [
  "Ecuador",
  "Libertadores",
  "Barcelona SC",
  "La Tri",
  "LigaPro",
  "Selección",
];

// Animation variants for better performance
const slideVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: custom * 0.1 }
  })
};

// Use will-change property to optimize GPU usage
const willChangeStyles = {
  willChange: 'transform, opacity'
};

const SliderItem = memo(({ item, index, isPriority }: any) => (
  <CarouselItem key={item._id}>
    <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center">
        <ResponsiveImage 
          src={item.imageUrls[0]} 
          alt={item.title}
          width={1920}
          height={1080}
          priority={isPriority}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      <div className="absolute inset-0 flex items-center justify-start p-6 md:p-16">
        <div className="max-w-4xl">
          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            custom={0}
            style={willChangeStyles}
          >
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary text-white mb-4">
              Destacado
            </span>
          </motion.div>

          <motion.h2
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            custom={1}
            style={willChangeStyles}
            className="text-3xl md:text-5xl font-bold text-white mb-4 font-display"
          >
            {item.title}
          </motion.h2>

          <motion.p
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            custom={2}
            style={willChangeStyles}
            className="text-lg md:text-xl text-white/80 mb-6 max-w-2xl"
          >
            {item.summary ||
              item.description ||
              "Lee más sobre esta historia destacada."}
          </motion.p>

          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            custom={3}
            style={willChangeStyles}
          >
            <Link to={`/noticias/slug/${item.slug}`}>
              <Button className="bg-primary text-white hover:bg-primary/90">
                Leer más <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  </CarouselItem>
));

const ImageSlider: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { news } = useSelector((state: RootState) => state.news);
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const sortedArticles = [...news]
    .filter((item) => item.imageUrls?.[0])
    .sort((a, b) => {
      const countKeywords = (text = "") =>
        trendingKeywords.filter((k) =>
          text.toLowerCase().includes(k.toLowerCase())
        ).length;
      const aMatches = countKeywords(a.title + " " + a.summary);
      const bMatches = countKeywords(b.title + " " + b.summary);
      return bMatches - aMatches;
    })
    .slice(0, 3);

  const onSlideChange = useCallback(() => {
    if (!api) return;
    setCurrentIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    dispatch(fetchTopTrendingNews({ keywords: trendingKeywords, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    if (!api) return;
    api.on("select", onSlideChange);

    // Use requestAnimationFrame for smoother animation timing
    let animationId: number;
    let lastSlideTime = performance.now();

    const animateSlider = (currentTime: number) => {
      if (currentTime - lastSlideTime > 5000) { // 5 seconds interval
        if (api.canScrollNext()) {
          api.scrollNext();
        } else {
          api.scrollTo(0);
        }
        lastSlideTime = currentTime;
      }
      animationId = requestAnimationFrame(animateSlider);
    };

    animationId = requestAnimationFrame(animateSlider);

    return () => {
      api.off("select", onSlideChange);
      cancelAnimationFrame(animationId);
    };
  }, [api, onSlideChange]);

  if (sortedArticles.length === 0) return null;

  return (
    <div className="relative w-full will-change-transform">
      <Carousel className="w-full" opts={{ loop: true }} setApi={setApi}>
        <CarouselContent>
          {sortedArticles.map((item, index) => (
            <SliderItem 
              key={item._id} 
              item={item} 
              index={index} 
              isPriority={index === 0} 
            />
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4 bg-white/20 hover:bg-white/40 border-none text-white" />
        <CarouselNext className="right-4 bg-white/20 hover:bg-white/40 border-none text-white" />

        {/* Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {sortedArticles.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                index === currentIndex
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default memo(ImageSlider);
