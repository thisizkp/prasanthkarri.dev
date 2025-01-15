export interface Post {
  url: string;
  frontmatter: {
    title: string;
    pubDate: string;
    tags: string[];
  };
}
