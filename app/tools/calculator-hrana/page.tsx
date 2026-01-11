'use client';

import { useState } from 'react';
import Container from '@/components/common/Container';
import Card from '@/components/common/Card';

// Formula pentru calculul hranei zilnice (kcal/zi)
// MER (Maintenance Energy Requirement) = 70 * (greutate_kg ^ 0.75)
// Apoi ajustăm pentru vârstă, activitate, sterilizare
function calculateDailyCalories(
  weight: number,
  age: 'kitten' | 'adult' | 'senior',
  activity: 'low' | 'medium' | 'high',
  isNeutered: boolean,
  isPregnant: boolean,
  isNursing: boolean
): number {
  // MER (Maintenance Energy Requirement) - formula standard
  const mer = 70 * Math.pow(weight, 0.75);
  
  let calories = mer;
  
  // Ajustări pentru vârstă
  if (age === 'kitten') {
    // Pui: 2-3x MER (în funcție de vârstă exactă, folosim 2.5x)
    calories = mer * 2.5;
  } else if (age === 'senior') {
    // Senior: 0.9x MER (metabolism mai lent)
    calories = mer * 0.9;
  }
  
  // Ajustări pentru activitate
  if (activity === 'low') {
    calories *= 0.9; // Pisici sedentare
  } else if (activity === 'high') {
    calories *= 1.3; // Pisici foarte active
  }
  
  // Ajustări pentru sterilizare
  if (isNeutered && age === 'adult') {
    calories *= 0.8; // Pisici sterilizate au nevoie de 20% mai puține calorii
  }
  
  // Ajustări pentru sarcină/alăptare
  if (isPregnant) {
    calories = mer * 1.6; // Sarcină: +60% calorii
  } else if (isNursing) {
    calories = mer * 2.5; // Alăptare: +150% calorii (depinde de numărul de pui)
  }
  
  return Math.round(calories);
}

// Convertește calorii în grame de hrană (în funcție de tipul hranei)
function caloriesToGrams(calories: number, foodType: 'dry' | 'wet' | 'mixed'): {
  dry: number;
  wet: number;
  mixed: { dry: number; wet: number };
} {
  // Calorii per 100g:
  // Hrană uscată: ~350-400 kcal/100g (media 375)
  // Hrană umedă: ~70-90 kcal/100g (media 80)
  
  const dryKcalPer100g = 375;
  const wetKcalPer100g = 80;
  
  const dryGrams = Math.round((calories / dryKcalPer100g) * 100);
  const wetGrams = Math.round((calories / wetKcalPer100g) * 100);
  
  // Mixed: 70% uscată + 30% umedă (recomandare standard)
  const mixedDryGrams = Math.round((calories * 0.7 / dryKcalPer100g) * 100);
  const mixedWetGrams = Math.round((calories * 0.3 / wetKcalPer100g) * 100);
  
  return {
    dry: dryGrams,
    wet: wetGrams,
    mixed: {
      dry: mixedDryGrams,
      wet: mixedWetGrams,
    },
  };
}

