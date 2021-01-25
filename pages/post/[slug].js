import Link from "next/link";
import ReactMarkdown from "react-markdown/with-html";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import style from "react-syntax-highlighter/dist/cjs/styles/prism/dracula";

import { Layout, Image, SEO, Bio } from "@components/common";
import { getPostBySlug, getPostsSlugs } from "@utils/posts";

export default function Post({ post, frontmatter, nextPost, previousPost }) {
  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description || post.excerpt}
        canonicalUrl={frontmatter.canonicalUrl}
      />

      <div className="w-full bg-js-yellow-y dark:bg-gray-600 p-10 flex justify-center mb-8" id="header">
        <header>
          <h1 className="mb-2 text-6xl font-black leading-none font-display">
            {frontmatter.title}
          </h1>
          <div className="flex justify-between flex-wrap">
            <p className="text-sm flex-1">{frontmatter.date}</p>
            <div className="flex mt-1">
            {frontmatter.tags.map((tag) => (
              <Link href={"/tag/[tag]"} as={`/tag/${tag}`} key={tag}>
                <p className="text-sm p-1 cursor-pointer">{`#${tag}`}</p>
              </Link>
            ))}
            </div>
          </div>
        </header>
      </div>
      <article className="relative px-4">
        <ReactMarkdown
          className="mb-4 prose lg:prose-lg dark:prose-dark top-4"
          escapeHtml={false}
          source={post.content}
          renderers={{ code: CodeBlock, image: MarkdownImage }}
        />
        <hr className="mt-4" />
        <footer>
          <Bio className="mt-8 mb-16" />
        </footer>
      </article>

      <nav className="flex flex-wrap justify-between mb-10">
        {previousPost ? (
          <Link href={"/post/[slug]"} as={`/post/${previousPost.slug}`}>
            <a className="text-lg font-bold">
              ← {previousPost.frontmatter.title}
            </a>
          </Link>
        ) : (
          <div />
        )}
        {nextPost ? (
          <Link href={"/post/[slug]"} as={`/post/${nextPost.slug}`}>
            <a className="text-lg font-bold">{nextPost.frontmatter.title} →</a>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getPostsSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const postData = getPostBySlug(slug);
  if (!postData.previousPost) {
    postData.previousPost = null;
  }

  if (!postData.nextPost) {
    postData.nextPost = null;
  }

  return { props: postData };
}

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter style={style} language={language}>
      {value}
    </SyntaxHighlighter>
  );
};

const MarkdownImage = ({ alt, src }) => {
  let source =
    src.indexOf("http") > -1 ? src : require(`../../content/assets/${src}`);
  let webpSrc =
    src.indexOf("http") > -1
      ? src
      : require(`../../content/assets/${src}?webp`);
  let previewSrc =
    src.indexOf("http") > -1
      ? src
      : require(`../../content/assets/${src}?lqip`);
  return (
    <Image
      alt={alt}
      src={source}
      webpSrc={webpSrc}
      previewSrc={previewSrc}
      className="w-full"
    />
  );
};
