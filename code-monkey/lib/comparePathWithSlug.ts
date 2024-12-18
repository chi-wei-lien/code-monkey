const comparePathWithSlug = (path: string, slug: string[]) => {
  const pathComponents = path.split("/");
  let i = 0;
  if (pathComponents.length != slug.length) {
    return false;
  }
  for (i; i < pathComponents.length; i += 1) {
    if (decodeURIComponent(slug[i]) !== pathComponents[i]) {
      return false;
    }
  }
  return true;
};

export default comparePathWithSlug;
