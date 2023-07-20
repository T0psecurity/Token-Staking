import PageLayout from '@/components/page-layout';
import { Stack, VStack, Text, Box, Heading, Avatar } from '@chakra-ui/react';
import { BackgroundImage } from '@/components/Background-Image';
import PoolCards from '@/components/PoolCards.tsx';


const IndexPage = () => {

  return (
    <>
      <PageLayout
        title='Home'
        description='Discover a starter kit which includes Next.js, Chakra-UI, Framer-Motion in Typescript. You have few components, Internationalization, SEO and more in this template ! Enjoy coding.'
      >
        <Box>
          <BackgroundImage />
          <VStack paddingTop={'20'} spacing={12} width={'100%'} minH='fit-content'>
            <VStack>
             <Avatar
                size={'xl'}
                src={
                    'background-logo.png'
                }
                mb={4}
                pos={'relative'}
              />
              <Heading fontSize={'3xl'} fontFamily={'body'} alignContent={'center'} justifyContent={'center'}>
              ARMOR STAKING
            </Heading>
            </VStack>
            <PoolCards />
          </VStack>
        </Box>
      </PageLayout>
    </>
  );
};

export default IndexPage;
