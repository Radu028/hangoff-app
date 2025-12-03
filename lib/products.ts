export type ProductVariant = {
  id: string
  label: string
  price: number
}

export type Product = {
  slug: string
  name: string
  basePrice?: number
  variants?: ProductVariant[]
}

export const products: Product[] = [
  {
    slug: 'hangoff-shot',
    name: 'HangOFF Shot',
    variants: [
      { id: 's1', label: '1 shot', price: 22 },
      { id: 'p5', label: 'Pachet 5', price: 5 * 20 },
      { id: 'p10', label: 'Pachet 10', price: 10 * 18 },
      { id: 'p15', label: 'Pachet 15', price: 15 * 15 },
    ],
  },
  {
    slug: 'sapca-hangoff',
    name: 'Șapcă HangOFF',
    basePrice: 99,
  },
  {
    slug: 'hanorac-hangoff',
    name: 'Hanorac HangOFF',
    basePrice: 199,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}
