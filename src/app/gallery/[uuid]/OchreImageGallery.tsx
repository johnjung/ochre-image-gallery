"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import loadingSpinner from "../../../../public/loading-spinner.svg";
import OchreImageGalleryThumbnail from "./OchreImageGalleryThumbnail";

export default function OchreImageGallery(props: {
  className: string;
  resultsPageInitial: string;
  resultsPageInput: boolean;
  resultsPerPageInitial: number;
  resultsPerPageInput: boolean;
  resultsPerPageOptions: number[];
  showLabels: boolean;
  showLabelsInput: boolean;
  uuid: string;
}) {
  const {
    className,
    resultsPageInitial,
    resultsPageInput,
    resultsPerPageInput,
    resultsPerPageOptions,
    resultsPerPageInitial,
    showLabels,
    showLabelsInput,
    uuid,
  } = props;

  const router = useRouter();

  const [resultsPageState, setResultsPageState] = useState(
    parseInt(resultsPageInitial),
  );
  const [resultsPerPageState, setResultsPerPageState] = useState(
    parseInt(resultsPerPageInitial),
  );
  const [data, setData] = useState({
    ochre: { tree: { items: { resource: [] } } },
  });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://ochre.lib.uchicago.edu/ochre?uuid=${uuid}&format=json`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    router.push(
      `/gallery/${uuid}/?page=${resultsPageState}&per_page=${resultsPerPageState}`,
      { scroll: false },
    );
  }, [resultsPageState, resultsPerPageState]);

  const updateResultsPageState = (event) => {
    event.preventDefault();
    setResultsPageState(parseInt(event.target.value));
  };

  const updateResultsPerPageState = (event) => {
    event.preventDefault();
    setResultsPerPageState(parseInt(event.target.value));
    setResultsPageState(1);
  };

  const count = data.ochre.tree.items.resource.length;
  let resultsPageElements = [];
  if (resultsPageInput) {
    const maxPage = Math.ceil(count / resultsPerPageState);
    let minPageLink = resultsPageState - 2;
    if (minPageLink < 1) {
      minPageLink = 1;
    }
    let maxPageLink = minPageLink + 4;
    if (maxPageLink > maxPage) {
      maxPageLink = maxPage;
    }
    if (resultsPageState > 1) {
      resultsPageElements.push(
        <span key={`results-page-elements-previous}`}>
          <button value={resultsPageState - 1} onClick={updateResultsPageState}>
            &lt;
          </button>
        </span>,
      );
    }
    for (let p = minPageLink; p <= maxPageLink; p++) {
      if (p == resultsPageState) {
        resultsPageElements.push(
          <span className="current" key={`results-page-elements-${p - 1}`}>
            {p}
          </span>,
        );
      } else {
        resultsPageElements.push(
          <span key={`results-page-elements-${p - 1}`}>
            <button value={p} onClick={updateResultsPageState}>
              {p}
            </button>
          </span>,
        );
      }
    }
    if (resultsPageState < maxPage) {
      resultsPageElements.push(
        <span key={`results-page-elements-next}`}>
          <button value={resultsPageState + 1} onClick={updateResultsPageState}>
            &gt;
          </button>
        </span>,
      );
    }
  }
  let resultsPerPageElements = [];
  if (resultsPerPageInput) {
    resultsPerPageElements = resultsPerPageOptions.map((p, i) => {
      if (p == resultsPerPageState) {
        return (
          <span className="current" key={`pagination-number-of-results-${i}`}>
            {p}
          </span>
        );
      } else {
        return (
          <span key={`pagination-number-of-results-${i}`}>
            <button value={p} onClick={updateResultsPerPageState}>
              {p}
            </button>
          </span>
        );
      }
    });
  }

  if (isLoading) {
    return (
      <div className="text-center">
        <Image
          className="w-8 h-8 inline"
          src={loadingSpinner}
          width={32}
          height={32}
          alt="loading"
        />
      </div>
    );
  } else if (!data) {
    return <p>Data error.</p>;
  } else {
    const resource = data.ochre.tree.items.resource;
    const slice = resource.slice(
      (resultsPageState - 1) * resultsPerPageState,
      resultsPageState * resultsPerPageState,
    );
    return (
      <div className={className}>
        <div className="ochre-image-gallery">
          {slice.map((r) => {
            return (
              <OchreImageGalleryThumbnail
                key={r.uuid}
                uuid={r.uuid}
                showLabels={showLabels}
              />
            );
          })}
        </div>

        {resultsPageInput && (
          <div className="ochre-pagination-links">{resultsPageElements}</div>
        )}

        {resultsPerPageInput && (
          <form className="ochre-pagination-links">
            <span>Results Per Page:</span>
            {resultsPerPageElements}
          </form>
        )}
      </div>
    );
  }
}
