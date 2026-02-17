import { lazy, type ComponentType } from "react";

export interface SliceComponentProps {
  className?: string;
}

type SliceModule = { default: ComponentType<SliceComponentProps> };

const sliceRegistry: Record<string, () => Promise<SliceModule>> = {
  "outfittr-swipe": () =>
    import("@/components/slices/outfittr-swipe/SwipeSlice"),
};

export function getSliceComponent(sliceId: string) {
  const loader = sliceRegistry[sliceId];
  if (!loader) return null;
  return lazy(loader);
}

export function isSliceRegistered(sliceId: string): boolean {
  return sliceId in sliceRegistry;
}
