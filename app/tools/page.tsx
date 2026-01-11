import { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/common/Container';

export const metadata: Metadata = {
  title: 'Tools Interactive pentru Pisici - Calculatoare Gratuite | Pisicopedia',
  description: 'Tools interactive gratuite pentru pisici: calculator vârstă în ani oameni, calculator hrană zilnică, calculator greutate ideală, găsește rasa potrivită. Utilitare practice pentru proprietarii de pisici.',
  keywords: 'tools pisici, calculatoare pisici, calculator vârstă pisică, calculator hrană pisică, calculator greutate pisică, rasa potrivită pisică, utilitare pisici',
};

const tools = [
  {
    slug: 'calculator-varsta',
    title: '🧮 Calculator Vârstă Pisică',
    description: 'Află câți ani oameni are pisica ta! Calculator precis pentru conversia vârstei pisicii în ani oameni.',
    icon: '🧮',
    color: 'from-blue-500 to-cyan-500',
    href: '/tools/calculator-varsta',
    status: 'available',
  },
  {
    slug: 'calculator-hrana',
    title: '🍽️ Calculator Hrană Pisică',
    description: 'Calculează cantitatea exactă de hrană de care are nevoie pisica ta zilnic. Personalizat după greutate, vârstă și nivel de activitate.',
    icon: '🍽️',
    color: 'from-orange-500 to-red-500',
    href: '/tools/calculator-hrana',
    status: 'available',
  },
  {
    slug: 'calculator-greutate',
    title: '⚖️ Calculator Greutate Ideală',
    description: 'Verifică dacă pisica ta are greutatea ideală pentru rasă și vârstă. Primește recomandări personalizate.',
    icon: '⚖️',
    color: 'from-purple-500 to-pink-500',
    href: '/tools/calculator-greutate',
    status: 'coming-soon',
  },
  {
    slug: 'rasa-potrivita',
    title: '🎯 Găsește Rasa Potrivită',
    description: 'Quiz interactiv pentru a găsi rasa de pisică perfectă pentru stilul tău de viață și preferințele tale.',
    icon: '🎯',
    color: 'from-green-500 to-emerald-500',
    href: '/tools/rasa-potrivita',
    status: 'coming-soon',
  },
  {
    slug: 'verificare-simptome',
    title: '🔍 Verificare Simptome',
    description: 'Identifică posibilele cauze ale simptomelor pisicii tale. IMPORTANT: Nu înlocuiește consultația veterinară!',
    icon: '🔍',
    color: 'from-red-500 to-rose-500',
    href: '/tools/verificare-simptome',
    status: 'coming-soon',
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-warmgray-50 via-white to-lavender-50">
      <Container>
        <div className="py-12 lg:py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-warmgray-900 mb-4">
              🛠️ Tools Interactive pentru Pisici
            </h1>
            <p className="text-lg text-warmgray-600 max-w-3xl mx-auto">
              Calculatoare gratuite și utilitare practice pentru proprietarii de pisici. 
              Toate tools-urile sunt interactive, precise și ușor de folosit.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.href}
                className={`group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${
                  tool.status === 'coming-soon' ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                
                <div className="relative p-6">
                  {/* Icon */}
                  <div className="text-5xl mb-4">{tool.icon}</div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-warmgray-900 mb-2 group-hover:text-lavender-600 transition-colors">
                    {tool.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-warmgray-600 mb-4 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                  
                  {/* Status Badge */}
                  {tool.status === 'coming-soon' ? (
                    <div className="inline-flex items-center px-3 py-1 bg-warmgray-100 text-warmgray-600 rounded-full text-xs font-medium">
                      În curând
                    </div>
                  ) : (
                    <div className="inline-flex items-center text-lavender-600 font-medium text-sm">
                      Folosește tool-ul
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Info Section */}
          <div className="bg-gradient-to-r from-lavender-100 to-rose-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-warmgray-900 mb-4">
              💡 Despre Tools-urile Noastre
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-warmgray-900 mb-2">✅ Gratuite și Ușor de Folosit</h3>
                <p className="text-warmgray-700 text-sm">
                  Toate tools-urile sunt complet gratuite și nu necesită înregistrare. 
                  Rezultatele sunt calculate instant și pot fi partajate.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-warmgray-900 mb-2">🔬 Bazate pe Știință</h3>
                <p className="text-warmgray-700 text-sm">
                  Algoritmii noștri sunt bazați pe cercetări științifice și recomandări 
                  veterinare. Rezultatele sunt orientative și nu înlocuiesc consultația veterinară.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-warmgray-900 mb-2">📱 Compatibile Mobile</h3>
                <p className="text-warmgray-700 text-sm">
                  Toate tools-urile funcționează perfect pe telefon, tabletă și desktop. 
                  Design responsive pentru o experiență optimă.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-warmgray-900 mb-2">🔒 Privat și Sigur</h3>
                <p className="text-warmgray-700 text-sm">
                  Nu colectăm date personale. Toate calculele se fac local în browser-ul tău. 
                  Privat și sigur 100%.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-warmgray-900 mb-4">
              Ai nevoie de ajutor?
            </h2>
            <p className="text-warmgray-600 mb-6">
              Consultă ghidurile noastre complete sau contactează-ne pentru întrebări.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/ghiduri"
                className="inline-flex items-center px-6 py-3 bg-lavender-500 text-white rounded-lg hover:bg-lavender-600 transition-colors font-medium"
              >
                📖 Vezi Ghidurile
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-white text-warmgray-900 border border-warmgray-300 rounded-lg hover:shadow-md transition-shadow font-medium"
              >
                💬 Contactează-ne
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

