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
          {/* Logo - Premium Badge Design */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <svg
                className="w-10 h-10 transition-transform duration-200 group-hover:scale-105"
                viewBox="0 0 48 48"
                fill="none"
              >
                <defs>
                  <linearGradient id="badgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#b794d9" />
                    <stop offset="100%" stopColor="#9b82c9" />
                  </linearGradient>
                  <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>

                {/* Background circle badge */}
                <circle cx="24" cy="24" r="22" fill="url(#badgeGradient)" opacity="0.15" />
                <circle cx="24" cy="24" r="22" stroke="url(#badgeGradient)" strokeWidth="1.5" fill="none" />

                {/* Elegant cat silhouette */}
                <g transform="translate(24, 24)">
                  {/* Head */}
                  <ellipse cx="0" cy="-2" rx="7" ry="8" fill="#9b82c9" />

                  {/* Ears */}
                  <path d="M-6 -9 L-9 -14 L-4 -10 Z" fill="#9b82c9" />
                  <path d="M6 -9 L9 -14 L4 -10 Z" fill="#9b82c9" />
                  <path d="M-6 -9 L-7.5 -12 L-5 -10 Z" fill="#d8b4e2" opacity="0.6" />
                  <path d="M6 -9 L7.5 -12 L5 -10 Z" fill="#d8b4e2" opacity="0.6" />

                  {/* Eyes */}
                  <ellipse cx="-3" cy="-3" rx="1.2" ry="2" fill="white" opacity="0.9" />
                  <ellipse cx="3" cy="-3" rx="1.2" ry="2" fill="white" opacity="0.9" />
                  <ellipse cx="-3" cy="-2.5" rx="0.6" ry="1.2" fill="#5a4a6a" />
                  <ellipse cx="3" cy="-2.5" rx="0.6" ry="1.2" fill="#5a4a6a" />

                  {/* Nose */}
                  <path d="M0 1 L-1 2.5 L1 2.5 Z" fill="#e89ba3" />

                  {/* Whisker hints */}
                  <circle cx="-6" cy="0" r="0.5" fill="#8a72b9" opacity="0.4" />
                  <circle cx="6" cy="0" r="0.5" fill="#8a72b9" opacity="0.4" />

                  {/* Body curve */}
                  <path d="M-6 6 Q0 8 6 6" stroke="#9b82c9" strokeWidth="3" fill="none" opacity="0.6" />
                </g>

                {/* Medical trust checkmark */}
                <circle cx="37" cy="37" r="8" fill="url(#checkGradient)" />
                <circle cx="37" cy="37" r="8" fill="white" opacity="0.1" />
                <path
                  d="M33 37 L35.5 39.5 L41 34"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-warmgray-900 leading-none">
                Pisicopedia
              </span>
              <span className="text-[10px] text-emerald-600 font-medium leading-none mt-0.5 tracking-wide">
                VERIFICAT MEDICAL
              </span>
            </div>
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