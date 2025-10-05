import React, { useState, useMemo } from "react";
import { Menu, Search, Heart, ChevronDown, ClipboardList } from "lucide-react";
import { useRouter } from "next/router";
import countries from "../../../data/countries.json";
import { CountryCode } from "../../../types/countries";
import Flag from "react-flagkit";
import MarketNavbar from "../Navbars/MarketNavbar";
import nextI18NextConfig from '../../../../next-i18next.config';

const MarketHeader: React.FC = () => {
  const router = useRouter();
  const lang = router.locale || "en";
  const { flags } = nextI18NextConfig;
  const languages = Object.keys(flags);

  const defaultCountry: CountryCode = "AE";

  const [isCountryListOpen, setIsCountryListOpen] = useState(false);
  const [openCountry, setOpenCountry] = useState<CountryCode | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(defaultCountry);
  const [countrySearchTerm, setcountrySearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const filteredCountries = useMemo(() => {
    const term = countrySearchTerm.toLowerCase();
    return Object.entries(countries)
      .map(([code, data]) => {
        const countryName = (data.name?.[lang] || data.name?.["en"] || "").toLowerCase();
        const cities = data.cities?.[lang] || [];
        const matchingCities = cities.filter(city => city.toLowerCase().includes(term));
        if (countryName.includes(term)) return [code, data];
        if (matchingCities.length > 0) {
          return [
            code,
            { ...data, cities: { ...data.cities, [lang]: matchingCities } },
          ];
        }
        return null;
      })
      .filter(Boolean);
  }, [countrySearchTerm, lang]);

  const handleCountryClick = (countryCode: CountryCode) => {
    setSelectedCountry(countryCode);
    router.push(`/search?country=${countryCode.toLowerCase()}`);
    setIsCountryListOpen(false);
    setOpenCountry(null);
  };

  const handleArrowClick = (countryCode: CountryCode, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenCountry(openCountry === countryCode ? null : countryCode);
  };

  const handleCityClick = (countryCode: CountryCode, city: string) => {
    setSelectedCountry(countryCode);
    router.push(`/search?country=${countryCode.toLowerCase()}&city=${city}`);
    setIsCountryListOpen(false);
    setOpenCountry(null);
  };

  const handleLanguageSelect = (lng: string) => {
    router.push(router.pathname, router.asPath, { locale: lng });
    setIsLanguageDropdownOpen(false);
  };

  return (
    <>
      <header className="w-full shadow bg-[#b8860b] border-b sticky top-0 z-50 font-poppins">
        <div className="flex items-center justify-between px-4 py-3 w-full">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <img
              id="mainLogo"
              src="/assets/images/logo.png"
              alt="El Pazar Global Co."
              title="El Pazar Export Import"
              className="h-10 w-auto object-contain ml-8"
            />
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Country Selector */}
          <div className="relative hidden md:flex items-center bg-white hover:bg-gray-100 rounded-lg w-50">
            <button
              className="flex items-center w-full px-3 py-1 space-x-2 text-sm rounded focus:outline-none"
              onClick={() => setIsCountryListOpen(!isCountryListOpen)}
            >
              <Flag className="w-5 h-5" country={selectedCountry} />
              <span className="font-medium truncate">
                {countries[selectedCountry].name?.[lang] || countries[selectedCountry].name?.["en"]}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isCountryListOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isCountryListOpen && (
              <div className="absolute left-0 top-full mt-1 bg-white border rounded shadow-lg w-full z-60">
                <div className="p-2 border-b">
                  <input
                    type="text"
                    placeholder="Search country or city..."
                    value={countrySearchTerm}
                    onChange={(e) => setcountrySearchTerm(e.target.value)}
                    className="w-full border px-2 py-1 rounded text-sm focus:outline-none"
                  />
                </div>
                <div className="max-h-[35vh] overflow-y-auto">
                  {filteredCountries.length === 0 ? (
                    <div className="p-3 text-sm text-gray-500">No matches found</div>
                  ) : (
                    filteredCountries.map(([code, countryData]) => {
                      const countryCode = code as CountryCode;
                      const countryName =
                        countryData.name?.[lang] || countryData.name?.["en"] || code;
                      const cities = countryData.cities?.[lang] || [];

                      return (
                        <div key={countryCode} className="relative flex flex-col">
                          <div className="flex justify-between items-center">
                            <button
                              className="w-full text-left px-3 py-2 hover:bg-gray-100 text-xs flex items-center space-x-2"
                              onClick={() => handleCountryClick(countryCode)}
                            >
                              <Flag className="w-4 h-4" country={countryCode} />
                              <span>{countryName}</span>
                            </button>

                            {cities.length > 0 && (
                              <button
                                className="px-2 py-2 hover:bg-gray-200"
                                onClick={(e) => handleArrowClick(countryCode, e)}
                              >
                                <ChevronDown
                                  className={`w-4 h-4 transition-transform ${
                                    openCountry === countryCode ? "rotate-180" : ""
                                  }`}
                                />
                              </button>
                            )}
                          </div>

                          {openCountry === countryCode && (
                            <div className="ml-5 border-l border-gray-200 flex flex-col">
                              {cities.map((city) => (
                                <button
                                  key={city}
                                  className="w-full text-left px-3 py-1 hover:bg-gray-50 text-xs"
                                  onClick={() => handleCityClick(countryCode, city)}
                                >
                                  {city}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="flex flex-1 max-w-2xl mx-4 space-x-0 rounded-lg">
            <input
              type="text"
              placeholder="Search products, categories..."
              className="w-full border px-3 py-2 rounded-l-lg text-sm focus:outline-none"
            />
            <button className="bg-[#5a5858] text-white px-4 rounded-r-md">
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-4 mr-10">
            {/* Language Dropdown with Flags */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center space-x-2 px-2 py-1 rounded bg-[#b8860b] hover:bg-[#dea009]"
              >
                <Flag country={flags[lang]} className="w-4 h-4" />
                <span className="text-sm font-medium text-[#ffffff]">{lang.toUpperCase()}</span>
                <ChevronDown className={`w-4 h-4 text-[#ffffff] transition-transform ${isLanguageDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute bg-white border rounded mt-1 shadow w-20 z-50">
                  {languages.map((lng) => (
                    <button
                      key={lng}
                      className="flex items-center px-2 py-1 w-full hover:bg-gray-100"
                      onClick={() => handleLanguageSelect(lng)}
                    >
                      <Flag country={flags[lng]} className="w-4 h-4 mr-2" />
                      <span>{lng.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Login / Signup */}
            <button className="text-md text-[#FFFFFF] font-medium font-poppins hover:text-[#5a5858]">Login</button>
            <button className="text-md text-[#FFFFFF] font-medium font-poppins hover:text-[#5a5858]">Signup</button>

            {/* Favorites & RFQ */}
            <span title="Your Favorites">
              <Heart className="w-7 h-7 cursor-pointer text-[#FFFFFF] hover:text-[#5a5858]" />
            </span>
            <span title="Your RFQ List">
              <ClipboardList className="w-7 h-7 cursor-pointer text-[#FFFFFF] hover:text-[#5a5858]" />
            </span>
          </div>
        </div>
      </header>
      {/* Categories Mega Menu */}
      <MarketNavbar />
    </>
  );
};

export default MarketHeader;
