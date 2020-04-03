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
            originalContent
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
          ... on CoreListBlock {
            attributes {
              className
              ordered
              values
            }
          }
          ... on CoreQuoteBlock {
            attributes {
              align
              citation
              className
              value
            }
          }
          ... on CoreAudioBlock {
            attributes {
              src
              preload
              loop
              className
              caption
              autoplay
              align
            }
          }
           ... on CoreFileBlock {
            attributes {
              align
              className
              downloadButtonText
              fileName
              href
              showDownloadButton
            }
          }
          ... on CoreGalleryBlock {
            attributes {
              images
              linkTo
              columns
              className
              align
              imageCrop
              caption
            }
          }
          ... on CoreCoverBlock {
            attributes {
              align
              backgroundType
              className
              overlayColor
              title
              url
              minHeight
              dimRatio
            }
            innerBlocks {
              ... on CoreParagraphBlock {
                attributes {
                  ... on CoreParagraphBlockAttributesV3 {
                    align
                    backgroundColor
                    content
                    fontSize
                    direction
                    textColor
                    width
                  }
                }
              }
            }
          }
          ... on CoreArchivesBlock {
          renderedContent
          attributes {
            align
            className
            displayAsDropdown
            showPostCounts
          }
        }
        ... on CoreTableBlock {
          saveContent
            attributes {
              head
              hasFixedLayout
              foot
              className
              body
              backgroundColor
              align
            }
          }
  }`;

export default gutenbergBlocksQuery;
