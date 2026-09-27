import React from 'react';

export interface PostalStampProps {
  src: string;
  alt: string;
  rotate?: number;
  width?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const PostalStamp: React.FC<PostalStampProps> = ({
  src,
  alt,
  rotate = 0,
  width = 65,
  className = '',
  style = {},
}) => {
  return (
    <div
      className={`pasted-postal-stamp ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        width: `${width}px`,
        ...style,
      }}
      aria-hidden="true"
    >
      <img
        src={src}
        alt={alt}
        className="postal-stamp-img"
        loading="lazy"
        draggable={false}
      />
    </div>
  );
};
