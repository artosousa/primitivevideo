import Favicon from '../assets/favicon.webp';
import Header from '../components/header';
import PropTypes from 'prop-types';
import React, {useRef} from 'react';
import ReactPlayer from 'react-player';
import Videos from '../components/videos';
import shuffle from 'lodash/shuffle';

import {
  AspectRatio,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Link,
  List,
  ListItem,
  SimpleGrid,
  Spinner,
  Text
} from '@chakra-ui/react';
import {Link as GatsbyLink, graphql} from 'gatsby';
import {Helmet} from 'react-helmet';
import {gql, useQuery} from '@apollo/client';

const PRODUCT_COUNT = 16;

const LIST_PRODUCTS = gql`
  fragment ProductFragment on Product {
    id
    title
    tags
    onlineStoreUrl
    totalInventory
    availableForSale
    images(first: 10) {
      edges {
        node {
          src
        }
      }
    }
    priceRange {
      maxVariantPrice {
        amount
      }
      minVariantPrice {
        amount
      }
    }
    variants(first: 1) {
      edges {
        node {
          price
        }
      }
    }
  }

  query ListProducts($first: Int!, $query: String!, $hasTags: Boolean!) {
    relevantProducts: products(first: $first, query: $query)
      @include(if: $hasTags) {
      edges {
        node {
          ...ProductFragment
        }
      }
    }
    defaultProducts: products(
      first: $first
      query: "available_for_sale:true AND summer21"
    ) {
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
`;

