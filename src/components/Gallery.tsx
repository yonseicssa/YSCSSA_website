'use client';

import { useRef, useState } from 'react';

type GalleryImage = { src: string; alt: string };

export default function Gallery({ images, closeLabel }: { images: GalleryImage[]; closeLabel: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="gallery-grid">
        {images.map((image) => (
          <button
            key={image.src}
            type="button"
            className="gallery-thumb"
            onClick={() => {
              setActive(image);
              dialogRef.current?.showModal();
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.src} alt={image.alt} loading="lazy" width={800} height={600} />
          </button>
        ))}
      </div>

      <dialog
        className="qr-dialog"
        ref={dialogRef}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {active && <img src={active.src} alt={active.alt} />}
        <form method="dialog">
          <button className="cta-button cta-button-outline" type="submit">
            {closeLabel}
          </button>
        </form>
      </dialog>
    </>
  );
}
