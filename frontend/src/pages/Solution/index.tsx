/**
 * Home Component
 *
 * The main content for the homepage.
 * This component is nested inside MarketLayout when served from index.tsx.
 *
 * @returns {JSX.Element} The home page content including banners, featured products, etc.
 */
import { useTranslation } from "next-i18next";
import Head from "next/head";

export default function SolutionHome() {
  const { t } = useTranslation("solutionHome");

  return (
    <>
      <Head>
        <title>Solution - My App</title>
        <meta name="description" content="Best solution for your business" />
      </Head>
      <div>Page Content</div>
    </>
  );
}




/*
  Since you cannot use serverSideTranslations in CSR, you have two main approaches:
    Option A: Client-side i18n
      Use next-i18next’s useTranslation hook directly in your component.
      Preload your translation JSON files in /public/locales/{locale}/{namespace}.json.
      Example in Solution/index.tsx:
        import { useTranslation } from "next-i18next";

        export default function SolutionPage() {
          const { t } = useTranslation("solutionPage");

          return <h1>{t("welcomeMessage")}</h1>;
        }
*/