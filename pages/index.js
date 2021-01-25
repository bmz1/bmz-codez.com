import Link from "next/link";

import { Layout, Bio, SEO } from "@components/common";
import { getSortedPosts } from "@utils/posts";

export default function Home({ posts }) {
  return (
    <Layout>
      <SEO title="All posts" />
      <div className="mt-8">
        {posts.map(({ frontmatter: { title, description, date }, slug }) => (
          <article key={slug} className="px-4">
            <header className="mb-2">
              <h3 className="mb-2">
                <Link href={"/post/[slug]"} as={`/post/${slug}`}>
                  <a className="text-4xl font-extrabold text-black font-display dark:bg-gray-800">
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

export async function getStaticProps() {
  const posts = getSortedPosts();

  return {
    props: {
      posts,
    },
  };
}
