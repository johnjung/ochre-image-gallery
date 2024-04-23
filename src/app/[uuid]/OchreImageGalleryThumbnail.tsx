"use client";

import React, { useEffect, useState } from "react";

export default function OchreImageGalleryThumbnail(props: { showLabels: boolean, uuid: string }) {
  const { showLabels, uuid } = props;

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://ochre.lib.uchicago.edu/ochre?uuid=${uuid}&format=json`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false)
    })
  }, []);

  if (isLoading) {
    return (
      <div className="ochre-image-gallery-thumbnail">
        <div className="ochre-image-gallery-thumbnail-image-wrapper"/>
        <div>Loading...</div>
      </div>
    );
  } else if (!data) {
    return (
      <div className="ochre-image-gallery-thumbnail">
        <div className="ochre-image-gallery-thumbnail-image-wrapper"/>
        <div>Data error.</div>
      </div>
    );
  } else {
    return (
      <div className="ochre-image-gallery-thumbnail">
        <a href={`https://ochre.lib.uchicago.edu/ochre?uuid=${uuid}`}>
          <div className="ochre-image-gallery-thumbnail-image-wrapper">
            <img src={`https://ochre.lib.uchicago.edu/ochre?uuid=${uuid}&preview`} />
          </div>
          { showLabels && <p>{data.ochre.resource.identification.label.content}</p> }
        </a>
      </div>
    );
  }
}
