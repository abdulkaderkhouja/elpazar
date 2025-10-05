import countriesJson from '../data/countries.json';

export interface CountryData {
  name: Record<string, string>; // { en: "Andorra", ar: "أندورا", ... }
  native: string;
  iso3: string;
  phone: number[];
  continent: string;
  capital: string;
  currency: string[];
  languages: string[];
  cities?: Record<string, string[]>; // optional
}


/* We are importing a JSON file, as we have nested types in the file:
{
  "AE": { "name": { "en": "United Arab Emirates" }, "native": "الإمارات", ... },
  .....}
  then TypeScript infers countriesJson as an object with keys "AE", "US", ...etc
  What type of does: it does not get the value of countriesJson, it gets its type, in another word, it is equivalent to something like:
 {
   AE: CountryData;
   US: CountryData;
   TR: CountryData;
   ...
 }
  What keyof dose: it extract the property names (the keys) from a type, so keyof typeof countriesJson is gives a union of the keys in the json:
  "AE" | "US" | "TR"
  that is what is stored in the CountryCode
*/
export type CountryCode = keyof typeof countriesJson;

/*
  Here we are enforcing:
  Each key in countries must be in CountryCode type (one of "AE" | "US" | "TR")
  Each value must match the structure of CountryData.
*/
const countries: Record<CountryCode, CountryData> = countriesJson as Record<CountryCode, CountryData>;

export default countries;
