// pages/_app.tsx

// Import React types
// appProps is a TypeScript type that defines the props passed to the costum _app.tsx component in the Pages Router. This components
// wraps all the pages and is used to initialize pages, inject globals styles, and provide common Layouts or data to all pages.
//The AppProps type, imported from next/app, typically includes:
// Component: This prop represents the current page component being rendered.
// pageProps: This prop is an object containing the props that were returned by getStaticProps or getServerSideProps for the current page. If neither of these functions is used, pageProps will be an empty object.
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { appWithTranslation } from 'next-i18next';
import type { NextPage } from 'next';
//Redux is a state management library for JavaScript apps (React, Next.js, Angular, even vanilla JS). It’s used to manage global
// state — data that many components across your app need to access or update. Instead of passing props down multiple layers or juggling state in many components, Redux provides a central store where all your app’s state lives.
import { Provider as ReduxProvider } from 'react-redux';
// Import styles
import '../styles/globals.css';
// Import DOM parts
import Head from 'next/head';
// Import app parts
import { store } from '../store';
// Import Layouts
import MarketLayout from "../components/ui/Layouts/MarketLayout";
import SolutionLayout from "../components/ui/Layouts/SolutionLayout";

// AppProps['Component'] is the type Next.js provides for the `Component` prop inside `_app.tsx`.  
// It is basically `React.ComponentType` but enhanced with Next.js page typings (e.g., NextPage).  
// You *could* use that directly to define a custom page type with `getLayout`, but it is more generic.  
// Instead, we use `NextPage<P>` as the base so we keep strong typing for props and page-specific types.  
//
// Difference in practice:
// - Using `AppProps['Component']` → ties directly to Next’s internal typing of `Component`, 
//   but allows `getLayout` to accept any ReactNode (strings, numbers, fragments, etc.).
// - Using `NextPage<P>` → explicitly models a Next.js page component with props, 
//   and when combined with `getLayout: (page: ReactElement) => ReactNode`, 
//   it enforces that `page` must be a JSX element (<Component />).
//
// This stricter approach is better for per-page layouts because you *always* pass a JSX element from `_app.tsx`:  
//     <Component {...pageProps} />  
// So ReactElement is a more accurate type than ReactNode for the `page` parameter.
    // getLayout is a function we attach to a page component that returns that page wrapped by a layout component.
    // `_app.tsx` checks `Component.getLayout`. If present, it calls it and renders the returned tree.  
    // If not, it falls back to a default (or just renders the page directly).
    //
    // By extending NextPage with this optional `getLayout`, we let TypeScript know 
    // that pages *may* define a custom layout while still being valid Next.js pages.
    //
    // Function signature:
    // - Argument: ReactElement (the rendered JSX for the page, e.g. <Component {...pageProps} />).  
    // - Return: ReactNode (the wrapped page inside any layout you choose).  
    // Why ReactElement for the arg? It ensures the "page" is a JSX element, not a primitive like string/number.  
// export type NextPageWithLayout = AppProps['Component'] & {
export type NextPageWithLayout<P = {}> = NextPage<P> & {
    getLayout?: (page: ReactElement) => ReactNode;
};


/**
 * AppPropsWithLayout
 * 
 * By default, Next.js gives `_app.tsx` the type `AppProps`, which looks like:
 *   { Component: NextPage, pageProps: any }
 * 
 * However, since we extended `NextPage` with an optional `getLayout` function 
 * (`NextPageWithLayout`), we need to tell TypeScript that `Component` may now 
 * carry that `getLayout` property.
 * 
 * Why this matters:
 * - Without this type, `_app.tsx` won’t know that `Component.getLayout` might exist,
 *   and TypeScript will complain when you try to use it.
 * - With this type, `_app.tsx` can safely check for `getLayout` and call it if present.
 * 
 * Flow:
 * - Each page (`NextPageWithLayout`) may define `getLayout?: (page: ReactElement) => ReactNode`.
 * - `_app.tsx` receives the page through `AppPropsWithLayout`.
 * - `_app.tsx` checks `Component.getLayout`. If defined, wraps the page in its layout.
 *   If not, it just renders the page as-is.
 */
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};


/**
 * Application Entry Point
 *
 * This file acts as the root component for all Next.js pages.
 * It allows injecting global providers (e.g., Redux, Context, Theme, i18n),
 * and wraps every page with shared layouts if required.
 *
 * @param {AppProps} props - The properties injected by Next.js,
 * including the `Component` for the current route and `pageProps` for its data.
 * @returns {JSX.Element} The wrapped application page.
 */
