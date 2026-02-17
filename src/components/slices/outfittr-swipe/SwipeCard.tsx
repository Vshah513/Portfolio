"use client";

import { motion, useMotionValue, useTransform, type PanInfo } from "framer-motion";
import { useState } from "react";
import { formatKES } from "@/lib/utils";

export interface ListingItem {
  id: string;
  title: string;
  price: number;
  images: string[];
  condition: string;
  brand: string;
  size: string;
  category: string;
}

interface SwipeCardProps {
  item: ListingItem;
  onSwipe: (direction: "left" | "right") => void;
  isTop: boolean;
  stackIndex: number;
}

const conditionLabels: Record<string, string> = {
  brand_new: "Brand New",
  like_new: "Like New",
  excellent: "Excellent",
  good: "Good",
  fair: "Fair",
};

export function SwipeCard({ item, onSwipe, isTop, stackIndex }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const passOpacity = useTransform(x, [-100, 0], [1, 0]);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      onSwipe("right");
    } else if (info.offset.x < -threshold) {
      onSwipe("left");
    }
  };

  const scale = 1 - stackIndex * 0.05;
  const yOffset = stackIndex * 8;

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        zIndex: 10 - stackIndex,
      }}
      initial={{ scale, y: yOffset }}
      animate={{ scale, y: yOffset }}
    >
      <motion.div
        className="w-full h-full rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing relative select-none"
        style={{ x, rotate }}
        drag={isTop ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={isTop ? handleDragEnd : undefined}
        whileDrag={{ scale: 1.02 }}
        exit={{
          x: x.get() > 0 ? 300 : -300,
          opacity: 0,
          transition: { duration: 0.3 },
        }}
      >
        {/* Card background / image */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/[0.02] border border-[var(--color-border)] rounded-2xl">
          {item.images[0] && (
            <>
              {!imgLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-[var(--color-gold)]/30 border-t-[var(--color-gold)] animate-spin" />
                </div>
              )}
              <img
                src={item.images[0]}
                alt={item.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setImgLoaded(true)}
                draggable={false}
              />
            </>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* LIKE overlay */}
        {isTop && (
          <motion.div
            className="absolute top-8 left-8 z-20 px-4 py-2 rounded-xl border-2 border-[var(--color-success)] bg-[var(--color-success)]/20 rotate-[-12deg]"
            style={{ opacity: likeOpacity }}
          >
            <span className="text-2xl font-black text-[var(--color-success)] tracking-wider">
              LIKE
            </span>
          </motion.div>
        )}

        {/* PASS overlay */}
        {isTop && (
          <motion.div
            className="absolute top-8 right-8 z-20 px-4 py-2 rounded-xl border-2 border-[var(--color-error)] bg-[var(--color-error)]/20 rotate-[12deg]"
            style={{ opacity: passOpacity }}
          >
            <span className="text-2xl font-black text-[var(--color-error)] tracking-wider">
              PASS
            </span>
          </motion.div>
        )}

        {/* Item info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
              <div className="flex items-center gap-2">
                {item.brand && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white/80">
                    {item.brand}
                  </span>
                )}
                {item.size && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white/80">
                    {item.size}
                  </span>
                )}
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white/80">
                  {conditionLabels[item.condition] || item.condition}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-[var(--color-gold)]">
                {formatKES(item.price)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
