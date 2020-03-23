import React from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const MENU = gql`
  query Menu($id: ID!) {
    menu(id: $id) {
      menuItems {
        edges {
          node {
            id
            menuItemId
            title
            url
            connectedObject {
              __typename
            }
            cssClasses
            description
            label
            linkRelationship
            target
          }
        }
        nodes {
          id
          menuItemId
          title
          url
          connectedObject {
            __typename
          }
          cssClasses
          description
          label
          linkRelationship
          target
        }
      }
    }
  }
`;

const Navigation = (props) => {
  const { menuId } = props;
  const { loading, data } = useQuery(MENU, {
    variables: { id: menuId },
  });

  if (loading) return null;

  return (
    <nav>
      <ul>
        {data.menu &&
          data.menu.menuItems &&
          data.menu.menuItems.nodes.map((item) => {
            return console.log(item);
            return (
              <li key={item.id}>
                <Link href={item.url}>
                  <a target={item.target} href={item.url}>
                    {item.label}
                  </a>
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

export default Navigation;