export default function CalculatorHranaPage() {
  const [weight, setWeight] = useState<number>(4);
  const [age, setAge] = useState<'kitten' | 'adult' | 'senior'>('adult');
  const [activity, setActivity] = useState<'low' | 'medium' | 'high'>('medium');
  const [isNeutered, setIsNeutered] = useState<boolean>(true);
  const [isPregnant, setIsPregnant] = useState<boolean>(false);
  const [isNursing, setIsNursing] = useState<boolean>(false);
  const [foodType, setFoodType] = useState<'dry' | 'wet' | 'mixed'>('mixed');
  const [showResult, setShowResult] = useState(false);

  const handleCalculate = () => {
    setShowResult(true);
  };

  const dailyCalories = calculateDailyCalories(
    weight,
    age,
    activity,
    isNeutered,
    isPregnant,
    isNursing
  );
  
  const foodAmounts = caloriesToGrams(dailyCalories, foodType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-warmgray-50 via-white to-orange-50">
      <Container>
        <div className="py-12 lg:py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-warmgray-900 mb-4">
              🍽️ Calculator Hrană Pisică
            </h1>
            <p className="text-lg text-warmgray-600 max-w-3xl mx-auto">
              Calculează cantitatea exactă de hrană de care are nevoie pisica ta zilnic. 
              Personalizat după greutate, vârstă, nivel de activitate și stare de sănătate.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Calculator Card */}
            <Card className="mb-8">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-warmgray-900 mb-6">
                  Introdu Datele Pisicii
                </h2>

                {/* Weight Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-warmgray-700 mb-2">
                    Greutatea pisicii (kg):
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0.5"
                      max="15"
                      step="0.1"
                      value={weight}
                      onChange={(e) => {
                        setWeight(parseFloat(e.target.value) || 0);
                        setShowResult(false);
                      }}
                      className="w-full px-4 py-3 text-2xl font-bold text-center border-2 border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-warmgray-500 font-medium">
                      kg
                    </div>
                  </div>
                  <p className="text-sm text-warmgray-500 mt-2">
                    Greutatea ideală pentru majoritatea pisicilor este între 3-5 kg
                  </p>
                </div>

                {/* Age Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-warmgray-700 mb-3">
                    Vârsta pisicii:
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['kitten', 'adult', 'senior'] as const).map((ageOption) => (
                      <button
                        key={ageOption}
                        onClick={() => {
                          setAge(ageOption);
                          setShowResult(false);
                        }}
                        className={`px-4 py-3 rounded-lg font-medium transition-all ${
                          age === ageOption
                            ? 'bg-orange-500 text-white shadow-md'
                            : 'bg-warmgray-100 text-warmgray-700 hover:bg-warmgray-200'
                        }`}
                      >
                        {ageOption === 'kitten' && '🐱 Pui (<1 an)'}
                        {ageOption === 'adult' && '🐈 Adultă (1-7 ani)'}
                        {ageOption === 'senior' && '👴 Senior (7+ ani)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Activity Level */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-warmgray-700 mb-3">
                    Nivel de activitate:
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['low', 'medium', 'high'] as const).map((activityOption) => (
                      <button
                        key={activityOption}
                        onClick={() => {
                          setActivity(activityOption);
                          setShowResult(false);
                        }}
                        className={`px-4 py-3 rounded-lg font-medium transition-all text-sm ${
                          activity === activityOption
                            ? 'bg-orange-500 text-white shadow-md'
                            : 'bg-warmgray-100 text-warmgray-700 hover:bg-warmgray-200'
                        }`}
                      >
                        {activityOption === 'low' && '😴 Scăzut'}
                        {activityOption === 'medium' && '🏃 Normal'}
                        {activityOption === 'high' && '⚡ Ridicat'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Conditions */}
                <div className="mb-6 space-y-3">
                  <label className="block text-sm font-medium text-warmgray-700 mb-3">
                    Condiții speciale:
                  </label>
                  
                  <label className="flex items-center space-x-3 p-3 bg-warmgray-50 rounded-lg cursor-pointer hover:bg-warmgray-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={isNeutered}
                      onChange={(e) => {
                        setIsNeutered(e.target.checked);
                        setShowResult(false);
                      }}
                      className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                    />
                    <span className="text-warmgray-700">✅ Sterilizată/Castrată</span>
                  </label>

                  <label className="flex items-center space-x-3 p-3 bg-warmgray-50 rounded-lg cursor-pointer hover:bg-warmgray-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={isPregnant}
                      onChange={(e) => {
                        setIsPregnant(e.target.checked);
                        if (e.target.checked) setIsNursing(false);
                        setShowResult(false);
                      }}
                      className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                    />
                    <span className="text-warmgray-700">🤰 Gestantă (sarcină)</span>
                  </label>

                  <label className="flex items-center space-x-3 p-3 bg-warmgray-50 rounded-lg cursor-pointer hover:bg-warmgray-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={isNursing}
                      onChange={(e) => {
                        setIsNursing(e.target.checked);
                        if (e.target.checked) setIsPregnant(false);
                        setShowResult(false);
                      }}
                      className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                    />
                    <span className="text-warmgray-700">🍼 Alăptează (lactație)</span>
                  </label>
                </div>

                {/* Food Type Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-warmgray-700 mb-3">
                    Tipul de hrană:
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['dry', 'wet', 'mixed'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setFoodType(type);
                          setShowResult(false);
                        }}
                        className={`px-4 py-3 rounded-lg font-medium transition-all ${
                          foodType === type
                            ? 'bg-orange-500 text-white shadow-md'
                            : 'bg-warmgray-100 text-warmgray-700 hover:bg-warmgray-200'
                        }`}
                      >
                        {type === 'dry' && '🥘 Uscată'}
                        {type === 'wet' && '🥫 Umedă'}
                        {type === 'mixed' && '🍽️ Mixtă'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculate Button */}
                <button
                  onClick={handleCalculate}
                  className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  🍽️ Calculează Porțiile Zilnice
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
                  </div>

                  {/* Daily Calories Display */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 mb-6 text-center">
                    <div className="text-sm text-warmgray-600 mb-2">Calorii zilnice necesare:</div>
                    <div className="text-7xl font-extrabold text-orange-600 mb-2">
                      {dailyCalories}
                    </div>
                    <div className="text-xl text-warmgray-700 font-medium">
                      kcal/zi
                    </div>
                  </div>

                  {/* Food Amounts */}
                  <div className="space-y-4 mb-6">
                    {foodType === 'dry' && (
                      <div className="bg-white rounded-lg p-6 border-2 border-orange-200">
                        <h3 className="text-xl font-bold text-warmgray-900 mb-2">
                          🥘 Hrană Uscată
                        </h3>
                        <div className="text-4xl font-extrabold text-orange-600 mb-2">
                          {foodAmounts.dry} g
                        </div>
                        <p className="text-warmgray-600 text-sm">
                          pe zi (împărțită în 2-3 mese)
                        </p>
                      </div>
                    )}

                    {foodType === 'wet' && (
                      <div className="bg-white rounded-lg p-6 border-2 border-orange-200">
                        <h3 className="text-xl font-bold text-warmgray-900 mb-2">
                          🥫 Hrană Umedă
                        </h3>
                        <div className="text-4xl font-extrabold text-orange-600 mb-2">
                          {foodAmounts.wet} g
                        </div>
                        <p className="text-warmgray-600 text-sm">
                          pe zi (împărțită în 2-3 mese)
                        </p>
                      </div>
                    )}

                    {foodType === 'mixed' && (
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-6 border-2 border-orange-200">
                          <h3 className="text-xl font-bold text-warmgray-900 mb-2">
                            🥘 Hrană Uscată (70%)
                          </h3>
                          <div className="text-4xl font-extrabold text-orange-600 mb-2">
                            {foodAmounts.mixed.dry} g
                          </div>
                          <p className="text-warmgray-600 text-sm">
                            pe zi
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-6 border-2 border-orange-200">
                          <h3 className="text-xl font-bold text-warmgray-900 mb-2">
                            🥫 Hrană Umedă (30%)
                          </h3>
                          <div className="text-4xl font-extrabold text-orange-600 mb-2">
                            {foodAmounts.mixed.wet} g
                          </div>
                          <p className="text-warmgray-600 text-sm">
                            pe zi
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Recommendations */}
                  <div className="bg-warmgray-50 rounded-lg p-6 mb-6">
                    <h3 className="font-bold text-warmgray-900 mb-3">💡 Recomandări:</h3>
                    <ul className="space-y-2 text-sm text-warmgray-700">
                      <li>• Împarte hrana în 2-3 mese pe zi</li>
                      <li>• Asigură-te că pisica are acces constant la apă proaspătă</li>
                      <li>• Monitorizează greutatea și ajustează porțiile dacă e necesar</li>
                      <li>• Consultă un veterinar pentru diete speciale sau probleme de sănătate</li>
                    </ul>
                  </div>

                  {/* Share Button */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        const text = `Pisica mea (${weight}kg, ${age === 'kitten' ? 'pui' : age === 'adult' ? 'adultă' : 'senior'}) are nevoie de ${dailyCalories} kcal/zi! 🐱 Calculat pe Pisicopedia.ro`;
                        navigator.share?.({ text, url: window.location.href }) || 
                        navigator.clipboard.writeText(text + ' ' + window.location.href).then(() => alert('Link copiat!'));
                      }}
                      className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                    >
                      📤 Partajează Rezultatul
                    </button>
                    <button
                      onClick={() => {
                        setShowResult(false);
                        setWeight(4);
                        setAge('adult');
                        setActivity('medium');
                        setIsNeutered(true);
                        setIsPregnant(false);
                        setIsNursing(false);
                        setFoodType('mixed');
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
                    Calculatorul folosește formula <strong>MER (Maintenance Energy Requirement)</strong>, 
                    recunoscută de asociațiile veterinare internaționale:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-warmgray-700 mb-4">
                    <li><strong>MER de bază:</strong> 70 × (greutate_kg ^ 0.75)</li>
                    <li><strong>Pui:</strong> 2.5× MER (dezvoltare rapidă)</li>
                    <li><strong>Senior:</strong> 0.9× MER (metabolism mai lent)</li>
                    <li><strong>Sterilizată:</strong> 0.8× MER (risc mai mic de obezitate)</li>
                    <li><strong>Activitate:</strong> ±10-30% în funcție de nivel</li>
                  </ul>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                    <p className="text-yellow-800 text-sm">
                      ⚠️ <strong>Important:</strong> Rezultatele sunt orientative. Pentru diete speciale, 
                      probleme de sănătate sau pisici cu nevoi particulare, consultă întotdeauna un medic veterinar.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Related Links */}
            <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-warmgray-900 mb-4">
                🔗 Resurse Utile
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="/ghiduri/calculare-portii"
                  className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="font-semibold text-warmgray-900 mb-1">
                    📊 Ghid Calculare Porții
                  </div>
                  <div className="text-sm text-warmgray-600">
                    Ghid complet despre calcularea porțiilor
                  </div>
                </a>
                <a
                  href="/ghiduri/hrana-uscata-vs-umeda"
                  className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="font-semibold text-warmgray-900 mb-1">
                    🍽️ Hrană Uscată vs Umedă
                  </div>
                  <div className="text-sm text-warmgray-600">
                    Comparație detaliată între tipurile de hrană
                  </div>
                </a>
                <a
                  href="/tools/calculator-varsta"
                  className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="font-semibold text-warmgray-900 mb-1">
                    🧮 Calculator Vârstă Pisică
                  </div>
                  <div className="text-sm text-warmgray-600">
                    Află vârsta pisicii în ani oameni
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

