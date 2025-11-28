import React from 'react';
import Link from 'next/link';
import Container from '@/components/common/Container';
import { footerNavigation, siteConfig } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-warmgray-50 border-t border-warmgray-200 mt-20">
      {/* Medical Disclaimer Banner */}
      <div className="bg-rose-50 border-b border-rose-200">
        <Container>
          <div className="py-4 flex items-start space-x-3">
            <svg
              className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-warmgray-700">
              <strong className="font-semibold">Disclaimer Medical:</strong>{' '}
              {siteConfig.disclaimer}
            </p>
          </div>
        </Container>
      </div>

      {/* Main Footer Content */}
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <svg
                className="w-8 h-8 text-lavender-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span className="text-xl font-bold text-warmgray-900">
                Pisicopedia
              </span>
            </Link>
            <p className="text-sm text-warmgray-600 mb-4">
              Enciclopedia completă a raselor și sănătății pisicilor.
              Informații medicale verificate pentru îngrijirea optimă a pisicii tale.
            </p>
            <div className="flex space-x-3">
              {siteConfig.links.facebook && (
                <a
                  href={siteConfig.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-warmgray-500 hover:text-lavender-600 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {siteConfig.links.instagram && (
                <a
                  href={siteConfig.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-warmgray-500 hover:text-lavender-600 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-warmgray-900 uppercase tracking-wider mb-4">
              Navigare
            </h3>
            <ul className="space-y-2">
              {footerNavigation.navigare.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-warmgray-600 hover:text-lavender-600 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Network Sites */}
          <div>
            <h3 className="text-sm font-semibold text-warmgray-900 uppercase tracking-wider mb-4">
              Rețea Site-uri
            </h3>
            <ul className="space-y-2">
              {footerNavigation.retea.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-warmgray-600 hover:text-lavender-600 transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-warmgray-900 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerNavigation.legal.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-warmgray-600 hover:text-lavender-600 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-warmgray-200">
          <div className="max-w-md mx-auto text-center lg:text-left lg:max-w-none lg:flex lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h3 className="text-lg font-semibold text-warmgray-900 mb-1">
                Abonează-te la Newsletter
              </h3>
              <p className="text-sm text-warmgray-600">
                Primește sfaturi veterinare și noutăți despre pisici direct în inbox.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Adresa ta de email"
                className="px-4 py-2 border border-warmgray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-lavender-500 text-white font-medium rounded-lg hover:bg-lavender-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:ring-offset-2"
              >
                Abonează-te
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-4 border-t border-warmgray-200 text-center">
          <p className="text-sm text-warmgray-600">
            © {new Date().getFullYear()} Pisicopedia.ro. Toate drepturile rezervate.
          </p>
        </div>
      </Container>
    </footer>
  );
}