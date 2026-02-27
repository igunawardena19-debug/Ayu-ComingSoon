import React from 'react';

interface ImageSectionProps {
  leftImageSrc: string;
  rightImageSrc: string;
  leftImageAlt?: string;
  rightImageAlt?: string;
}

export const ImageSection: React.FC<ImageSectionProps> = ({
  leftImageSrc,
  rightImageSrc,
  leftImageAlt = "",
  rightImageAlt = ""
}) => {
  return (
    <section className="flex h-full justify-between items-start w-full relative max-md:h-auto max-md:flex-col max-sm:h-auto">
      <img
        src={leftImageSrc}
        alt={leftImageAlt}
        className="w-6/12 h-full object-cover object-[center_15%] max-md:w-full max-md:h-[400px] max-sm:h-[300px]"
      />
      <img
        src={rightImageSrc}
        alt={rightImageAlt}
        className="w-6/12 h-full object-cover object-[center_15%] max-md:w-full max-md:h-[400px] max-sm:h-[300px]"
      />
    </section>
  );
};
