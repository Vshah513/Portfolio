"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SwipeCard, type ListingItem } from "./SwipeCard";
import demoListings from "./demoListings.json";
import { formatKES } from "@/lib/utils";

const OUTFITTR_API = "https://outfittr-platform.vercel.app/api/products";
const FETCH_TIMEOUT = 2000;

async function fetchListings(): Promise<ListingItem[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

    const res = await fetch(`${OUTFITTR_API}?limit=30&sortBy=newest`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) throw new Error("API error");

    const json = await res.json();
    const items = json.data || json;

    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("No items");
    }

    return items.map((item: Record<string, unknown>) => ({
      id: String(item.id || ""),
      title: String(item.title || "Untitled"),
      price: Number(item.price) || 0,
      images: Array.isArray(item.images) ? item.images.map(String) : [],
      condition: String(item.condition || "good"),
      brand: String(item.brand || ""),
      size: String(item.size || ""),
      category: String(item.category || ""),
    }));
  } catch {
    return demoListings as ListingItem[];
  }
}

export default function SwipeSlice() {
  const [listings, setListings] = useState<ListingItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<ListingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLiked, setShowLiked] = useState(false);

  useEffect(() => {
    fetchListings().then((items) => {
      setListings(items);
      setLoading(false);
    });
  }, []);

  const handleSwipe = useCallback(
    (direction: "left" | "right") => {
      const item = listings[currentIndex];
      if (direction === "right" && item) {
        setLiked((prev) => [...prev, item]);
      }
      setCurrentIndex((prev) => prev + 1);
    },
    [currentIndex, listings]
  );

  const resetDeck = () => {
    setCurrentIndex(0);
    setLiked([]);
  };

  const remaining = listings.length - currentIndex;
  const visibleCards = listings.slice(currentIndex, currentIndex + 3);
  const isDone = currentIndex >= listings.length && listings.length > 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-10 h-10 rounded-full border-2 border-[var(--color-gold)]/30 border-t-[var(--color-gold)] animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Card stack */}
      <div className="relative w-full max-w-sm aspect-[3/4] mx-auto">
        {isDone ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-[var(--color-border)] bg-white/[0.02]"
          >
            <span className="text-4xl mb-4">&#10024;</span>
            <p className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              All caught up!
            </p>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">
              You liked {liked.length} item{liked.length !== 1 ? "s" : ""}
            </p>
            <button
              onClick={resetDeck}
              className="px-6 py-2 rounded-full bg-[var(--color-gold)] text-[var(--color-bg)] text-sm font-medium hover:bg-[var(--color-gold-light)] transition-colors"
            >
              Reset Deck
            </button>
          </motion.div>
        ) : (
          <AnimatePresence>
            {visibleCards.map((item, i) => (
              <SwipeCard
                key={item.id}
                item={item}
                onSwipe={handleSwipe}
                isTop={i === 0}
                stackIndex={i}
              />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Controls */}
      {!isDone && (
        <div className="flex items-center gap-8">
          <button
            onClick={() => handleSwipe("left")}
            className="w-14 h-14 rounded-full border-2 border-[var(--color-error)]/30 flex items-center justify-center hover:border-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition-all group"
            aria-label="Pass"
          >
            <span className="text-[var(--color-error)] text-2xl group-hover:scale-110 transition-transform">
              &#10005;
            </span>
          </button>

          <span className="text-xs text-[var(--color-text-muted)]">
            {remaining} left
          </span>

          <button
            onClick={() => handleSwipe("right")}
            className="w-14 h-14 rounded-full border-2 border-[var(--color-success)]/30 flex items-center justify-center hover:border-[var(--color-success)] hover:bg-[var(--color-success)]/10 transition-all group"
            aria-label="Like"
          >
            <span className="text-[var(--color-success)] text-2xl group-hover:scale-110 transition-transform">
              &#9829;
            </span>
          </button>
        </div>
      )}

      {/* Liked tray toggle */}
      {liked.length > 0 && (
        <div className="w-full max-w-sm">
          <button
            onClick={() => setShowLiked(!showLiked)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-[var(--color-border)] text-sm hover:border-[var(--color-gold)]/30 transition-colors"
          >
            <span className="text-[var(--color-text-secondary)]">
              Liked Items ({liked.length})
            </span>
            <motion.span
              animate={{ rotate: showLiked ? 180 : 0 }}
              className="text-[var(--color-text-muted)]"
            >
              &#9660;
            </motion.span>
          </button>

          <AnimatePresence>
            {showLiked && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                  {liked.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.02] border border-[var(--color-border)]"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white/5 overflow-hidden flex-shrink-0">
                        {item.images[0] && (
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[var(--color-text-primary)] truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-[var(--color-gold)]">
                          {formatKES(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
