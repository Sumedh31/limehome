export interface Location {
    lat: number;
    lng: number;
    city: string;
    postalCode: string;
    countryCode: string;
    addressLine1: string;
    countryName: string;
  }
  
  export interface Image {
    url: string;
    is_portrait: boolean;
    position: number;
    unit_group_ids?: number[];
    tags?: any[];
  }
  
  export interface Space {
    icon: string;
    name: string;
    name_plural: string;
    slug: string;
    value: number;
  }
  
  export interface Amenity {
    icon: string;
    name: string;
  }
  
  export interface UnitGroup {
    id: number;
    title: string;
    description: string;
    custom_title: string;
    external_id: string;
    name: string;
    max_guests: number;
    rental_type: string;
    bedroom_count: number;
    lowest_price_per_night: null | number;
    lowest_price_per_month: null | number;
    spaces: Space[];
    amenities: Amenity[];
    images: Image[];
  }
  
  export interface PropertyDetails {
    id: number;
    external_id: string;
    review_widget_id: string;
    name: string;
    city: string;
    city_id: number;
    street: string;
    location: Location;
    timezone: string;
    distance: number;
    description: string;
    additional_services: null | string;
    parking: string;
    things_to_know: string;
    house_rules: string;
    images: Image[];
    lowest_price_per_night: null | number;
    lowest_price_per_month: null | number;
    default_check_in_time: string;
    default_check_out_time: string;
    unit_groups: UnitGroup[];
  }