function VideoProducts({tags}) {
  const hasTags = Array.isArray(tags);
  const {data, loading, error} = useQuery(LIST_PRODUCTS, {
    variables: {
      first: PRODUCT_COUNT,
      query: `available_for_sale:true AND (${
        hasTags ? tags.join(' OR ') : ''
      })`,
      hasTags
    }
  });
  if (loading) {
    return (
      <Flex
        display="inline-flex"
        as="section"
        justifyContent="center"
        alignItems="center"
        w="100%"
        fontFamily="Oswald"
        marginTop="25px"
        paddingBottom="25px"
      >
        <Box as="aside" w={['95%', '95%', '75%', '75%']}>
          <SimpleGrid w="100%" columns={['2', '2', '3', '4']} spacing={5}>
            <Spinner />
          </SimpleGrid>
        </Box>
      </Flex>
    );
  }

  if (error) {
    return <Text color="red.500">{error.message}</Text>;
  }
  const shuffledProducts = shuffle(data.defaultProducts.edges);
  const products = data.relevantProducts
    ? shuffle(data.relevantProducts.edges).concat(shuffledProducts)
    : shuffledProducts;

  return (
    <>
      <Flex
        display="inline-flex"
        as="section"
        justifyContent="center"
        alignItems="center"
        w="100%"
        fontFamily="Oswald"
        marginTop="25px"
        paddingBottom="25px"
      >
        <Box
          as="aside"
          w={['95%', '95%', '75%', '75%']}
          borderBottom="1px solid #999"
          paddingBottom="50px"
        >
          <Text as="h2" marginBottom="5px" fontSize="1.4rem" paddingTop="25px">
            Shop Related Products:
          </Text>
          <SimpleGrid w="100%" columns={['2', '2', '3', '4']} spacing={5}>
            {products.slice(0, 4).map(product => (
              <Flex
                key={product.node.id}
                flexGrow="1"
                role="region"
                aria-label="related-product"
              >
                <Link
                  _hover={{textDecoration: 'none'}}
                  role="link"
                  href={product.node.onlineStoreUrl}
                  display="inline-flex"
                  width="100%"
                  textTransform="uppercase"
                  isExternal
                >
                  <Box fontFamily="Oswald" pos="relative" width="100%">
                    <Box _hover={{textDecoration: 'underline'}} width="100%">
                      <Image
                        src={`${product.node.images.edges[0].node.src}`}
                        key={product.node.id}
                        alt={product.node.title}
                      />
                      <Text
                        as="h1"
                        fontSize={['0.8em', '0.9em', '1.1em', '1.1em']}
                        fontFamily="Oswald"
                        w="100%"
                        id={`product-${product.node.title}`}
                      >
                        {product.node.title}
                      </Text>
                      <Text
                        as="p"
                        fontWeight="lighter"
                        fontSize="18px"
                        color="#666"
                      >
                        ${product.node.variants.edges[0].node.price} USD
                      </Text>
                    </Box>
                  </Box>
                </Link>
              </Flex>
            ))}
          </SimpleGrid>
          <Box display="inline-flex" w="100%" justifyContent="center">
            <Button
              fontWeight="normal"
              textTransform="uppercase"
              as={GatsbyLink}
              to="https://primitiveskate.com"
              background="#333"
              _hover={{background: '#000'}}
              color="#fff"
              marginTop="25px"
              target="_blank"
            >
              Shop All of Primitiveskate.com
            </Button>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

VideoProducts.propTypes = {
  tags: PropTypes.array
};

const VideoPage = props => {
  const {
    title,
    releaseYear,
    coverArt,
    executiveProducers,
    music,
    videoDescription,
    directors,
    filmers,
    chapters,
    videoType,
    artDirector,
    videoUrl,
    videoTags,
    stillPhotography
  } = props.data.contentfulVideo;
  const player = useRef();

  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={videoDescription.videoDescription} />
        <meta property="og:image" content={coverArt.file.url} />
        <link rel="shortcut icon" href={Favicon} />
      </Helmet>
      <Header />
      <Flex
        position="relative"
        w="100%"
        backgroundImage={`url(${coverArt.file.url})`}
        backgroundPosition="center"
        backgroundSize="cover"
      >
        <Flex
          justifyContent="center"
          as="main"
          w="100%"
          fontFamily="Oswald"
          color="#000"
          backgroundColor="#fff"
        >
          <Box
            w={['95%', '95%', '75%', '75%']}
            marginTop={['23vh', '23vh', '15vh', '12vh']}
          >
            <Flex alignItems="center" justify="space-between">
              <Text as="h1" fontSize="2.5rem">
                {title}
              </Text>
              <Button
                fontWeight="normal"
                textTransform="uppercase"
                as={GatsbyLink}
                to="../../"
                background="lightgrey"
              >
                Back to Videos
              </Button>
            </Flex>
            <Divider borderColor="#777" />

            <Text as="p">
              {videoType}
              {releaseYear && ` | Release Date: ${releaseYear}  `}
              {directors &&
                ` | Directed By: ${directors
                  .map(director => director)
                  .join(', ')}`}
            </Text>

            <Divider borderColor="#777" marginBottom="10px" />
            <Box
              w={['100%', '100%', '100%', '75%']}
              float="left"
              paddingTop="8px"
            >
              <AspectRatio ratio={16 / 9} bgColor="#000">
                <ReactPlayer
                  ref={player}
                  width="100%"
                  height="100%"
                  url={videoUrl.videoUrl}
                  playing
                  config={{
                    vimeo: {
                      playerOptions: {
                        controls: true,
                        title: false
                      }
                    },
                    youtube: {
                      playerVars: {
                        controls: 1
                      }
                    }
                  }}
                />
              </AspectRatio>
              <Text marginBottom="25px" marginTop="25px" as="p">
                {videoDescription.videoDescription}
              </Text>

              <List color="#666">
                {artDirector && (
                  <ListItem p="5px" borderBottom="solid 1px #e9e9e9">
                    Art Direction:{' '}
                    {artDirector.map(director => director).join(', ')}
                  </ListItem>
                )}
                {executiveProducers && (
                  <ListItem p="5px" borderBottom="solid 1px #e9e9e9">
                    Executive Producer:{' '}
                    {executiveProducers.map(producer => producer).join(', ')}
                  </ListItem>
                )}
                {stillPhotography && (
                  <ListItem p="5px" borderBottom="solid 1px #e9e9e9">
                    Still Photography:{' '}
                    {stillPhotography
                      .map(photographer => photographer)
                      .join(', ')}
                  </ListItem>
                )}
                {filmers && (
                  <ListItem p="5px" borderBottom="solid 1px #e9e9e9">
                    Filmed By: {filmers.map(filmer => filmer).join(', ')}
                  </ListItem>
                )}
                {music && (
                  <ListItem p="5px" borderBottom="solid 1px #e9e9e9">
                    Music: {music.map(artist => artist).join(', ')}
                  </ListItem>
                )}
              </List>
            </Box>

            <Box
              paddingLeft={['0px', '0px', '0px', '25px']}
              w={['100%', '100%', '100%', '25%']}
              float="right"
            >
              <Text
                as="h2"
                color="#666"
                fontSize="1.2rem"
                borderBottom="solid 1px #e9e9e9"
              >
                Chapters:
              </Text>
              {chapters ? (
                <List>
                  {chapters.map((chapter, index) => {
                    const chapterArr = chapter.split(' - ');
                    const chapterName = chapterArr[0];
                    const chapterTimeStamp = chapterArr[1];
                    const chapterTime = chapterArr[1].split(':');
                    const chapterMins = parseInt(chapterTime[0]);
                    const chapterSecs = parseInt(chapterTime[1]);
                    //get time stamp in seconds
                    const timeInSecs = chapterMins * 60 + chapterSecs;

                    return (
                      <ListItem
                        cursor="pointer"
                        className="timeStamp"
                        key={index}
                        p={['0px', '0px', '5px', '5px']}
                        borderBottom="solid 1px #e9e9e9"
                      >
                        <Button
                          _hover={{textDecoration: 'underline'}}
                          fontWeight="lighter"
                          display="inline-flex"
                          alignItems="center"
                          justifyContent="space-between"
                          width="100%"
                          background="none"
                          onClick={() => {
                            player.current.seekTo(timeInSecs);
                            player.current.play();
                          }}
                        >
                          <Box>{chapterName}</Box>{' '}
                          <Box color="#666">{chapterTimeStamp}</Box>
                        </Button>
                      </ListItem>
                    );
                  })}
                </List>
              ) : (
                <Text>No Chapters </Text>
              )}
            </Box>
          </Box>
        </Flex>
      </Flex>
      <VideoProducts tags={videoTags} />
      <Flex
        display="inline-flex"
        as="section"
        justifyContent="center"
        w="100%"
        fontFamily="Oswald"
        marginTop="25px"
        paddingBottom="25px"
      >
        <Box as="aside" w={['95%', '95%', '75%', '75%']}>
          <Text as="h2" marginBottom="5px" fontSize="1.4rem">
            You May Also Like:
          </Text>
          <Videos />
        </Box>
      </Flex>
    </>
  );
};

VideoPage.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query VideoQuery($id: String!) {
    contentfulVideo(id: {eq: $id}) {
      artDirector
      chapters
      coverArt {
        file {
          url
        }
        title
      }
      title
      releaseYear
      music
      filmers
      executiveProducers
      directors
      stillPhotography
      videoTags
      videoType
      videoDescription {
        videoDescription
      }
      videoUrl {
        videoUrl
      }
      slugs
    }
  }
`;

export default VideoPage;
