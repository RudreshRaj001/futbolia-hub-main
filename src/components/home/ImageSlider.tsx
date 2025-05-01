import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { RootState, AppDispatch } from "@/store";
import { fetchTopTrendingNews } from "@/store/slices/newsSlice";
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

    const autoplay = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 5000);

    return () => {
      api.off("select", onSlideChange);
      clearInterval(autoplay);
    };
  }, [api, onSlideChange]);

  if (sortedArticles.length === 0) return null;

  return (
    <div className="relative w-full">
      <Carousel className="w-full" opts={{ loop: true }} setApi={setApi}>
        <CarouselContent>
          {sortedArticles.map((item) => (
            <CarouselItem key={item._id}>
              <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.imageUrls[0]})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>

                <div className="absolute inset-0 flex items-center justify-start p-6 md:p-16">
                  <div className="max-w-4xl">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary text-white mb-4">
                        Destacado
                      </span>
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="text-3xl md:text-5xl font-bold text-white mb-4 font-display"
                    >
                      {item.title}
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-lg md:text-xl text-white/80 mb-6 max-w-2xl"
                    >
                      {item.summary ||
                        item.description ||
                        "Lee más sobre esta historia destacada."}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
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

export default ImageSlider;
