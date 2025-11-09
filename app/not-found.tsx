import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-foreground">404</h1>
        <h2 className="text-2xl font-semibold text-foreground">
          Pagina nu a fost găsită
        </h2>
        <p className="text-muted-foreground max-w-md">
          Ne pare rău, dar pagina pe care o cauți nu există sau a fost mutată.
        </p>
        <div className="pt-4">
          <Link href="/">
            <Button size="lg">Înapoi la pagina principală</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
