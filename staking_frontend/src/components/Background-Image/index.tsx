import { Box } from '@chakra-ui/react';
export const BackgroundImage = () => {
    return (
      <Box
        // bgImage="background-logo.png, linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))"  // Replace with the path to your image
        // bgPosition="center"
        // bgRepeat="no-repeat"
        // bgSize="350px"
        // position="fixed"
        // top={'20'}
        // left={0}
        // right={0}
        // bottom={0}
        // zIndex={-1}
        position="fixed"
        bgImage= "background-image.png"
        // opacity= "0.3"
        backgroundSize= "cover"
        backgroundPosition= "center"
        backgroundRepeat="no-repeat"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={-1}
        // _before={{
        //     content: '""',
        //     position: "absolute",
        //     top: 0,
        //     left: 0,
        //     right: 0,
        //     bottom: 0,
        //     backgroundImage: `background-image.png`,
        //     opacity: 0.3, // Adjust the opacity value as per your preference
        //     backgroundSize: "cover",
        //     backgroundPosition: "center",
        //     backgroundRepeat: "no-repeat",
        // }}
      />
    );
  };
  