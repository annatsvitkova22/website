import gutenbergBlocksQuery from '~/lib/GraphQL/gutenbergBlocksQuery';

export const commentsQuery = `commentCount
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
      }`;

const singleContentCommon = `${gutenbergBlocksQuery}
      title
      date
      excerpt
      content
      slug
      categories {
        nodes {
          id
          name
          link
          slug
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
      statisticsACF {
        likes
        views
      }
      ${commentsQuery}
      author {
        nicename
        lastName
        firstName
        nickname
        username
        name
        userAdditionalACF {
          avatar {
            mediaItemUrl
          }
        }
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
