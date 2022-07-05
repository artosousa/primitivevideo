import React from 'react';
import Tape from '../assets/damagedTape.jpg';
import {Flex, Image, Link, Text} from '@chakra-ui/react';
import {Helmet} from 'react-helmet';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>404 - Primitive Video Archive</title>
        <meta
          name="description"
          content="An archive of Primitive videos throughout the years!"
        />
      </Helmet>
      <Flex>
        <Flex
          bg="#fff"
          alignItems="center"
          flexDir="column"
          w="100%"
          h="100vh"
          justifyContent="center"
        >
          <Text
            fontFamily="Oswald, sans-serif"
            textTransform="uppercase"
            as="h1"
            fontSize="2rem"
            paddingBottom="20px"
          >
            Page not found!
          </Text>
          <Image src={Tape} w="300px" alignItems="center" marginBottom="25px" />

          <Link href="./" fontFamily="Oswald" textTransform="uppercase">
            Take me home
          </Link>
        </Flex>
      </Flex>
    </>
  );
};
export default NotFound;
