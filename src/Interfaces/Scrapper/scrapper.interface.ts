export interface GoogleMapsScrapperInput {
  specific_element: string;
  css_selector_search_box: string;
  area_of_search: string;
  delay: number;
}

export interface StyleSeatScrapperInput {
  area: string;
  css_selector_area_box: string;
  css_selector_service_box: string;
  css_selector_submit_btn: string;
  service: string;
  delay: number;
}
