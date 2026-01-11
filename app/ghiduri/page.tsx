import Container from '@/components/common/Container';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ghiduri Complete - Pisicopedia',
  description: 'Ghiduri detaliate pentru îngrijirea pisicilor: vaccinare, deparazitare, sterilizare, nutriție și multe altele.',
};

// Define guide categories
const guideCategories = [
  {
    title: 'Îngrijire de bază',
    icon: '🏠',
    guides: [
      { title: 'Pregătirea casei pentru o pisică nouă', slug: 'pregatire-casa-pisica' },
      { title: 'Alegerea litiere potrivite', slug: 'alegere-litiera' },
      { title: 'Amenajarea spațiului pisicii', slug: 'amenajare-spatiu' },
      { title: 'Igiena zilnică a pisicii', slug: 'igiena-zilnica' },
    ]
  },
  {
    title: 'Sănătate preventivă',
    icon: '💉',
    guides: [
      { title: 'Calendarul de vaccinare', slug: 'calendar-vaccinare' },
      { title: 'Ghid complet deparazitare', slug: 'ghid-deparazitare' },
      { title: 'Sterilizarea: pro și contra', slug: 'sterilizare-pro-contra' },
      { title: 'Controale veterinare regulate', slug: 'controale-veterinare' },
    ]
  },
  {
    title: 'Nutriție',
    icon: '🍖',
    guides: [
      { title: 'Hrană uscată vs umedă', slug: 'hrana-uscata-vs-umeda' },
      { title: 'Calcularea porțiilor corecte', slug: 'calculare-portii' },
      { title: 'Alimente periculoase pentru pisici', slug: 'alimente-periculoase' },
      { title: 'Diete speciale pentru pisici bolnave', slug: 'diete-speciale' },
    ]
  },
  {
    title: 'Comportament și dresaj',
    icon: '🎯',
    guides: [
      { title: 'Înțelegerea limbajului pisicii', slug: 'limbaj-pisica' },
      { title: 'Cum să dresezi o pisică', slug: 'dresaj-pisica' },
      { title: 'Rezolvarea problemelor comportamentale', slug: 'probleme-comportament' },
      { title: 'Jucării și îmbogățire ambientală', slug: 'jucarii-imbogatire' },
    ]
  },
  {
    title: 'Pui de pisică',
    icon: '🐱',
    guides: [
      { title: 'Îngrijirea puilor nou-născuți', slug: 'pui-nou-nascuti' },
      { title: 'Înțărcarea puilor', slug: 'intarcare-pui' },
      { title: 'Socializarea puilor', slug: 'socializare-pui' },
      { title: 'Prima vizită la veterinar', slug: 'prima-vizita-veterinar' },
    ]
  },
  {
    title: 'Pisici senior',
    icon: '👴',
    guides: [
      { title: 'Îngrijirea pisicilor în vârstă', slug: 'ingrijire-senior' },
      { title: 'Probleme de sănătate la bătrânețe', slug: 'probleme-senior' },
      { title: 'Adaptarea casei pentru pisici senior', slug: 'adaptare-casa-senior' },
      { title: 'Nutriția pisicilor vârstnice', slug: 'nutritie-senior' },
    ]
  },
  {
    title: 'Ghiduri practice speciale',
    icon: '🚀',
    guides: [
      { title: 'Călătorie cu pisica: Transport fără stres', slug: 'calatorie-cu-pisica' },
      { title: 'Pisică pierdută: Ghid urgent de căutare', slug: 'pisica-pierduta-ghid-urgent' },
      { title: 'Mutare/relocare: Adaptare fără stres', slug: 'mutare-relocare-pisica' },
      { title: 'Introducere pisică nouă: Protocol complet', slug: 'introducere-pisica-noua' },
      { title: 'Îngrijire blană: Periaj, baie, tunsoare', slug: 'ingrijire-blana-pisica' },
    ]
  },
];

export default function GhiduriPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-warmgray-50 via-white to-lavender-50">
      <Container>
        <div className="py-12 lg:py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-warmgray-900 mb-4">
              Ghiduri Complete pentru Pisici
            </h1>
            <p className="text-lg text-warmgray-600 max-w-3xl mx-auto">
              Tot ce trebuie să știi despre îngrijirea, sănătatea și fericirea pisicii tale.
              Ghiduri detaliate create de experți veterinari.
            </p>
          </div>

          {/* Quick Links */}
          <div className="bg-gradient-to-r from-lavender-100 to-rose-100 rounded-2xl p-6 mb-12">
            <h2 className="text-lg font-semibold text-warmgray-900 mb-4">
              🔥 Ghiduri populare
            </h2>
            <div className="flex flex-wrap gap-2">
              {['Vaccinare completă', 'Sterilizare', 'Prima pisică', 'Hrănire corectă', 'Litieră perfectă', 'Pisică nou-născută'].map((guide) => (
                <a
                  key={guide}
                  href="#"
                  className="px-4 py-2 bg-white rounded-lg hover:shadow-md transition-shadow text-sm"
                >
                  {guide}
                </a>
              ))}
            </div>
          </div>

          {/* Guide Categories */}
          <div className="space-y-12">
            {guideCategories.map((category) => (
              <div key={category.title} className="bg-white rounded-2xl shadow-sm p-8">
                <div className="flex items-center mb-6">
                  <span className="text-4xl mr-4">{category.icon}</span>
                  <h2 className="text-2xl font-bold text-warmgray-900">
                    {category.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.guides.map((guide) => (
                    <a
                      key={guide.slug}
                      href={`/ghiduri/${guide.slug}`}
                      className="group flex items-center p-4 bg-warmgray-50 rounded-lg hover:bg-lavender-50 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-warmgray-900 group-hover:text-lavender-600 transition-colors">
                          {guide.title}
                        </h3>
                      </div>
                      <svg
                        className="w-5 h-5 text-warmgray-400 group-hover:text-lavender-600 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Download Section */}
          <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              📚 Ghid PDF Gratuit
            </h2>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Descarcă ghidul nostru complet "Prima ta pisică: Tot ce trebuie să știi"
              cu peste 50 de pagini de informații esențiale.
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-xl transition-shadow">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Descarcă Ghidul Gratuit
            </button>
          </div>

          {/* FAQ Teaser */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-warmgray-900 mb-4">
              Ai întrebări specifice?
            </h2>
            <p className="text-warmgray-600 mb-8">
              Consultă secțiunea noastră de întrebări frecvente sau contactează-ne direct.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-lavender-500 text-white rounded-lg hover:bg-lavender-600 transition-colors"
              >
                Pune o întrebare
              </a>
              <a
                href="/sanatate"
                className="inline-flex items-center px-6 py-3 bg-white text-warmgray-900 border border-warmgray-300 rounded-lg hover:shadow-md transition-shadow"
              >
                Vezi articole medicale
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}