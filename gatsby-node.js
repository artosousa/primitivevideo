exports.createPages = async ({graphql, actions}) => {
  const result = await graphql(
    `
      {
        allContentfulVideo {
          nodes {
            slugs
            id
          }
        }
      }
    `
  );

  result.data.allContentfulVideo.nodes.forEach(async post => {
    actions.createPage({
      path: `/video/${post.slugs}/`,
      component: require.resolve('./src/templates/video-page'),
      context: {
        id: post.id
      }
    });
  });
};
