import Favicon from '../assets/favicon.webp';
import FeaturedVideo from '../components/featured-video';
import Header from '../components/header';
import OgImage from '../assets/ogImage.jpg';
import React from 'react';
import Videos from '../components/videos';
import {Box, Flex} from '@chakra-ui/react';
import {Helmet} from 'react-helmet';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>Primitive Video Archive</title>
        <meta
          name="description"
          content="An archive of Primitive videos throughout the years!"
        />
        <meta property="og:image" content={OgImage} />
        <link rel="shortcut icon" href={Favicon} />
      </Helmet>
      <Header variant="outline" />
      <Flex
        width="100%"
        flexDirection="column"
        as="main"
        padding="0px"
        justifyContent="center"
      >
        <FeaturedVideo />

        <Box padding="0px 25px 50px 25px ">
          <Videos />
        </Box>
      </Flex>
    </>
  );
}
