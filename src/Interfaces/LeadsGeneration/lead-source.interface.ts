export type LeadSourceCriterion = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface LeadSource {
  id: string;
  name: string;
  criterion: LeadSourceCriterion;
  account_usernames?: string[];
  photo_links?: string[];
  hashtags?: string[];
  google_maps_search_keywords?: string;
  enrich_with_url_in_bio: boolean;
  is_infinite_loop: boolean;
  external_urls?: string[];
  estimated_usernames?: string[];
}

export type CreateLeadSource = Required<
  Pick<
    LeadSource,
    "name" | "criterion" | "enrich_with_url_in_bio" | "is_infinite_loop"
  >
> &
  Partial<
    Pick<
      LeadSource,
      | "account_usernames"
      | "photo_links"
      | "hashtags"
      | "google_maps_search_keywords"
      | "estimated_usernames"
      | "external_urls"
    >
  >;

export type GetLeadSource = LeadSource;

export type UpdateLeadSourceParams = {
  id: string;
  data: Partial<CreateLeadSource>;
};
