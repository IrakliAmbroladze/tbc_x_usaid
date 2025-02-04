import { Link } from "i18n/routing";
import EditProductForm from "./edit-product-form";

const EditProduct = async ({
  params,
}: {
  params: { id: string };
}): Promise<JSX.Element> => {
  const { id } = params;

  if (!id) return <p>product does not exist</p>;

  return (
    <div className="flex flex-col max-w-6xl mx-auto p-6 bg-white dark:bg-stone-900  shadow-lg rounded-lg m-2">
      <div className="flex justify-between">
        <Link href={"../"}>go to products list</Link>
        <Link href={`./`}>view product</Link>
      </div>
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6 dark:text-yellow-200">
        / პროდ. განახლება / Edit Product /
      </h1>
      <EditProductForm id={id} />
    </div>
  );
};

export default EditProduct;
