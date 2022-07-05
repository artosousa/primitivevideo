import Logo from '../assets/primitive_video.svg';
import React, {useRef, useState} from 'react';
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  List,
  ListItem
} from '@chakra-ui/react';
import {CloseIcon, SearchIcon} from '@chakra-ui/icons';
import {Link as GatsbyLink, graphql, useStaticQuery} from 'gatsby';
import {Index} from 'elasticlunr';

const Header = () => {
  const data = useStaticQuery(graphql`
    query SearchQuery {
      siteSearchIndex {
        index
      }
    }
  `);
  const index = useRef();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const getOrCreateIndex = () =>
    index.current
      ? index.current
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(data.siteSearchIndex.index);

  const clearSearch = () => {
    setResults([]);
    setQuery('');
  };
  const search = evt => {
    const query = evt.target.value;
    index.current = getOrCreateIndex();
    setQuery(query);
    setResults(
      index.current
        .search(query, {expand: true})
        // Map over each ID and return the full document
        .map(({ref}) => index.current.documentStore.getDoc(ref))
    );
  };
  return (
    <>
      <Flex fontFamily="Oswald" as="header">
        <Flex
          minHeight="100px"
          bg="rgba(255,255,255,0.9)"
          pos="fixed"
          borderBottom="1px solid #999"
          w="100%"
          alignItems="center"
          zIndex="1"
          justifyContent="center"
          flexDir="column"
          w="100%"
          paddingBottom={['25px', '25px', '0', '0']}
        >
          <Box
            pos={['relative', 'relative', 'absolute', 'absolute']}
            w={['100%', '100%', '30%', '30%']}
            top={['10px', '10px', 'auto', 'auto']}
            left={['0', '0', '20px', '20px']}
            padding="0px 25px 0px 25px"
          >
            <InputGroup>
              <InputLeftElement
                children={
                  query !== '' ? (
                    <CloseIcon
                      color="gray.300"
                      onClick={clearSearch}
                      value="clear"
                      _hover={{cursor: 'pointer'}}
                    />
                  ) : (
                    <SearchIcon color="gray.300" />
                  )
                }
              />
              <Input
                id="searchVideo"
                background="#fff"
                marginBottom={['20px', '20px', '0', '0']}
                value={query}
                onChange={search}
                aria-label="search video"
                placeholder="Search Videos"
              />
            </InputGroup>
            <Box
              position="absolute"
              width="90%"
              maxHeight="50vh"
              overflowY="scroll"
              overflowX="hidden"
              background="white"
              zIndex="1111"
              borderRadius="5px"
              boxShadow="0 0 2px #999"
            >
              {query !== '' ? (
                <List>
                  {results.map(result => (
                    <ListItem margin="10px" opacity="1" key={result.id}>
                      <Link
                        _hover={{textDecoration: 'underline'}}
                        href={`/video/${result.slugs}`}
                        textTransform="uppercase"
                      >
                        <Flex flexDir="row " alignItems="center">
                          <Flex w="30%">
                            <AspectRatio
                              w="100%"
                              ratio={16 / 9}
                              bgColor="#e9e9e9"
                            >
                              <Image
                                w="100%"
                                src={`https://res.cloudinary.com/primitive-skate/image/fetch/w_200/https:${result.coverArt.file.url}`}
                                key={result.title}
                                alt="search result thumb"
                              />
                            </AspectRatio>
                          </Flex>
                          <Flex
                            marginLeft="10px"
                            w="65%"
                            flexDir="column"
                            alignContent="center"
                          >
                            <Heading
                              as="h1"
                              fontFamily="Oswald"
                              fontSize="1rem"
                              fontWeight="lighter"
                              lineHeight="1.3rem"
                            >
                              {result.title}
                            </Heading>
                            <Heading
                              as="h2"
                              lineHeight="1.2rem"
                              fontFamily="Oswald"
                              fontSize=".9rem"
                              fontWeight="lighter"
                              color="#595959"
                            >
                              {' '}
                              {result.videoType} | Release Date:{' '}
                              {result.releaseYear}
                            </Heading>
                          </Flex>
                        </Flex>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              ) : (
                ''
              )}
            </Box>
          </Box>
          <Link href="/" title="Home">
            <Image
              src={Logo}
              w="200px"
              alignItems="center"
              alt="primitive video library logo"
              title="Primitive Vidoes"
            />
          </Link>
          <Button
            rel="noreferrer"
            pos={['relative', 'relative', 'absolute', 'absolute']}
            target="_blank"
            colorScheme="yellow"
            top={['10px', '10px', 'auto', 'auto']}
            right={['0', '0', '20px', '20px']}
            fontSize="14px"
            textTransform="uppercase"
            fontWeight="normal"
            as={GatsbyLink}
            to="https://primitiveskate.com"
          >
            Shop Primitiveskate.com
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
