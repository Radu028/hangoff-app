import { notFound } from 'next/navigation'

import { getProductBySlug } from '@/lib/products'
import ProductBreadcrumbs from '@/app/ui/breadcrumbs/product'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const product = getProductBySlug(slug)

  if (!product) {
    return notFound()
  }

  return (
    <>
      <ProductBreadcrumbs productName={product.name} />
      <h1>{product.name}</h1>
    </>
  )
}
