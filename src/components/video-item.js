import Img from 'gatsby-image';
import React from 'react';
import propTypes from 'prop-types';
import {Box, Flex, Link, Text} from '@chakra-ui/react';

const VideoItem = props => {
  const {data} = props;
  return (
    <>
      <Flex flexGrow="1" role="region" aria-labelledby={`video-${data.id}`}>
        <Link
          _hover={{textDecoration: 'none'}}
          role="link"
          href={`/video/${data.slugs}`}
          display="inline-flex"
          width="100%"
          textTransform="uppercase"
        >
          <Box fontFamily="Oswald" pos="relative" width="100%">
            <Box opacity="0.7" _hover={{opacity: '1'}} width="100%">
              <Img fluid={data.coverArt.fluid} key={data.id} alt={data.title} />
            </Box>
            <Text
              as="h1"
              fontSize={['0.8em', '0.9em', '1.3em', '1.3em']}
              fontFamily="Oswald"
              w="100%"
              id={`video-${data.id}`}
            >
              {data.title}
            </Text>
            <Text
              color="#595959"
              textAlign="left"
              w="100%"
              fontFamily="Oswald"
              marginTop={['-4px', '-4px', '-7px', '-7px']}
              marginBottom="4px"
            >
              {data.releaseYear}
            </Text>
          </Box>
        </Link>
      </Flex>
    </>
  );
};

VideoItem.propTypes = {
  data: propTypes.object
};

export default VideoItem;
