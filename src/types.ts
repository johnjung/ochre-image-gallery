export type Note = {
  noteNo: number;
  content: Content;
};

export type Content =
  | string
  | number
  | {
      string: string | number;
      title?: string;
      languages?: string;
      lang?: string;
      rend?: string;
      whitespace?: string;
    };

export type Property = {
  label: {
    uuid: string;
    content: Content | Content[];
  };
  value: {
    type: string;
    content: Content | Content[];
  };
};

export interface OchreResource {
  date: string;
  image: {
    publicationDateTime: string;
    content: Content | Content[];
  };
  identification: {
    label:
      | string
      | {
          lang: string;
          content: Content | Content[];
        };
    abbreviation: string;
    iri: string;
    iriPreview: string;
  };
  notes: { note: Note[] };
  publicationDateTime: string;
  context: {
    context: {
      tree: {
        publicationDateTime: string;
        uuid: string;
        n: number;
        content: string;
      };
      project: {
        uuid: string;
        n: number;
        content: string;
      };
      displayPath: string;
    };
    displayPath: string;
  };
  description: string;
  type: string;
  attr: string;
  uuid: string;
  n: number;
  citedBibliography: {
    reference: {
      citationFormatSpan: {
        span: {
          xmlns: string;
          content: string;
        };
      };
      identification: {
        label: {
          content: Content | Content[];
        };
      };
      publicationInfo: {
        endDate: {
          year: number;
        };
        startDate: {
          year: number;
        };
      };
      referenceFormatDiv: {
        div: {
          div: {
            class: string;
            content: string;
          };
          xmlns: string;
          style: string;
          class: string;
        };
      };
      publicationDateTime: string;
      context: {
        context: {
          tree: {
            uuid: string;
            n: number;
            content: string;
          };
          project: {
            uuid: string;
            n: number;
            content: string;
          };
          displayPath: string;
        };
        displayPath: string;
      };
      project: {
        identification: {
          label: {
            content: Content | Content[];
          };
          abbreviation: {
            content: Content | Content[];
          };
        };
      };
      type: string;
      uuid: string;
      n: number;
      properties: {
        property:
          | Property
          | {
              label: {
                uuid: string;
                content: Content | Content[];
              };
              value: {
                type: string;
                content: Content | Content[];
              };
              property?: Property[];
            }[];
      };
      authors: {
        person: {
          type: string;
          uuid: string;
          content: string;
        };
      };
    };
  };
  properties: {
    property:
      | Property
      | {
          label: {
            uuid: string;
            content: Content | Content[];
          };
          value: {
            type: string;
            content: Content | Content[];
          };
          property?: Property[];
        }[];
  };
}

export interface OchreMetadata {
  identifier: {
    content: string;
    xmlns: {
      dc: string;
    };
  };
  description: {
    content: string;
    xmlns: {
      dc: string;
    };
  };
  publisher: {
    content: string;
    xmlns: {
      dc: string;
    };
  };
  language: {
    content: string;
    xmlns: {
      dc: string;
    };
  };
  dataset: {
    content: string;
    xmlns: {
      dc: string;
    };
  };
}

export interface OchreSetData {
  ochre: {
    uuidBelongsTo: string;
    metadata: OchreMetadata;
    set: {
      identification: {
        label: {
          lang: string;
          content: Content | Content[];
        };
      };
      publicationDateTime: string;
      context: {
        context: {
          tree: {
            uuid: string;
            n: number;
            content: Content | Content[];
          };
          project: {
            uuid: string;
            n: number;
            content: Content | Content[];
          };
          displayPath: string;
        };
        displayPath: string;
      };
      project: {
        identification: {
          label: {
            lang: string;
            content: Content | Content[];
          };
          abbreviation: {
            rend: string;
            lang: string;
            content: Content | Content[];
          };
        };
      };
      availability: {
        license: string;
      };
      type: string;
      uuid: string;
      items: {
        resource: OchreResource[];
      };
    };
    publicationDateTime: string;
    belongsTo: string;
    uuid: string;
  };
}

export interface OchreMapItem {
  ochre: {
    uuidBelongsTo: string;
    metadata: OchreMetadata;
    publicationDateTime: string;
    resource: OchreResource;
    uuid: string;
  };
}
