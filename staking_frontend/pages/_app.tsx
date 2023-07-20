import Layout from '@/components/layout';
import { ChakraProvider } from '@chakra-ui/react';
// import '@fontsource/josefin-sans/700.css';
import { AppProps } from 'next/app';


const App = ({ Component, pageProps }: AppProps) => {
  return (
      <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </ChakraProvider>
  );
};

export default App;
