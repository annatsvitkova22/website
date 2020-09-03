import React from 'react';
import { useRouter } from 'next/router';

const BrandedHeader = ({ post }) => {
  const router = useRouter();

  if (router.query.slug !== post.slug) return null;

  return (
    <>
      {post.zmBrandedPublication &&
        post.zmBrandedPublication.logo &&
        post.zmBrandedPublication.logo.mediaItemUrl && (
          <div className="branded-header">
            <img
              src={post.zmBrandedPublication.logo.mediaItemUrl}
              alt={post.zmBrandedPublication.logo.title}
            />
          </div>
        )}
    </>
  );
};

export default BrandedHeader;
