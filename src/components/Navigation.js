import React from 'react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const MENU = gql`
  query Menu {
    menus(where: { location: MAIN_MENU }) {
      nodes {
        id
        name
        menuItems {
          nodes {
            id
            label
            cssClasses
            linkRelationship
            menuItemId
            target
            title
            url
            menuItemACF {
              ishighlighted
            }
          }
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
        {data.menus &&
          data.menus.nodes.length &&
          data.menus.nodes[0].menuItems &&
          data.menus.nodes[0].menuItems.nodes.map((item) => {
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
