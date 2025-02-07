import { FC } from "react";
import { Link } from "i18n/routing";
import { useTranslations } from "next-intl";
import { FiEdit3 } from "react-icons/fi";
import { DeleteProductBtn } from "./delete-post";

type Post = {
  id: number;
  title_en: string;
  title_ka: string;
  body_en: string;
  body_ka: string;
  tags: string[];
  body: string;
  title: string;
  views: string;
  tag_001_en: string | null;
  tag_002_en: string | null;
  tag_003_en: string | null;
};

interface PostListProps {
  postList: Post[];
  locale: string;
  onDelete: (id: number | string) => void;
}

interface PostCardProps {
  post: Post;
  onDelete: (id: number | string) => void;
}

const PostList: FC<PostListProps> = ({ postList, locale, onDelete }) => {
  return (
    <div className="w-full max-w-[1110px] mx-auto mb-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {postList.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            locale={locale}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

const PostCard = ({
  post,
  locale,
  onDelete,
}: PostCardProps & { locale: string }): JSX.Element => {
  const t = useTranslations("Add");
  return (
    <div className="flex flex-col bg-white dark:bg-stone-500 text-black shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 border-b-2 border-black">
        {locale == "ka" ? post.title_ka : post.title_en}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-200 line-clamp-3 mb-4">
        {locale == "ka" ? post.body_ka : post.body_en}
      </p>
      <div className="mt-auto flex justify-between">
        <Link
          data-cy={`edit-${post.id}`}
          href={`./blog/${post.id}/edit-blog`}
          className="px-4 py-2 bg-[#86cd82] text-white rounded-3xl shadow-sm hover:text-black transition-transform duration-150 ease-in-out active:scale-95"
        >
          <FiEdit3 />
        </Link>
        <DeleteProductBtn product_id={post.id} onDelete={onDelete} />
        <Link
          href={`/blog/${post.id}`}
          className="bg-black text-white py-2 px-4 font-medium text-sm rounded-md hover:bg-gray-500  ease-in-out"
        >
          {t("Read more")}
        </Link>
      </div>
    </div>
  );
};

export default PostList;
