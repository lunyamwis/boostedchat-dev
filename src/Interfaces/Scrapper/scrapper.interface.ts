export interface GoogleMapsScrapperInput {
  area_of_search: string;
  delay: number;
}

export interface GoogleMapsScrapperResult {
  success: boolean;
  statusCode: number;
  results: string[];
}

export interface GoogleMapsSearchUsersResult {
  statusCode: number;
  links: string[];
}

export interface StyleSeatScrapperInput {
  service: string;
  area: string;
  delay: number;
}

export interface GoogleMapsProfileExtractInput {
  xpath_business: string;
  xpath_review: string;
}

export interface StyleseatProfileExtractInput {
  xpath_ig_username: string;
  xpath_review: string;
}
