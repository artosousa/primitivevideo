import Img from 'gatsby-image';
import React from 'react';
import propTypes from 'prop-types';
import {Box, Button, Flex} from '@chakra-ui/react';
import {Link as GatsbyLink} from 'gatsby';

const FeaturedItem = props => {
  const {data} = props;
  return (
    <>
      <Flex flexGrow="1" justifyContent="center">
        <Box
          fontFamily="Oswald"
          pos="relative"
          width={['95%', '95%', '90%', '65%']}
        >
          <Img
            fluid={data.coverArt.fluid}
            key={data.coverArt.fluid.src}
            alt={data.title}
          />
          <Box
            pos="absolute"
            role="button"
            top="0"
            left="0"
            boxSize="full"
            flexDir="column"
            display="inline-flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box display="inline-flex">
              <Button
                as={GatsbyLink}
                p="0 50px"
                fontWeight="normal"
                colorScheme="yellow"
                to={`/video/${data.slugs}`}
              >
                WATCH NOW
              </Button>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

FeaturedItem.propTypes = {
  data: propTypes.object
};

export default FeaturedItem;
