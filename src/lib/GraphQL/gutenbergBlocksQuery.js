const content = `... on CoreHeadingBlock {
            saveContent
          }
          ... on CoreVerseBlock {
        attributes {
          content
          textAlign
        }
        saveContent
      }
          ... on GravityformsFormBlock {
            attributes {
              __typename
              ... on GravityformsFormBlockAttributes {
                formId
              }
            }
          }
      ... on CoreEmbedInstagramBlock {
                saveContent
                attributes {
                  url
                }
      }
            ... on CoreEmbedVimeoBlock {
        saveContent
        attributes {
          url
          className
          allowResponsive
          caption
        }
      }
       ... on CoreEmbedTwitterBlock {
       saveContent
        attributes {
          url
          type
          className
        }
      }
      ... on CoreEmbedFacebookBlock {
        attributes {
          url
          className
          type
          caption
          allowResponsive
        }
      }
          ... on CoreParagraphBlock {
          saveContent
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
            height
            align
            alt
            caption
            className
            href
            id
            linkClass
            linkDestination
            linkTarget
            rel
            sizeSlug
            title
            url

          }
            imageAttributes: attributes {
              align
              alt
              className
              caption
              height
              width
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
        ... on CoreButtonBlock {
          attributes {
              text
              url
              title
              placeholder
              color
              className
              borderRadius
              backgroundColor
              align
              linkTarget
              textColor
            }
        }
      ... on CoreButtonsBlock {
          saveContent
          innerBlocks {
            name
            ... on CoreButtonBlock {
              parentId
              attributes {
                align
                backgroundColor
                borderRadius
                className
                color
                customBackgroundColor
                customTextColor
                customGradient
                gradient
                linkTarget
                placeholder
                rel
                text
                textColor
                title
                url
              }
            }
          }
        }
      ... on CorePullquoteBlock {
            parentId
            originalContent
          }
      ... on CoreCalendarBlock {
            renderedContent
          }
      ... on CoreTagCloudBlock {
            renderedContent
            attributes {
              align
              className
            }
          }
          ... on CoreSearchBlock {
            renderedContent
            attributes {
              className
            }
          }
          ... on CoreLatestPostsBlock {
            attributes {
              className
            }
            renderedContent
          }
          ... on CoreLatestCommentsBlock {
            parentId
            attributes {
              className
            }
            renderedContent
          }
          ... on CoreCategoriesBlock {
            renderedContent
            attributes {
              className
            }
          }
          ... on CoreCodeBlock {
            attributes {
              className
            }
            saveContent
          }
          ... on CoreFreeformBlock {
            saveContent
          }
          ... on CoreMoreBlock {
            saveContent
          }
          ... on CoreSeparatorBlock {
            saveContent
            originalContent
          }
          ... on CoreSpacerBlock {
            saveContent
          }
          ... on CoreNextpageBlock {
            saveContent
          }`;

const gutenbergBlocksQuery = `blocks {
          __typename
          ${content}
         ... on CoreCoverBlock {
         originalContent
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
              ${content}
            }
          }
         ... on CoreMediaTextBlock {
            attributes {
              backgroundColor
              className
              customBackgroundColor
              focalPoint
              mediaId
              mediaLink
              mediaPosition
              mediaUrl
              mediaWidth
              verticalAlignment
            }
            innerBlocks {
              ${content}
        }
      }
          ... on CoreColumnsBlock {
            attributes {
              ... on CoreColumnsBlockAttributes {
                textColor
              }
              backgroundColor
            }
            innerBlocks {
              ... on CoreColumnBlock {
                attributes {
                  columnWidth: width
                }
                innerBlocks {
                  __typename
                  ${content}
                }
              }
            }
          }
      }`;

export default gutenbergBlocksQuery;
