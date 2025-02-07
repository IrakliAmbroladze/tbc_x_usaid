import { Link } from "i18n/routing";
import EditPostForm from "./edit-blog-form";

const EditPost = async ({
  params,
}: {
  params: { id: string };
}): Promise<JSX.Element> => {
  const { id } = params;

  if (!id) return <p>post does not exist</p>;

  return (
    <div className="flex flex-col max-w-6xl mx-auto p-6 bg-white dark:bg-stone-900  shadow-lg rounded-lg m-2">
      <div className="flex justify-between">
        <Link href={"../"}>go to posts list</Link>
        <Link href={`./`}>view post</Link>
      </div>
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6 dark:text-yellow-200">
        / ბლოგის განახლება / Edit Blog /
      </h1>
      <EditPostForm id={id} />
    </div>
  );
};

export default EditPost;
