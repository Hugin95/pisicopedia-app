'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Container from '@/components/common/Container';
import { mainNavigation } from '@/lib/constants';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-warmgray-200">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <svg
              className="w-8 h-8"
              viewBox="0 0 32 32"
              fill="none"
            >
              {/* Cat head shape - lavender */}
              <path
                d="M16 6c-4.5 0-8 2.5-8 7v7c0 3.5 3.5 6 8 6s8-2.5 8-6v-7c0-4.5-3.5-7-8-7z"
                fill="#9b82c9"
              />
              {/* Left ear */}
              <path
                d="M9 6L6 11l3-1.5V6z"
                fill="#9b82c9"
              />
              {/* Right ear */}
              <path
                d="M23 6l3 5-3-1.5V6z"
                fill="#9b82c9"
              />
              {/* Eyes */}
              <circle cx="12" cy="14" r="1.5" fill="white" opacity="0.7" />
              <circle cx="20" cy="14" r="1.5" fill="white" opacity="0.7" />
              {/* Checkmark badge - emerald */}
              <circle cx="24" cy="24" r="5.5" fill="#10b981" />
              <path
                d="M21.5 24l1.5 1.5 3-3"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xl font-bold text-warmgray-900">
              Pisicopedia
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {mainNavigation.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="text-warmgray-700 hover:text-lavender-600 font-medium transition-colors duration-200 flex items-center"
                >
                  {item.label}
                  {item.children && (
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-warmgray-200 py-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-warmgray-700 hover:bg-lavender-50 hover:text-lavender-700 transition-colors duration-200"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="p-2 text-warmgray-600 hover:text-lavender-600 transition-colors duration-200">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-warmgray-600 hover:text-lavender-600 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Improved with animation and better spacing */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}>
          <nav className="py-4 border-t border-warmgray-200 bg-white">
            {mainNavigation.map((item) => (
              <div key={item.label} className="mb-2">
                <Link
                  href={item.href}
                  className="block py-3 px-4 text-warmgray-700 hover:bg-lavender-50 hover:text-lavender-600 font-medium transition-all duration-200 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block py-2 px-4 text-sm text-warmgray-600 hover:bg-lavender-50 hover:text-lavender-600 transition-all duration-200 rounded-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}