export async function getStaticProps({ locale }: { locale: string }) {
    const products = await fetchBlog();
    return {
        props: {
            blogs,
            pageTitle: "Our Products",
        },
        revalidate: 60, // regenerate page at most every 60s
    };
}


/*
    Use ISR for this page as it does change a lot:
    ISR (Incremental Static Regeneration)

    Meaning: Pre-render pages at build time (like SSG) but allow re-generation at runtime after a specified interval.

    Use case: pages that rarely change, like product listings, FAQs, blog posts.

    Example:
        export async function getStaticProps({ locale }: { locale: string }) {
            const Blogs = await fetchBlog();
            return {
                props: {
                    blogs,
                    pageTitle: "Our Blogs",
                },
                revalidate: 60, // regenerate page at most every 60s
            };
        }
    revalidate = seconds after which the next request will trigger regeneration.
    Index.tsx currently uses getServerSideProps, which regenerates every request → ISR reduces server load and improves performance.
    Where to apply:
        Pages like Market/index.tsx, product listings, blogs, or other pages that:
            Benefit from pre-rendering for SEO
            Update occasionally (not every request)
    Do not use ISR for CSR-only Solution pages, because they are fully dynamic on the client.
*/