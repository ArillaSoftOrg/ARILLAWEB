import Image from "next/image";
import heroImage from "../../../public/hero-arilla-soft.png";

export default function HeroShowcase() {
  return (
    <div
      className="relative mx-auto aspect-[31/32] w-full max-w-[560px] overflow-visible sm:max-w-[600px] xl:mx-0 xl:max-w-[620px]"
      style={{
        maxHeight: "calc(100dvh - var(--header-h) - var(--bar-h, 0px) - 56px)",
      }}
    >
      <Image
        src={heroImage}
        alt="Arilla Soft dijital çözümler görseli"
        fill
        preload
        className="object-contain"
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 80vw, 620px"
      />
    </div>
  );
}
