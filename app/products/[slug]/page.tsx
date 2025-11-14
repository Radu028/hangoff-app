import ProductBreadcrumbs from '@/app/ui/breadcrumbs/product';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <ProductBreadcrumbs slug={slug} />
      <h1>Product</h1>
    </>
  );
}
