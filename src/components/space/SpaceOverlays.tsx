'use client';

import dynamic from 'next/dynamic';

const StarfieldCanvas = dynamic(
  () => import('./StarfieldCanvas').then((m) => m.StarfieldCanvas),
  { ssr: false }
);

const WarpBurst = dynamic(
  () => import('./WarpBurst').then((m) => m.WarpBurst),
  { ssr: false }
);

export function SpaceOverlays() {
  return (
    <>
      <StarfieldCanvas />
      <WarpBurst />
    </>
  );
}
