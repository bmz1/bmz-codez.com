import Link from "next/link";

import { Layout, SEO } from "@components/common";
import { getPostsByTag, getSortedPosts } from "@utils/posts";

export default function Tag({ posts, tag }) {
  return (
    <Layout>
      <SEO title={tag} />
      <div className="mt-8">
      <h2 className="text-lg font-extrabold text-center mb-8">#{tag}</h2>
      {posts.map(({ frontmatter: { title, description, date }, slug }) => (
        <article key={slug} className="px-4">
          <header className="mb-2">
            <h3 className="mb-2">
              <Link href={"/post/[slug]"} as={`/post/${slug}`}>
                <a className="text-4xl font-extrabold text-black font-display">
                  {title}
                </a>
              </Link>
            </h3>
            <span className="text-sm">{date}</span>
          </header>
          <section>
            <p className="mb-8 text-lg">{description}</p>
          </section>
        </article>
      ))}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getSortedPosts().reduce((acc, cur) => {
    const tags = cur.frontmatter.tags.map(tag => ({ params: { tag }}))
    acc.push(tags)
    return acc.flat()
  }, []);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { tag }}) {
  const posts = getPostsByTag(tag);

  return {
    props: {
      posts,
      tag
    },
  };
}
