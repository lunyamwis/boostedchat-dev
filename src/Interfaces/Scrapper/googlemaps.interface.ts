interface GoogleMapScrapperInput {
  specific_element: string;
  css_selector_search_box: string;
  area_of_search: string;
  delay: number;
}

export interface CreateGoogleMapScrapper extends GoogleMapScrapperInput {}
