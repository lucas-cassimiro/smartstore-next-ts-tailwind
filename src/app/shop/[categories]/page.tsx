export default async function Categories({
  params,
}: {
  params: { categories: string };
}) {
  return (
    <h1>{params.categories}</h1>
  )
}
