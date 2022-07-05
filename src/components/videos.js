import React from 'react';
import VideoItem from './video-item';
import {SimpleGrid} from '@chakra-ui/react';
import {graphql, useStaticQuery} from 'gatsby';

export default function Videos() {
  const data = useStaticQuery(
    graphql`
      query VideosQuery {
        videos: contentfulVideoList {
          videoItem {
            id
            releaseYear
            title
            slugs
            coverArt {
              fluid(quality: 65, maxWidth: 400) {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
    `
  );
  return (
    <>
      <SimpleGrid w="100%" columns={['2', '2', '3', '4']} spacing={5}>
        {data.videos.videoItem.map((video, index) => {
          return <VideoItem key={index} data={video} />;
        })}
      </SimpleGrid>
    </>
  );
}
