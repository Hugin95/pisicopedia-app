'use client';

import { useState } from 'react';
import Container from '@/components/common/Container';
import { Metadata } from 'next';

// Cat names data
const catNames = {
  female: {
    popular: [
      { name: 'Luna', meaning: 'După satelitul natural al Pământului, perfectă pentru pisici nocturne' },
      { name: 'Bella', meaning: 'Frumoasă în italiană, pentru pisici grațioase' },
      { name: 'Mia', meaning: 'A mea în italiană, pentru pisici devotate' },
      { name: 'Cleo', meaning: 'Scurt de la Cleopatra, pentru pisici regale' },
      { name: 'Zoe', meaning: 'Viață în greacă, pentru pisici pline de energie' },
      { name: 'Nora', meaning: 'Lumină, pentru pisici care luminează casa' },
      { name: 'Maya', meaning: 'Iluzie în sanscrită, pentru pisici misterioase' },
      { name: 'Sophie', meaning: 'Înțelepciune în greacă, pentru pisici inteligente' },
      { name: 'Lola', meaning: 'Pentru pisici jucăușe și pline de personalitate' },
      { name: 'Kira', meaning: 'Lumină în japoneză, pentru pisici strălucitoare' },
    ],
    romanian: [
      { name: 'Pufa', meaning: 'Pentru pisici pufoase și moi' },
      { name: 'Codruța', meaning: 'Nume românesc tradițional, pentru pisici elegante' },
      { name: 'Mița', meaning: 'Clasic românesc pentru pisici' },
      { name: 'Pisica', meaning: 'Simplu și direct' },
      { name: 'Prințesa', meaning: 'Pentru pisici care se cred regale' },
      { name: 'Steluța', meaning: 'Pentru pisici care strălucesc' },
      { name: 'Floarea', meaning: 'Pentru pisici delicate' },
      { name: 'Duduia', meaning: 'Pentru pisici cu atitudine' },
    ],
    cute: [
      { name: 'Cookie', meaning: 'Pentru pisici dulci ca o prăjitură' },
      { name: 'Muffin', meaning: 'Pentru pisici rotunde și drăgălașe' },
      { name: 'Pixie', meaning: 'Pentru pisici mici și năzdrăvane' },
      { name: 'Bubbles', meaning: 'Pentru pisici vesele și jucăușe' },
      { name: 'Pepper', meaning: 'Pentru pisici cu temperament' },
      { name: 'Ginger', meaning: 'Perfect pentru pisici roșcate' },
      { name: 'Honey', meaning: 'Pentru pisici dulci și afectuoase' },
      { name: 'Daisy', meaning: 'Pentru pisici delicate ca o floare' },
    ],
  },
  male: {
    popular: [
      { name: 'Max', meaning: 'Cel mai mare, pentru pisici dominante' },
      { name: 'Oliver', meaning: 'Pentru pisici distinse și elegante' },
      { name: 'Leo', meaning: 'Leu în latină, pentru pisici curajoase' },
      { name: 'Charlie', meaning: 'Pentru pisici prietenoase' },
      { name: 'Milo', meaning: 'Pentru pisici blânde și afectuoase' },
      { name: 'Felix', meaning: 'Fericit în latină, pentru pisici vesele' },
      { name: 'Oscar', meaning: 'Pentru pisici cu personalitate' },
      { name: 'Simba', meaning: 'Leu în swahili, pentru pisici regale' },
      { name: 'Tom', meaning: 'Clasic pentru motani' },
      { name: 'Shadow', meaning: 'Pentru pisici negre sau misterioase' },
    ],
    romanian: [
      { name: 'Motan', meaning: 'Clasic românesc pentru pisici mascul' },
      { name: 'Rică', meaning: 'Nume tradițional românesc' },
      { name: 'Mitică', meaning: 'Diminutiv afectuos' },
      { name: 'Negru', meaning: 'Pentru motani negri' },
      { name: 'Prinț', meaning: 'Pentru motani cu aere regale' },
      { name: 'Ursu', meaning: 'Pentru motani mari și pufoși' },
      { name: 'Pisi', meaning: 'Generic și drăgălaș' },
      { name: 'Fulger', meaning: 'Pentru motani rapizi' },
    ],
    strong: [
      { name: 'Thor', meaning: 'Zeul tunetului, pentru motani puternici' },
      { name: 'Zeus', meaning: 'Regele zeilor, pentru motani dominanți' },
      { name: 'Rex', meaning: 'Rege în latină' },
      { name: 'Duke', meaning: 'Duce, pentru motani nobili' },
      { name: 'Rocky', meaning: 'Pentru motani puternici și rezistenți' },
      { name: 'Hunter', meaning: 'Vânător, pentru motani cu instinct' },
      { name: 'Diesel', meaning: 'Pentru motani puternici' },
      { name: 'Atlas', meaning: 'Pentru motani mari și puternici' },
    ],
  },
  unisex: {
    colors: [
      { name: 'Smokey', meaning: 'Pentru pisici gri sau cu blană fumegată' },
      { name: 'Oreo', meaning: 'Pentru pisici alb-negre' },
      { name: 'Midnight', meaning: 'Pentru pisici negre' },
      { name: 'Snow', meaning: 'Pentru pisici albe' },
      { name: 'Rusty', meaning: 'Pentru pisici roșcate' },
      { name: 'Caramel', meaning: 'Pentru pisici cu blană maro deschis' },
      { name: 'Silver', meaning: 'Pentru pisici argintii' },
      { name: 'Marble', meaning: 'Pentru pisici cu blană marmorată' },
    ],
    personality: [
      { name: 'Ninja', meaning: 'Pentru pisici silențioase și agile' },
      { name: 'Bandit', meaning: 'Pentru pisici năzdrăvane' },
      { name: 'Lucky', meaning: 'Pentru pisici norocoase' },
      { name: 'Rebel', meaning: 'Pentru pisici independente' },
      { name: 'Spirit', meaning: 'Pentru pisici cu personalitate puternică' },
      { name: 'Jazz', meaning: 'Pentru pisici cu ritm propriu' },
      { name: 'Storm', meaning: 'Pentru pisici energice' },
      { name: 'Echo', meaning: 'Pentru pisici vocale' },
    ],
    food: [
      { name: 'Biscuit', meaning: 'Pentru pisici drăgălașe' },
      { name: 'Peanut', meaning: 'Pentru pisici mici' },
      { name: 'Mocha', meaning: 'Pentru pisici cu blană cafenie' },
      { name: 'Sushi', meaning: 'Pentru pisici care adoră peștele' },
      { name: 'Churro', meaning: 'Pentru pisici dulci' },
      { name: 'Noodle', meaning: 'Pentru pisici lungi și subțiri' },
      { name: 'Mochi', meaning: 'Pentru pisici rotunde și moi' },
      { name: 'Tofu', meaning: 'Pentru pisici albe și pufoase' },
    ],
  },
};

