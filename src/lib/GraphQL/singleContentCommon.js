import gutenbergBlocksQuery from '~/lib/GraphQL/gutenbergBlocksQuery';

const singleContentCommon = `${gutenbergBlocksQuery}
      title
      date
      categories {
        nodes {
          id
          name
          link
        }
      }
      tags {
        nodes {
          id
          name
          link
        }
      }
      id
      postId
      commentCount
      comments {
        nodes {
          author {
            ... on CommentAuthor {
              id
              name
            }
          }
          content
          commentId
          date
          commentACF {
            likes
          }
        }
      }
      author {
        nicename
        lastName
        firstName
        nickname
        username
        name
      }
      featuredImage {
        id
        mediaItemUrl
        caption
        title
        author {
          name
          description
        }
      }`;

export default singleContentCommon;
