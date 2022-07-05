import React from 'react';
import VideoItem from './video-item';
import {SimpleGrid} from '@chakra-ui/react';
import {graphql, useStaticQuery} from 'gatsby';

export default function RandomVids() {
  const data = useStaticQuery(
    graphql`
      query related {
        videos: contentfulVideoList {
          videoItem {
            id
            releaseYear
            title
            slugs
            coverArt {
              fluid(maxWidth: 960) {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
    `
  );
  // Shuffle array
  const shuffled = data.videos.videoItem.sort(() => 0.5 - Math.random());
  // Get sub-array of first n elements after shuffled
  const selected = shuffled.slice(0, 4);
  return (
    <>
      <SimpleGrid w="100%" columns={['2', '2', '3', '4']} spacing={5}>
        {selected.map((video, index) => {
          return <VideoItem key={index} data={video} />;
        })}
      </SimpleGrid>
    </>
  );
}
