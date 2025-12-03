import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <div className="space-y-6 text-center">
        <h1 className="text-foreground text-6xl font-bold">404</h1>
        <h2 className="text-foreground text-2xl font-semibold">Pagina nu a fost găsită</h2>
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
  )
}
