const gutenbergBlocksQuery = `blocks {
          __typename
          ... on CoreHeadingBlock {
            attributes {
              __typename
              ... on CoreHeadingBlockAttributes {
                align
                anchor
                className
                content
                customTextColor
                level
                placeholder
                textColor
              }
            }
          }
          ... on CoreParagraphBlock {
            attributes {
              __typename
              ... on CoreParagraphBlockAttributesV3 {
                fontSize
                content
                align
                backgroundColor
                className
                customBackgroundColor
                customFontSize
                customTextColor
                direction
                dropCap
                placeholder
                textColor
                width
              }
            }
          }
          ... on CoreImageBlock {
            attributes {
              align
              alt
              className
              caption
              height
              href
              id
              linkClass
              linkDestination
              linkTarget
              rel
              url
              sizeSlug
            }
          }
          ... on CoreEmbedYoutubeBlock {
            attributes {
              align
              allowResponsive
              caption
              className
              providerNameSlug
              url
              type
            }
          }
          ... on CoreEmbedSoundcloudBlock {
            attributes {
              align
              allowResponsive
              caption
              className
              providerNameSlug
              type
              url
            }
          }
        }`;

export default gutenbergBlocksQuery;