export default function NumePisiciPage() {
  const [selectedGender, setSelectedGender] = useState<'female' | 'male' | 'unisex'>('female');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter names based on search
  const filterNames = (names: any[]) => {
    if (!searchQuery) return names;
    return names.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warmgray-50 via-white to-lavender-50">
      <Container>
        <div className="py-12 lg:py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-warmgray-900 mb-4">
              Nume pentru Pisici
            </h1>
            <p className="text-lg text-warmgray-600 max-w-3xl mx-auto">
              Găsește numele perfect pentru noua ta pisică. Colecție de peste 100 de nume
              cu semnificații pentru toate gusturile și personalitățile.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-warmgray-700 mb-2">
                  Caută nume
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ex: Luna, Felix, Lucky..."
                  className="w-full px-4 py-2 border border-warmgray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-warmgray-700 mb-2">
                  Categorie
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedGender('female')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedGender === 'female'
                        ? 'bg-pink-500 text-white'
                        : 'bg-warmgray-100 text-warmgray-700 hover:bg-warmgray-200'
                    }`}
                  >
                    ♀ Femele
                  </button>
                  <button
                    onClick={() => setSelectedGender('male')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedGender === 'male'
                        ? 'bg-blue-500 text-white'
                        : 'bg-warmgray-100 text-warmgray-700 hover:bg-warmgray-200'
                    }`}
                  >
                    ♂ Masculi
                  </button>
                  <button
                    onClick={() => setSelectedGender('unisex')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedGender === 'unisex'
                        ? 'bg-purple-500 text-white'
                        : 'bg-warmgray-100 text-warmgray-700 hover:bg-warmgray-200'
                    }`}
                  >
                    ⚥ Unisex
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Name Categories */}
          <div className="space-y-8">
            {selectedGender === 'female' && (
              <>
                <NameSection
                  title="🌟 Nume Populare pentru Pisici Femele"
                  names={filterNames(catNames.female.popular)}
                  color="pink"
                />
                <NameSection
                  title="🇷🇴 Nume Românești pentru Pisici"
                  names={filterNames(catNames.female.romanian)}
                  color="rose"
                />
                <NameSection
                  title="💕 Nume Drăgălașe"
                  names={filterNames(catNames.female.cute)}
                  color="purple"
                />
              </>
            )}

            {selectedGender === 'male' && (
              <>
                <NameSection
                  title="⭐ Nume Populare pentru Motani"
                  names={filterNames(catNames.male.popular)}
                  color="blue"
                />
                <NameSection
                  title="🇷🇴 Nume Românești pentru Motani"
                  names={filterNames(catNames.male.romanian)}
                  color="indigo"
                />
                <NameSection
                  title="💪 Nume Puternice"
                  names={filterNames(catNames.male.strong)}
                  color="slate"
                />
              </>
            )}

            {selectedGender === 'unisex' && (
              <>
                <NameSection
                  title="🎨 Nume după Culoare"
                  names={filterNames(catNames.unisex.colors)}
                  color="amber"
                />
                <NameSection
                  title="✨ Nume după Personalitate"
                  names={filterNames(catNames.unisex.personality)}
                  color="emerald"
                />
                <NameSection
                  title="🍰 Nume Inspirate din Mâncare"
                  names={filterNames(catNames.unisex.food)}
                  color="orange"
                />
              </>
            )}
          </div>

          {/* Tips Section */}
          <div className="mt-16 bg-gradient-to-r from-lavender-100 to-rose-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-warmgray-900 mb-6">
              💡 Sfaturi pentru Alegerea Numelui Perfect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-lavender-600 mr-2">✓</span>
                  <p className="text-warmgray-700">Alege un nume scurt (1-2 silabe) pentru a fi ușor de reținut</p>
                </div>
                <div className="flex items-start">
                  <span className="text-lavender-600 mr-2">✓</span>
                  <p className="text-warmgray-700">Evită nume care sună similar cu comenzi (ex: "Sit" vs "Kit")</p>
                </div>
                <div className="flex items-start">
                  <span className="text-lavender-600 mr-2">✓</span>
                  <p className="text-warmgray-700">Testează numele câteva zile înainte de a-l face permanent</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-lavender-600 mr-2">✓</span>
                  <p className="text-warmgray-700">Ia în considerare personalitatea și aspectul pisicii</p>
                </div>
                <div className="flex items-start">
                  <span className="text-lavender-600 mr-2">✓</span>
                  <p className="text-warmgray-700">Asigură-te că toți membrii familiei pot pronunța numele</p>
                </div>
                <div className="flex items-start">
                  <span className="text-lavender-600 mr-2">✓</span>
                  <p className="text-warmgray-700">Un nume unic ajută la identificarea pisicii la veterinar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Name Generator Teaser */}
          <div className="mt-16 text-center bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-warmgray-900 mb-4">
              🎲 Generator de Nume Aleatorii
            </h2>
            <p className="text-warmgray-600 mb-6">
              Nu te poți decide? Lasă-ne să alegem pentru tine!
            </p>
            <button
              onClick={() => {
                const allNames = [
                  ...catNames.female.popular,
                  ...catNames.male.popular,
                  ...catNames.unisex.personality
                ];
                const randomName = allNames[Math.floor(Math.random() * allNames.length)];
                alert(`Sugestia noastră: ${randomName.name} - ${randomName.meaning}`);
              }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-xl transition-shadow"
            >
              🎯 Generează un Nume Aleatoriu
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

// Name section component
function NameSection({ title, names, color }: { title: string; names: any[]; color: string }) {
  const bgColors: any = {
    pink: 'bg-pink-50',
    rose: 'bg-rose-50',
    purple: 'bg-purple-50',
    blue: 'bg-blue-50',
    indigo: 'bg-indigo-50',
    slate: 'bg-slate-50',
    amber: 'bg-amber-50',
    emerald: 'bg-emerald-50',
    orange: 'bg-orange-50',
  };

  if (names.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <h2 className="text-2xl font-bold text-warmgray-900 mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {names.map((item) => (
          <div
            key={item.name}
            className={`${bgColors[color]} rounded-lg p-4 hover:shadow-md transition-shadow`}
          >
            <h3 className="font-bold text-lg text-warmgray-900 mb-1">{item.name}</h3>
            <p className="text-sm text-warmgray-600">{item.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  );
}