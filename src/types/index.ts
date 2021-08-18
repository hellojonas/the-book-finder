export interface IBookSearchResult {
  numFound: 285;
  start: 0;
  numFoundExact: true;
  docs: {
    key: string; //'/works/OL27448W'
    text: string[];
    type: string;
    seed: string[];
    title: string;
    title_suggest: string;
    has_fulltext: boolean;
    edition_count: number;
    edition_key: string[];
    publish_date: string[];
    publish_year: number[];
    first_publish_year: number;
    lccn: string[];
    publish_place: string[];
    oclc: string[];
    contributor: string[];
    lcc: string[];
    ddc: string[];
    isbn: string[];
    last_modified_i: number;
    ebook_count_i: number;
    ia: string[];
    public_scan_b: boolean;
    ia_collection_s: string;
    lending_edition_s: string;
    lending_identifier_s: string;
    printdisabled_s: string;
    cover_edition_key: string;
    cover_i: number;
    publisher: string[];
    language: string[];
    author_key: string[];
    author_name: string[];
    author_alternative_name: string[];
    person: string[];
    place: string[];
    subject: string[];
    time: string[];
    id_alibris_id: string[];
    id_amazon: string[];
    id_canadian_national_library_archive: string[];
    id_goodreads: string[];
    id_google: string[];
    id_librarything: string[];
    id_overdrive: string[];
    id_paperback_swap: string[];
    id_wikidata: string[];
    ia_loaded_id: string[];
    ia_box_id: string[];
    id_dep_sito_legal: string[];
    publisher_facet: string[];
    person_key: string[];
    time_facet: string[];
    place_key: string[];
    person_facet: string[];
    subject_facet: string[];
    _version_: number;
    place_facet: string[];
    lcc_sort: string;
    author_facet: string[];
    subject_key: string[];
    time_key: string[];
    ddc_sort: string;
  }[];
  num_found: number;
  q: string;
  offset?: number;
}

export interface IBookResult {
  description: {
    type: string;
    value: string;
  };
  links: {
    title: string;
    url: string;
    type: {
      key: string;
    };
  }[];
  title: string;
  covers: number[];
  subject_places: string[];
  first_publish_date: string;
  subject_people: string[];
  key: string;
  authors: {
    author: {
      key: string;
    };
    type: {
      key: string;
    };
  }[];
  excerpts: {
    excerpt: string;
    pages: string;
    author: {
      key: string;
    };
  }[];
  subjects: string[];
  type: {
    key: string;
  };
  subject_times: string[];
  latest_revision: number;
  revision: number;
  created: {
    type: string;
    value: string;
  };
  last_modified: {
    type: string;
    value: string;
  };
}

export interface IAuthorSearchResult {
  numFound: 33;
  start: 0;
  numFoundExact: true;
  docs: [
    {
      key: string; // OL...
      text: string[];
      type: string;
      name: string;
      alternate_names: string[];
      birth_date: string;
      death_date: string;
      top_work: string;
      work_count: 243;
      top_subjects: string[];
      _version_: number;
    }
  ];
}

export interface IAuthorResult {
  key: string;
  fuller_name: string;
  wikipedia: string;
  bio: {
    type: string;
    value: string;
  };
  links: {
    url: string;
    title: string;
    type: {
      key: string;
    };
  }[];
  type: {
    key: string;
  };
  birth_date: string;
  name: string;
  personal_name: string;
  source_records: string[];
  remote_ids: {
    isni: string;
    viaf: string;
    wikidata: string;
  };
  alternate_names: string[];
  death_date: string;
  photos: number[];
  latest_revision: number;
  revision: number;
  created: {
    type: string;
    value: string;
  };
  last_modified: {
    type: string;
    value: string;
  };
}

export interface IAuthorWorks {
  links: {
    self: string;
    author: string;
    next: string;
  };
  size: number;
  entries: {
    title: string;
    covers: number[];
    key: string;
    authors: {
      type: {
        key: string;
      };
      author: {
        key: string;
      };
    }[];
    type: {
      key: string;
    };
    latest_revision: number;
    revision: number;
    created: {
      type: string;
      value: string;
    };
    last_modified: {
      type: string;
      value: string;
    };
  }[];
}
