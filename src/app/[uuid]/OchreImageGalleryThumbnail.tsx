"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import loadingSpinner from "../../../public/loading-spinner.svg";

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
            {isLoading && <Image src={loadingSpinner} alt="loading" /> }
            {data && <Image src={`https://ochre.lib.uchicago.edu/ochre?uuid=${uuid}&preview`} width={500} height={500} priority={true} alt={uuid} onLoad={updateLoading} />}
          </div>
        </div>
        {showLabels && data && <p>{data.ochre.resource.identification.label.content}</p>}
      </>
    );
  };

  console.log(loadingSpinner);

  return (
    <div className="ochre-image-gallery-thumbnail">
      {data ? (<a href={`https://ochre.lib.uchicago.edu/ochre?uuid=${uuid}`}>{ renderThumbnailAndLabel() }</a>) : renderThumbnailAndLabel()}
    </div>
  );
}
/* {isLoading && <LoadingSpinner />} */