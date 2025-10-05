import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import { languageDirection } from '../utils/languageDirection';

class MyDocument extends Document<{ locale: string }> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps & { locale: string }> {
    const initialProps = await Document.getInitialProps(ctx);
    const locale = ctx.locale || 'en';
    return { ...initialProps, locale };
  }

  render() {
    const { locale } = this.props;
    const dir = languageDirection[locale] || 'ltr';

    return (
      <Html lang={locale} dir={dir}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
