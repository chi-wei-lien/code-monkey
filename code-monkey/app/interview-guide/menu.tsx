import { allPosts } from "contentlayer/generated";

type DirNodeChildren = {
  [key: string]: DirNode | undefined;
};

type DirNode = {
  children: DirNodeChildren;
  level: number;
  files: [number, string, string][]; // array of tuple: (sort_id, title, url)
};

const construct_menu = (
  currNode: DirNode,
  pathComponents: string[],
  idx: number,
  title: string,
  url: string,
  sort_id: number,
) => {
  if (idx == pathComponents.length) {
    return;
  }

  const currPathComponent = pathComponents[idx];

  if (idx == pathComponents.length - 1) {
    currNode.files.push([sort_id, title, url]);
    return;
  }

  if (!(currPathComponent in currNode.children)) {
    currNode.children[currPathComponent] = {
      children: {},
      files: [],
      level: currNode.level + 1,
    };
  }

  if (currNode.children[currPathComponent]) {
    construct_menu(
      currNode.children[currPathComponent],
      pathComponents,
      idx + 1,
      title,
      url,
      sort_id,
    );
  } else {
    console.error("error occurs when adding path component");
  }
};

const MenuEntry = (currNode: DirNode) => {
  const entryElements = [];
  const fileElements = [];

  const indent = currNode.level > 0 ? 0.9 : 0;

  const sortedEntries = Object.entries(currNode.children).sort(
    ([keyA], [keyB]) => {
      const numA = parseInt(keyA.split(" ")[0], 10);
      const numB = parseInt(keyB.split(" ")[0], 10);
      return numA - numB;
    },
  );

  for (const [entry, childNode] of sortedEntries) {
    if (childNode) {
      entryElements.push(
        <div
          className="hover:text-red-400"
          style={{ paddingLeft: `${indent}rem` }}
        >
          <a>{entry.replace(/^\d+\s/, "")}</a>
          {MenuEntry(childNode)}
        </div>,
      );
    }
  }

  for (const [, title, url] of currNode.files) {
    fileElements.push(
      <a
        href={url}
        className="hover:text-red-400"
        style={{ paddingLeft: `${indent}rem` }}
      >
        {title}
      </a>,
    );
  }

  return (
    <>
      {fileElements.map((fileElement, i) => (
        <div className="pt-1" key={`level-${currNode.level}-file-${i}`}>
          {fileElement}
        </div>
      ))}
      {entryElements.map((entryElement, i) => (
        <div className="pt-1" key={`level-${currNode.level}-entry-${i}`}>
          {entryElement}
        </div>
      ))}
    </>
  );
};

const Menu = () => {
  const root: DirNode = {
    children: {},
    files: [],
    level: 0,
  };

  allPosts.map((post) => {
    construct_menu(
      root,
      post._raw.flattenedPath.split("/"),
      0,
      post.title,
      `/interview-guide/${post._raw.flattenedPath}`,
      post.sort_id,
    );
    return [post.title, post._raw.flattenedPath];
  });

  return (
    <div className="no-scrollbar min-h-28 overflow-y-scroll rounded-md bg-cardPrimary pt-4 shadow lg:h-[95%] lg:min-w-[20rem]">
      <div className={`list-none pr-4 text-sm font-medium text-fontMenu`}>
        <h1 className="ml-6 font-bold">Contents</h1>
        <hr className="ml-4" />
        <div className="ml-6 mt-1 pb-5">{MenuEntry(root)}</div>
      </div>
    </div>
  );
};

export default Menu;
