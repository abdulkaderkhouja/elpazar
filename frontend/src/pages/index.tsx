import React, { ReactElement, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import type { NextPageWithLayout } from "./_app";
import MarketLayout from "../components/ui/Layouts/MarketLayout";

// Props for the page
type HomePageProps = {
  pageMetaDescription: string;
  pageKeywords: string;
  pageRobots: string;
  pageTitle: string;
  pageCanonical: string;
  pageAlternates: string;
  pageOgTitle: string;
  pageOdDescription: string;
  pageOgImage: string;
  pageOgUrl: string;
  pageOgType: string;
  pageOgSitename: string;
  pageOgVideo: string;
  pageOgLocale: string;
};

const MarketHome: NextPageWithLayout<HomePageProps> = ({}) => {
  const { t } = useTranslation("marketHome");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
        <img
          className="size-12 shrink-0"
          src="/assets/images/logo.png"
          alt="ChitChat Logo"
        />
        <div>
          <div className="text-xl font-medium text-black dark:text-white">
            ChitChat
          </div>
          <p className="text-gray-500 dark:text-gray-400">You have a new message!</p>
        </div>
      </div>

      <div className="bg-sky-800 text-white p-10 text-center">
        Tailwind is working! 🎉
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none"
      >
        💬
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-72 rounded-xl bg-white p-4 shadow-lg dark:bg-slate-800 dark:shadow-none">
          <div className="flex items-center gap-x-4">
            <img
              className="h-12 w-12 rounded-full"
              src="/assets/images/logo.png"
              alt="ChitChat Logo"
            />
            <div>
              <div className="text-lg font-medium text-black dark:text-white">
                ChitChat
              </div>
              <p className="text-gray-500 dark:text-gray-400">{t("newMessage")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Attach layout
MarketHome.getLayout = function getLayout(page: ReactElement) {
  return <MarketLayout>{page}</MarketLayout>;  {/* Fully SSR */}
};

// SSR for SEO-friendly pages
export async function getServerSideProps({ locale }: { locale: string }) {
  // Example: Fetch dynamic content from API
  // const dynamicData = await fetch("https://api.example.com/home").then(res => res.json());

  return {
    props: {
      ...(await serverSideTranslations(locale, ["marketHome"])),
      pageTitle: "Import - Export - International Trading | El Pazar Global Co.",
      pageMetaDescription: "Your trusted partner for international trading, import/export, and global logistics.",
      pageKeywords: "import, export, trading, international trade, logistics",
      pageRobots: "index, follow",
      pageCanonical: "https://www.elpazarglobal.com",
      pageAlternates: "https://www.elpazarglobal.com",
      pageOgTitle: "El Pazar Global Co. - Import & Export",
      pageOdDescription: "We help businesses trade internationally with ease.",
      pageOgImage: "/assets/images/logo.png",
      pageOgUrl: "https://www.elpazarglobal.com",
      pageOgType: "website",
      pageOgSitename: "El Pazar Global",
      pageOgVideo: "",
      pageOgLocale: "en_US",
    },
  };
}

export default MarketHome;