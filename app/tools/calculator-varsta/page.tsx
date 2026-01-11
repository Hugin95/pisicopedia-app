'use client';

import { useState } from 'react';
import Container from '@/components/common/Container';
import Card from '@/components/common/Card';

// Formula corectă pentru vârsta pisicii în ani oameni
// Nu este simplu 1:7! Formula reală:
// - Primul an = 15 ani oameni
// - Al doilea an = +9 ani (total 24)
// - Fiecare an următor = +4 ani
function calculateHumanAge(catAgeMonths: number): number {
  if (catAgeMonths <= 0) return 0;
  
  const years = Math.floor(catAgeMonths / 12);
  const months = catAgeMonths % 12;
  
  if (years === 0) {
    // Primul an: 15 ani oameni pentru 12 luni
    return Math.round((15 / 12) * months);
  } else if (years === 1) {
    // Al doilea an: 15 + (9/12 * months) = 24 la 2 ani
    return 15 + Math.round((9 / 12) * months);
  } else {
    // Ani următori: 24 + (years - 2) * 4 + (4/12 * months)
    return 24 + (years - 2) * 4 + Math.round((4 / 12) * months);
  }
}

function getAgeCategory(humanAge: number): { label: string; color: string; description: string } {
  if (humanAge < 15) {
    return {
      label: 'Pui',
      color: 'text-blue-600 bg-blue-50',
      description: 'Pisica ta este încă un pui! Necesită îngrijire specială și nutriție pentru creștere.',
    };
  } else if (humanAge < 24) {
    return {
      label: 'Tânără',
      color: 'text-green-600 bg-green-50',
      description: 'Pisica ta este tânără și activă. Perioada de vârf pentru sănătate și energie!',
    };
  } else if (humanAge < 40) {
    return {
      label: 'Adultă',
      color: 'text-purple-600 bg-purple-50',
      description: 'Pisica ta este adultă. Menține rutina de îngrijire și controale regulate.',
    };
  } else if (humanAge < 56) {
    return {
      label: 'Matură',
      color: 'text-orange-600 bg-orange-50',
      description: 'Pisica ta este matură. Monitorizează atent sănătatea și adaptează rutina.',
    };
  } else {
    return {
      label: 'Senior',
      color: 'text-red-600 bg-red-50',
      description: 'Pisica ta este senior. Necesită îngrijire specială și controale veterinare mai frecvente.',
    };
  }
}

