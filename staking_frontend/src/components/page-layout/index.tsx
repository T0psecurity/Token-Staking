import { Container, ContainerProps } from '@chakra-ui/react';
import { motion, Variants } from 'framer-motion';
import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';

const variants: Variants = {
  hidden: {
    opacity: 0,
    x: 0,
    y: -40,
    transition: { duration: 0.4, type: 'easeOut' },
  },
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.4, type: 'easeOut' },
  },
  exit: {
    opacity: 0,
    x: -0,
    y: 40,
    transition: { duration: 0.4, type: 'easeOut' },
  },
};

type PageProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

const MotionContainer = motion<ContainerProps>(Container);

const PageLayout = ({ title, description, children }: PageProps) => {
  return (
    <>
      <NextSeo
        title={title + ' | Armor AI Staking'}
        description={description}
        twitter={{
          cardType: 'summary_large_image',
          handle: '',
        }}
        openGraph={{
          url: 'application demo link goes here',
          title: title + ' | Armor AI Staking',
          description: description,
          locale: 'en_US',
          images: [
            {
              url: '',
              width: 1200,
              height: 630,
              alt: 'Nithin Mengani',
              type: '',
            },
          ],
        }}
      />
      <MotionContainer
        display='flex'
        maxW='container.lg'
        minH={{ base: 'auto', md: '100vh' }}
        initial='hidden'
        animate='enter'
        exit='exit'
        variants={variants}
        centerContent
        minW={'90%'}
      >
        {children}
      </MotionContainer>
    </>
  );
};

export default PageLayout;
