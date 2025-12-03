import Link from 'next/link'

const FOOTER_LINKS = [
  { href: '/about', label: 'Despre hangOFF' },
  { href: '/faq', label: 'FAQ' },
  { href: '/terms', label: 'Termeni şi condiţii' },
  { href: '/returns', label: 'Politica de retur' },
  { href: '/privacy', label: 'Politica de confidenţialitate' },
  { href: '/cookies', label: 'Politica cookie-uri' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-background mt-auto w-full border-t">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Main content section */}
        <div className="mb-8">
          <h3 className="mb-3 text-lg font-semibold">De ce hangOFF?</h3>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            Te poți bucura în continuare de tipul tău de alcool preferat; micile ajustări ale
            modului în care consumi alcool îți pot ajuta organismul să ai un stil de viață mai
            sănătos.
          </p>
        </div>

        {/* Links section */}
        <nav className="mb-8" aria-label="Footer navigation">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap lg:gap-x-6 lg:gap-y-3">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground text-sm">
            © 2025 hangOFF – împotriva mahmureii. All rights reserved
          </p>
          <div className="flex flex-col gap-2 text-sm sm:flex-row sm:gap-4">
            <Link
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Soluționarea Alternativă a Litigiilor
            </Link>
            <Link
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Online Dispute Resolution
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
