"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function MarketFooter() {
  const footerLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-[#f5f4f2] text-[#000000] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & About */}
          <div>
            <img 
              id="mainLogo"
              src="/assets/images/logo.png"
              alt="El Pazar Global Co."
              title="El Pazar Export Import"
              className="h-40 w-auto object-contain ml-8" />
            <p className="mt-3 text-sm text-[#000000]">
              Your trusted marketplace for quality products and seamless supply
              chain solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#000000]">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-[#050505] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold text-[#000000]">Contact Us</h3>
            <p className="mt-3 text-sm">Email: support@elpazar.com</p>
            <p className="text-sm">Phone: +971 58 114 7712</p>

            <div className="flex space-x-4 mt-4">
              <Link href="https://facebook.com" target="_blank" className="bg-[#b8860b] text-[#ffffff] rounded-md p-1 flex items-center justify-center hover:bg-[#dba318] transition-colors cursor-pointer">
                <Facebook className="h-5 w-5 hover:bg-[#dba318] transition-colors" />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="bg-[#b8860b] text-[#ffffff] rounded-md p-1 flex items-center justify-center hover:bg-[#dba318] transition-colors cursor-pointer">
                <Twitter className="h-5 w-5 hover:bg-[#dba318] transition-colors" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="bg-[#b8860b] text-[#ffffff] rounded-md p-1 flex items-center justify-center hover:bg-[#dba318] transition-colors cursor-pointer">
                <Linkedin className="h-5 w-5 hover:bg-[#dba318] transition-colors" />
              </Link>
              <Link href="https://instagram.com" target="_blank" className="bg-[#b8860b] text-[#ffffff] rounded-md p-1 flex items-center justify-center hover:bg-[#dba318] transition-colors cursor-pointer">
                <Instagram className="h-5 w-5 hover:bg-[#dba318] transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} <a href="https://elpazar.com">El Pazar.</a> All rights reserved.
        </div>
      </div>
    </footer>
  );
}
