import BackgrounImg from '../assets/round.png';
import FeaturedItem from './featured-item';
import React from 'react';
import {Box, Divider} from '@chakra-ui/react';
import {graphql, useStaticQuery} from 'gatsby';

export default function FeaturedVideo() {
  const data = useStaticQuery(
    graphql`
      query featureQuery {
        video: contentfulFeaturedList {
          featuredVideo {
            id
            releaseYear
            videoType
            releaseYear
            directors
            title
            chapters
            slugs
            coverArt {
              fluid(quality: 65, maxWidth: 1250) {
                ...GatsbyContentfulFluid
              }
            }
            videoDescription {
              videoDescription
            }
          }
        }
      }
    `
  );
  const vidArr = [];
  vidArr.push(data.video.featuredVideo);

  return (
    <>
      <Box
        display="inline-flex"
        w="100%"
        backgroundImage={`url(${BackgrounImg})`}
        p="25px 0px"
        marginTop={['200px', '200px', '100px', '100px']}
      >
        {vidArr.map((video, index) => {
          return <FeaturedItem key={index} data={video} />;
        })}
      </Box>
      <Divider marginBottom="25px" />
    </>
  );
}