/* { Component, pageProps } is an object destructuring in JavaScript. Normally, _app.tsx receives a single argument: props: AppPropsWithLayout
    Instead of writing: "function ElPazar(props: AppPropsWithLayout) {", we destructure it inline: "function ElPazar({ Component, pageProps }: AppPropsWithLayout) { ... }"

*/
function ElPazar({ Component, pageProps }: AppPropsWithLayout) {
    // const getLayout = (Component as any).getLayout || ((page: JSX.Element) => page);
    // (Component as any) is just TypeScript casting. Otherwise, TS may complain that getLayout doesn’t exist on type Component.
    const getLayout = Component.getLayout ?? ((page) => page);

    const pageTitle = (pageProps as any).pageTitle ?? "El Pazar Global co.";
    const pageDescription = (pageProps as any).pageDescription ?? "El Pazar Global Co.";
    const pageKeywords = (pageProps as any).pageKeywords ?? "Interantional Trading, Import, Export, EXIM";


    return (
        <ReduxProvider store={store}>
            <Head>
                {/* Meta Tags */}
                <meta charSet="UTF-8" />
                <meta content="width=device-width, initial-scale=1.0" name="viewport" />
                <meta name="author" content="El Pazar Global Co." />
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content={pageKeywords} />
                <meta name="robots" content="index, follow" />

                {/* Title */}
                <title>{pageTitle}</title>

                {/* Schema Markup Links */}
                <link rel="canonical" href="https://elpazar.com" />
                <link rel="alternate" hrefLang="en" href="https://business-niche.com/?lang=en" />
                <link rel="alternate" hrefLang="ar" href="https://business-niche.com/?lang=ar" />

                {/* Favicons */}
                {/* iPad Pro with high-resolution Retina display: */}
                <link
                    rel="apple-touch-icon"
                    sizes="167x167"
                    href="./favicon.ico"
                />
                {/* 3x resolution iPhone: */}
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="./favicon.ico"
                />
                {/* non-Retina iPad, iPad mini, etc.: */}
                <link
                    rel="apple-touch-icon"
                    sizes="152x152"
                    href="./favicon.ico"
                />
                {/* 2x resolution iPhone and other devices: */}
                <link rel="apple-touch-icon" href="./favicon.ico" />
                <link href="./favicon.ico" rel="icon" type="image/png" sizes="48x48" title="IT Services - Business Services | Business Niche" />
                <link href="./favicon.ico" rel="apple-touch-icon" sizes="180x180" title="Information Technology - Business Analytics | Business Niche" />

                {/* Google Fonts */}
                
                {/* Main CSS File */}

                {/* Vendor CSS Files */}

                {/* Google Console */}



                {/*JSON-LD File*/}


                {/* Open Graph Tags */}
                <meta property="og:title" content="Turkish Aesthetica" />
                <meta property="og:description" content="Best provider or aesthetic operations, beauty, cosmetic, medical operations, hair transplant in Istanbul Turkey | Turkish Aesthetica" />
                <meta property="og:image" content="https://turkishaesthetica.com/assets/img/logo.png" />
                <meta property="og:url" content="https://turkishaesthetica.com/index.php" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Turkish Aesthetica" />
                <meta property="og:video" content="https://turkishaesthetica.com/assets/img/video.mp4" />
                {/*
                    <meta property="og:locale" content="en_US">
                    <meta property="og:audio" content="">
                */}

                {/* Twitter Card Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="summary_large_image" />
                <meta name="twitter:title" content="Turkish Aesthetica" />
                <meta name="twitter:description" content="Best provider or aesthetic operations, beauty, cosmetic, medical operations, hair transplant in Istanbul Turkey | Turkish Aesthetica" />
                <meta name="twitter:image" content="https://turkishaesthetica.com/assets/img/logo.png" />
                {/* Author and Copyright */}
                <meta name="author" content="Business Niche" />
                <meta name="copyright" content="© 2024 Turkish Aesthetica. All Rights Reserved." />

                {/* Preconnect to Required Origins */}
                <link rel="preconnect" href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Roboto:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" />
                
            </Head>
            {getLayout(<Component {...pageProps} />)}
        </ReduxProvider>
    );
};

export default appWithTranslation(ElPazar);