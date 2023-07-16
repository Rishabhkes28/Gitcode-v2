import '@/src/styles/globals.css';

import { ThemeProvider } from 'next-themes';

import { Source_Code_Pro } from 'next/font/google';

import Navbar from '@/components/ui/navbar';

const sourceCodePro = Source_Code_Pro({
  weight: '400',
  subsets: ['latin'],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={sourceCodePro.className}>
      <ThemeProvider defaultTheme="light">
        <div className="bg-white dark:bg-black">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </main>
  );
}