export default function CalculatorVarstaPage() {
  const [catAge, setCatAge] = useState<number>(12);
  const [unit, setUnit] = useState<'months' | 'years'>('months');
  const [showResult, setShowResult] = useState(false);

  const handleCalculate = () => {
    setShowResult(true);
  };

  const ageInMonths = unit === 'years' ? catAge * 12 : catAge;
  const humanAge = calculateHumanAge(ageInMonths);
  const category = getAgeCategory(humanAge);

  return (
    <div className="min-h-screen bg-gradient-to-br from-warmgray-50 via-white to-lavender-50">
      <Container>
        <div className="py-12 lg:py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-warmgray-900 mb-4">
              🧮 Calculator Vârstă Pisică
            </h1>
            <p className="text-lg text-warmgray-600 max-w-3xl mx-auto">
              Află câți ani oameni are pisica ta! Calculator precis bazat pe formula științifică 
              pentru conversia vârstei pisicii în ani oameni.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Calculator Card */}
            <Card className="mb-8">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-warmgray-900 mb-6">
                  Introdu Datele Pisicii
                </h2>

                {/* Unit Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-warmgray-700 mb-3">
                    Selectează unitatea de măsură:
                  </label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setUnit('months');
                        setCatAge(12);
                        setShowResult(false);
                      }}
                      className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                        unit === 'months'
                          ? 'bg-lavender-500 text-white shadow-md'
                          : 'bg-warmgray-100 text-warmgray-700 hover:bg-warmgray-200'
                      }`}
                    >
                      📅 Luni
                    </button>
                    <button
                      onClick={() => {
                        setUnit('years');
                        setCatAge(1);
                        setShowResult(false);
                      }}
                      className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                        unit === 'years'
                          ? 'bg-lavender-500 text-white shadow-md'
                          : 'bg-warmgray-100 text-warmgray-700 hover:bg-warmgray-200'
                      }`}
                    >
                      📆 Ani
                    </button>
                  </div>
                </div>

                {/* Age Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-warmgray-700 mb-2">
                    Vârsta pisicii ({unit === 'months' ? 'în luni' : 'în ani'}):
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max={unit === 'months' ? '300' : '25'}
                      value={catAge}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0;
                        setCatAge(value);
                        setShowResult(false);
                      }}
                      className="w-full px-4 py-3 text-2xl font-bold text-center border-2 border-lavender-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-warmgray-500 font-medium">
                      {unit === 'months' ? 'luni' : 'ani'}
                    </div>
                  </div>
                  <p className="text-sm text-warmgray-500 mt-2">
                    {unit === 'months' 
                      ? 'Introdu vârsta pisicii în luni (ex: 6 luni, 18 luni)'
                      : 'Introdu vârsta pisicii în ani (ex: 1 an, 5 ani)'}
                  </p>
                </div>

                {/* Calculate Button */}
                <button
                  onClick={handleCalculate}
                  className="w-full px-8 py-4 bg-gradient-to-r from-lavender-500 to-rose-500 text-white font-bold text-lg rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  🧮 Calculează Vârsta în Ani Oameni
                </button>
              </div>
            </Card>

            {/* Result Card */}
            {showResult && (
              <Card className="mb-8 animate-fade-in">
                <div className="p-8">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">🎉</div>
                    <h2 className="text-3xl font-bold text-warmgray-900 mb-2">
                      Rezultatul Calculului
                    </h2>
                    <p className="text-warmgray-600">
                      Pisica ta are <span className="font-bold text-lavender-600">{ageInMonths} {ageInMonths === 1 ? 'lună' : 'luni'}</span> 
                      {unit === 'years' && ` (${catAge} ${catAge === 1 ? 'an' : 'ani'})`}
                    </p>
                  </div>

                  {/* Human Age Display */}
                  <div className="bg-gradient-to-br from-lavender-50 to-rose-50 rounded-2xl p-8 mb-6 text-center">
                    <div className="text-sm text-warmgray-600 mb-2">Echivalent în ani oameni:</div>
                    <div className="text-7xl font-extrabold text-lavender-600 mb-2">
                      {humanAge}
                    </div>
                    <div className="text-xl text-warmgray-700 font-medium">
                      {humanAge === 1 ? 'an' : 'ani'} oameni
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className={`inline-flex items-center px-6 py-3 rounded-full ${category.color} mb-6`}>
                    <span className="text-lg font-bold">{category.label}</span>
                  </div>

                  {/* Category Description */}
                  <div className="bg-white rounded-lg p-6 border border-warmgray-200">
                    <p className="text-warmgray-700 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Age Comparison Table */}
                  <div className="mt-6 bg-warmgray-50 rounded-lg p-6">
                    <h3 className="font-bold text-warmgray-900 mb-4">📊 Tabel Comparativ</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center py-2 border-b border-warmgray-200">
                        <span className="text-warmgray-700">Vârsta pisicii:</span>
                        <span className="font-semibold text-warmgray-900">
                          {ageInMonths} {ageInMonths === 1 ? 'lună' : 'luni'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-warmgray-200">
                        <span className="text-warmgray-700">Echivalent oameni:</span>
                        <span className="font-semibold text-lavender-600">{humanAge} {humanAge === 1 ? 'an' : 'ani'}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-warmgray-700">Categorie:</span>
                        <span className={`font-semibold px-3 py-1 rounded-full ${category.color}`}>
                          {category.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Share Button */}
                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={() => {
                        const text = `Pisica mea are ${ageInMonths} ${ageInMonths === 1 ? 'lună' : 'luni'} = ${humanAge} ${humanAge === 1 ? 'an' : 'ani'} oameni! 🐱 Calculat pe Pisicopedia.ro`;
                        navigator.share?.({ text, url: window.location.href }) || 
                        navigator.clipboard.writeText(text + ' ' + window.location.href).then(() => alert('Link copiat!'));
                      }}
                      className="flex-1 px-6 py-3 bg-lavender-500 text-white rounded-lg hover:bg-lavender-600 transition-colors font-medium"
                    >
                      📤 Partajează Rezultatul
                    </button>
                    <button
                      onClick={() => {
                        setShowResult(false);
                        setCatAge(12);
                        setUnit('months');
                      }}
                      className="flex-1 px-6 py-3 bg-warmgray-100 text-warmgray-700 rounded-lg hover:bg-warmgray-200 transition-colors font-medium"
                    >
                      🔄 Calculează Din Nou
                    </button>
                  </div>
                </div>
              </Card>
            )}

            {/* Info Section */}
            <Card className="mb-8">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-warmgray-900 mb-4">
                  ℹ️ Despre Formula de Calcul
                </h2>
                <div className="prose prose-warmgray max-w-none">
                  <p className="text-warmgray-700 mb-4">
                    Formula folosită pentru calculul vârstei pisicii în ani oameni <strong>nu este simplu 1:7</strong>! 
                    Vârsta pisicilor se dezvoltă diferit în funcție de etapa vieții:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-warmgray-700 mb-4">
                    <li><strong>Primul an:</strong> 15 ani oameni (dezvoltare rapidă)</li>
                    <li><strong>Al doilea an:</strong> +9 ani (total 24 ani oameni)</li>
                    <li><strong>Ani următori:</strong> +4 ani oameni per an pisică</li>
                  </ul>
                  <p className="text-warmgray-700">
                    Această formulă este recunoscută de asociațiile veterinare internaționale și oferă 
                    o estimare mai precisă decât formula simplă 1:7.
                  </p>
                </div>
              </div>
            </Card>

            {/* Related Links */}
            <div className="bg-gradient-to-r from-lavender-100 to-rose-100 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-warmgray-900 mb-4">
                🔗 Resurse Utile
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="/ghiduri/ingrijire-senior"
                  className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="font-semibold text-warmgray-900 mb-1">
                    👴 Îngrijire Pisici Senior
                  </div>
                  <div className="text-sm text-warmgray-600">
                    Ghid complet pentru pisicile în vârstă
                  </div>
                </a>
                <a
                  href="/ghiduri/controale-veterinare"
                  className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="font-semibold text-warmgray-900 mb-1">
                    🏥 Controale Veterinare
                  </div>
                  <div className="text-sm text-warmgray-600">
                    Calendar complet de vizite la veterinar
                  </div>
                </a>
                <a
                  href="/tools/calculator-hrana"
                  className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="font-semibold text-warmgray-900 mb-1">
                    🍽️ Calculator Hrană Pisică
                  </div>
                  <div className="text-sm text-warmgray-600">
                    Calculează porțiile zilnice de hrană
                  </div>
                </a>
                <a
                  href="/tools"
                  className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="font-semibold text-warmgray-900 mb-1">
                    🛠️ Toate Tools-urile
                  </div>
                  <div className="text-sm text-warmgray-600">
                    Explorează toate calculatoarele disponibile
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

