"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import LoadingSpinner from "@/components/loading-spinner";

export default function OchreImageGalleryThumbnail(props: { showLabels: boolean, uuid: string }) {
  const { showLabels, uuid } = props;

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const updateLoading = () => {
    setLoading(false);
  };

  useEffect(() => {
    fetch(`https://ochre.lib.uchicago.edu/ochre?uuid=${uuid}&format=json`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
    })
  }, []);

  const renderThumbnailAndLabel = () => {
    return (
      <>
        <div className="ochre-image-gallery-thumbnail-image-wrapper">
          <div>
            {isLoading && <LoadingSpinner className="w-8 h-8 fill-black text-gray-200" />}
            {data && <Image src={`https://ochre.lib.uchicago.edu/ochre?uuid=${uuid}&preview`} width={500} height={500} priority={true} alt={uuid} onLoad={updateLoading} />}
          </div>
        </div>
        {showLabels && data && <p>{data.ochre.resource.identification.label.content}</p>}
      </>
    );
  };

  return (
    <div className="ochre-image-gallery-thumbnail">
      {data ? (<a href={`https://ochre.lib.uchicago.edu/ochre?uuid=${uuid}`}>{ renderThumbnailAndLabel() }</a>) : renderThumbnailAndLabel()}
    </div>
  );
}
