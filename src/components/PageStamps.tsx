import React from 'react';
import { PostalStamp } from './PostalStamp';

export const PageStamps: React.FC = () => {
  return (
    <>
      {/* 1. HERO SECTION STAMP — Stuck near the bottom parchment border */}
      <div 
        className="page-stuck-stamp hero-corner-stamp"
        style={{
          position: 'absolute',
          bottom: '28px',
          right: '48px',
          zIndex: 8,
        }}
      >
        <PostalStamp
          src="/assets/stamps/stamp-train.png"
          alt="1906 India Railway Postage"
          rotate={-5}
          width={76}
        />
      </div>
    </>
  );
};
