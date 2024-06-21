"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import loadingSpinner from "../../../../public/loading-spinner.svg";

export default function OchreImageGalleryThumbnail(props: {
  showLabels: boolean;
  title: string;
  uuid: string;
}) {
  const { showLabels, title, uuid } = props;

  const [isLoading, setLoading] = useState(true);

  const updateLoading = () => {
    setLoading(false);
  };

  const renderThumbnailAndLabel = () => {
    return (
      <>
        <div className={`ochre-image-gallery-thumbnail-image-wrapper ${isLoading ? 'loading' : ''}`}>
          <Image
            className="w-8 h-8 inline spinner"
            src={loadingSpinner}
            width={32}
            height={32}
            alt="loading"
          />
          <img
            className="thumbnail"
            src={`https://ochre.lib.uchicago.edu/ochre?uuid=${uuid}&preview`}
            priority={true}
            alt={title}
            onLoad={() => updateLoading()}
          />
        </div>
        <p>{title}</p>
      </>
    );
  };

  return (
    <div className="ochre-image-gallery-thumbnail">
      <a href={`https://ochre.lib.uchicago.edu/ochre?uuid=${uuid}`}>
        {renderThumbnailAndLabel()}
      </a>
    </div>
  );
}
