import { allPosts } from "contentlayer/generated";

const Menu = () => {
  const postUrls = allPosts.map((post) => {
    return [post.title, post._raw.flattenedPath];
  });
  return (
    <div className="min-h-28 md:h-[95%] no-scrollbar md:w-[20rem] overflow-y-scroll bg-cardPrimary pt-4 rounded-md shadow">
      <div
        className={`prose-menu prose-ul:list-none text-fontMenu text-sm list-none font-medium pr-4`}
      >
        <h1 className="ml-6 font-bold">Contents</h1>
        <hr className="ml-4" />
        <ul>
          {postUrls.map(([title, postUrl]) => (
            <li key={postUrl}>
              <a href={`/algo-guide/${postUrl}`}>{title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
