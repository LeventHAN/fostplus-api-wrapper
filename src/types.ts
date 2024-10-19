export interface ZipcodeResponse {
  items: ZipcodeItem[];
  total: number;
  pages: number;
  page: number;
  size: number;
  self: string;
  first: string;
  last: string;
}

export interface ZipcodeItem {
  city: City;
  code: string;
  createdAt: string;
  names: Names[];
  updatedAt: string;
  id: string;
  available: boolean;
}

export interface City {
  names: LanguageStrings;
  zipcodes: string[];
  createdAt: string;
  name: string;
  updatedAt: string;
  id: string;
}

export interface LanguageStrings {
  nl: string;
  fr: string;
  de: string;
  en: string;
}

export interface Names {
  nl: string;
  fr: string;
  de: string;
  en: string;
}

export interface RecyclingParksResponse {
  items: RecyclingParkItem[];
  total: number;
  pages: number;
  page: number;
  size: number;
  self: string;
  first: string;
  last: string;
}

export interface RecyclingParkItem {
  info: Info;
  location: Location;
  active: boolean;
  deleted: boolean;
  externalId: string;
  type: Type;
  busNumber: string;
  city: string;
  createdAt: string;
  houseNumber: string;
  latitude: number;
  longitude: number;
  name: LanguageStrings;
  source: string;
  street: string;
  updatedAt: string;
  zipcode: string;
  exceptionDays: ExceptionDay[];
  id: string;
  openingPeriods: OpeningPeriod[];
  displayName: LanguageStrings;
  targets: any[];
}

export interface Info {
  rules: Rules;
  moreInfo: MoreInfo;
}

export interface Rules {
  access: Access;
  specific: LanguageStrings;
}

export interface Access {
  link: LanguageStrings;
  linkTitle: LanguageStrings;
  description: LanguageStrings;
}

export interface MoreInfo {
  description: LanguageStrings;
  link: LanguageStrings;
  linkTitle: LanguageStrings;
}

export interface Location {
  type: string;
  coordinates: number[];
}

export interface Type {
  admin: boolean;
  _id: string;
  key: string;
  name: LanguageStrings;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface ExceptionDay {
  open: boolean;
  openingHours: OpeningHour[];
  _id: string;
  date: string;
}

export interface OpeningHour {
  _id: string;
  from: string;
  until: string;
}

export interface OpeningPeriod {
  openingDays: OpeningDay[];
  _id: string;
  name: string;
  from: string;
  until: string;
}

export interface OpeningDay {
  openingHours: OpeningHour[];
  _id: string;
  day: number;
}

export interface StreetsResponse {
  items: StreetItem[];
  total: number;
  pages: number;
  page: number;
  size: number;
  self: string;
  first: string;
  last: string;
}

export interface StreetItem {
  id: string;
  city: City[];
  createdAt: string;
  deleted: boolean;
  name: string;
  names: LanguageStrings;
  updatedAt: string;
  zipcode: Zipcode[];
}

export interface Zipcode {
  city: string;
  code: string;
  createdAt: string;
  names: Names[];
  updatedAt: string;
  id: string;
}

export interface CollectionsResponse {
  items: CollectionItem[];
  total: number;
  pages: number;
  page: number;
  size: number;
  self: string;
  first: string;
  last: string;
}

export interface CollectionItem {
  type: string;
  timestamp: string;
  fraction: Fraction;
  id: string;
}

export interface Fraction {
  name: LanguageStrings;
  logo: Logo;
  color: string;
  organisation: string;
  id: string;
  variations: any[];
}

export interface Logo {
  regular: ImageSet;
  reversed: ImageSet;
  _id: string;
  name: LanguageStrings;
  id: string;
}

export interface ImageSet {
  "1x": string;
  "2x": string;
  "3x": string;
}
