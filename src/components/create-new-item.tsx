import { Link } from "i18n/routing";

const CreateNewItem = ({
  url,
  children,
}: {
  url: string;
  children: string;
}) => {
  return (
    <Link
      href={url}
      className="transition-transform duration-150 ease-in-out hover:text-[#222e46] active:scale-95 p-3 mt-2 mb-4 sm:justify-between justify-center py-2 bg-[#86cd82] text-white rounded-lg flex items-center w-full "
    >
      {children}
    </Link>
  );
};

export default CreateNewItem;
