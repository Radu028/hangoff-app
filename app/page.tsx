import Image from 'next/image';
import TrustedByCarousel from './ui/trusted-by-carousel';

export default function Home() {
  return (
    <main>
      <section
        className="flex flex-col"
        style={{ height: 'calc(100vh - 100px)' }}
      >
        <div className="relative w-full flex-8 overflow-hidden">
          <Image
            src="/Mockup1.jpg"
            alt="Mockup1"
            width={3840}
            height={2400}
            className="w-full h-full object-cover object-center"
            priority
          />
        </div>

        <div className="relative w-full flex-2 flex flex-col pt-6 pb-2">
          <h2 className="text-4xl font-bold mb-2 text-center">TRUSTED BY</h2>
          <div className="flex-1 flex items-center overflow-hidden">
            <TrustedByCarousel />
          </div>
        </div>
      </section>
    </main>
  );
}
