import React, { useState } from "react";

interface SubCategory {
  name: string;
  sub: string[];
}

interface SecondaryService {
  name: string;
  link: string;
}

const categories: { name: string; subCategories: SubCategory[] }[] = [
  {
    name: "Electronics",
    subCategories: [
      { name: "Phones", sub: ["iPhone", "Samsung", "Xiaomi"] },
      { name: "Laptops", sub: ["MacBook", "Dell", "HP"] },
      { name: "TV & Audio", sub: ["LED TVs", "Speakers", "Headphones"] },
      { name: "Accessories", sub: ["Chargers", "Cables", "Cases"] },
    ],
  },
  {
    name: "Clothing",
    subCategories: [
      { name: "Men", sub: ["Shirts", "Pants", "Shoes"] },
      { name: "Women", sub: ["Dresses", "Tops", "Shoes"] },
    ],
  },
  { name: "Food", subCategories: [] },
  { name: "Chemicals", subCategories: [] },
  { name: "Construction", subCategories: [] },
  { name: "Furniture", subCategories: [] },
  { name: "Automotive", subCategories: [] },
  { name: "Pharmaceuticals", subCategories: [] },
  { name: "Machinery", subCategories: [] },
  { name: "Metals", subCategories: [] },
  { name: "More...", subCategories: [] },
];

const secondaryServices: SecondaryService[] = [
  { name: "Warehousing", link: "/services/warehousing" },
  { name: "Shipping", link: "/services/shipping" },
  { name: "Supply Chain Solutions", link: "/services/supply-chain-solutions" },
  { name: "Customs Clearance", link: "/services/customs" },
  { name: "Insurance", link: "/services/insurance" },
  { name: "Banking", link: "/services/banking" },
];

const MarketNavbar: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <nav className="w-full bg-[#f5f4f2] shadow-md sticky top-0 z-40 border-b relative sticky">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex space-x-2 md:space-x-6 text-md font-medium">
          {categories.map((category, idx) => (
            <li
              key={idx}
              onMouseEnter={() => setOpenIndex(idx)}
              onMouseLeave={() => setOpenIndex(null)}
            >
              <button className="flex items-center py-3 px-2 md:px-3 hover:text-[#b8860b] cursor-pointer transition-colors">
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Full-width Mega menu */}
      {categories.map((category, idx) =>
        category.subCategories.length > 0 && openIndex === idx ? (
          <div
            key={idx}
            className="absolute top-full left-0 w-full bg-white shadow-lg z-50 border-t border-gray-100 h-[70vh] flex flex-col"
            onMouseEnter={() => setOpenIndex(idx)}
            onMouseLeave={() => setOpenIndex(null)}
          >
            {/* Inner content centered */}
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col h-full gap-6 w-full">
              {/* Main SubCategories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {category.subCategories.map((subCat, subIdx) => (
                  <div key={subIdx}>
                    <h3 className="font-semibold text-md mb-3 cursor-pointer hover:text-[#b8860b]">
                      {subCat.name}
                    </h3>
                    <ul className="space-y-2 text-sm">
                      {subCat.sub.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="cursor-pointer hover:text-[#b8860b] transition-colors"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Secondary Services at bottom */}
              <div className="mt-auto border-t border-gray-200 pt-4">
                <h4 className="text-lg font-semibold mb-2 text-gray-500">
                  Our Services
                </h4>
                <div className="flex flex-wrap gap-6">
                  {secondaryServices.map((service, serviceIdx) => (
                    <a
                      key={serviceIdx}
                      href={service.link}
                      className="text-base font-medium text-gray-700 hover:text-[#b8860b] transition-colors"
                    >
                      {service.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null
      )}
    </nav>
  );
};

export default MarketNavbar;
