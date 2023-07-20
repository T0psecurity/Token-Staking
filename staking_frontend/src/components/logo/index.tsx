import { chakra, ChakraStyledOptions, useColorMode } from '@chakra-ui/react';
import NextImage from 'next/image';
const options: ChakraStyledOptions = {
  baseStyle: {
    borderRadius: 'lg',
    boxShadow: 'm',
  },
  shouldForwardProp: (prop) => ['src', 'alt', 'width', 'height'].includes(prop),
};
const Logo = chakra(NextImage, options);
interface LogoProps {
  width: number;
  height: number;
}
export default function ({ width, height }: LogoProps) {
  const { colorMode } = useColorMode();
  return (
    <Logo
      src={
        colorMode == 'light'
          ? ''
          : ''
      }
      alt='Armor Staking Logo'
      width={width}
      height={height}
    />
  );
}
