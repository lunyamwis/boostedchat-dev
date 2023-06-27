export interface GoogleMapsScrapperInput {
  specific_element: string;
  css_selector_search_box: string;
  area_of_search: string;
  search_button: string;
  delay: number;
}

export interface GoogleMapsScrapperResult {
  success: boolean;
  statusCode: number;
  results: string[];
}

export interface StyleSeatScrapperInput {
  css_selector_service_box: string;
  css_selector_area_box: string;
  css_selector_submit_btn: string;
  css_selector_seats: string;
  xpath_name: string;
  xpath_popup: string;
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
