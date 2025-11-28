import Link from 'next/link';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center py-12">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          {/* Cat SVG illustration */}
          <div className="mb-8">
            <svg
              className="w-48 h-48 mx-auto text-lavender-400"
              viewBox="0 0 200 200"
              fill="currentColor"
            >
              <g transform="translate(100, 100)">
                {/* Cat body */}
                <ellipse cx="0" cy="20" rx="60" ry="50" opacity="0.8"/>
                {/* Cat head */}
                <circle cx="0" cy="-20" r="40" />
                {/* Ears */}
                <path d="M -30,-50 L -20,-20 L -40,-20 Z" />
                <path d="M 30,-50 L 20,-20 L 40,-20 Z" />
                {/* Eyes */}
                <circle cx="-12" cy="-20" r="5" fill="white" />
                <circle cx="12" cy="-20" r="5" fill="white" />
                {/* Nose */}
                <path d="M -3,-10 L 0,-5 L 3,-10 Z" fill="white" opacity="0.6" />
                {/* Question mark above */}
                <text
                  x="0"
                  y="-70"
                  fontSize="40"
                  textAnchor="middle"
                  fill="currentColor"
                  opacity="0.6"
                >
                  ?
                </text>
              </g>
            </svg>
          </div>

          <h1 className="text-6xl font-bold text-warmgray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-warmgray-800 mb-4">
            Oops! Pagina nu a fost găsită
          </h2>
          <p className="text-warmgray-600 mb-8 max-w-md mx-auto">
            Se pare că această pisică s-a rătăcit... Pagina pe care o căutați nu există sau a fost mutată.
            Haideți să vă ajutăm să găsiți drumul înapoi!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="primary">
                🏠 Înapoi Acasă
              </Button>
            </Link>
            <Link href="/rase">
              <Button variant="secondary">
                🐱 Vezi Rasele
              </Button>
            </Link>
            <Link href="/sanatate">
              <Button variant="secondary">
                🏥 Articole Sănătate
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-warmgray-200">
            <p className="text-sm text-warmgray-500">
              Dacă credeți că aceasta este o eroare, vă rugăm să ne{' '}
              <Link href="/contact" className="text-rose-500 hover:text-rose-600 font-medium">
                contactați
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}