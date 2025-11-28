import { Metadata } from 'next';
import Container from '@/components/common/Container';
import Card from '@/components/common/Card';

export const metadata: Metadata = {
  title: 'Despre Noi | Pisicopedia.ro',
  description: 'Aflați mai multe despre Pisicopedia.ro - enciclopedia completă despre rase și sănătatea pisicilor din România.',
};

export default function DesprePage() {
  return (
    <main className="py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-warmgray-900 mb-8">Despre Pisicopedia.ro</h1>

          <Card className="mb-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold text-warmgray-900 mb-4">Misiunea Noastră</h2>
              <p className="text-warmgray-700 mb-4">
                Pisicopedia.ro este o resursă educativă completă dedicată iubitorilor de pisici din România.
                Scopul nostru este să oferim informații profesionale, verificate și ușor de înțeles despre
                toate aspectele legate de îngrijirea, sănătatea și bunăstarea pisicilor.
              </p>

              <h2 className="text-2xl font-semibold text-warmgray-900 mb-4 mt-8">Ce Oferim</h2>
              <ul className="space-y-2 text-warmgray-700">
                <li>🐱 Ghid complet al raselor de pisici cu caracteristici detaliate</li>
                <li>🏥 Articole medicale despre boli, simptome și tratamente</li>
                <li>📚 Ghiduri practice pentru îngrijirea zilnică</li>
                <li>💡 Sfaturi de nutriție și comportament</li>
                <li>🔬 Informații bazate pe surse veterinare de încredere</li>
              </ul>

              <h2 className="text-2xl font-semibold text-warmgray-900 mb-4 mt-8">Echipa Noastră</h2>
              <p className="text-warmgray-700 mb-4">
                Conținutul Pisicopedia.ro este creat în colaborare cu medici veterinari, crescători
                profesioniști și specialiști în comportament felin. Fiecare articol este verificat
                pentru acuratețe și actualizat periodic cu cele mai noi informații din domeniu.
              </p>

              <div className="bg-lavender-50 border-l-4 border-rose-300 p-6 my-8 rounded-r-lg">
                <h3 className="text-lg font-semibold text-warmgray-900 mb-2">⚠️ Disclaimer Medical Important</h3>
                <p className="text-warmgray-700">
                  Informațiile prezentate pe Pisicopedia.ro au <strong>scop educativ și informativ</strong>.
                  Ele nu înlocuiesc consultația medicală veterinară profesională. Pentru orice problemă
                  de sănătate a pisicii dumneavoastră, vă rugăm să consultați întotdeauna un medic veterinar
                  autorizat. Diagnosticul și tratamentul corect pot fi stabilite doar în urma unei
                  examinări directe de către un specialist.
                </p>
              </div>

              <h2 className="text-2xl font-semibold text-warmgray-900 mb-4 mt-8">Angajamentul Nostru</h2>
              <p className="text-warmgray-700 mb-4">
                Ne angajăm să:
              </p>
              <ul className="space-y-2 text-warmgray-700">
                <li>✓ Oferim informații actualizate și verificate științific</li>
                <li>✓ Păstrăm un ton calm, profesional și empatic</li>
                <li>✓ Punem sănătatea și bunăstarea pisicilor pe primul loc</li>
                <li>✓ Rămânem o resursă gratuită și accesibilă pentru toți</li>
                <li>✓ Respectăm confidențialitatea vizitatorilor noștri</li>
              </ul>

              <h2 className="text-2xl font-semibold text-warmgray-900 mb-4 mt-8">Contact</h2>
              <p className="text-warmgray-700">
                Pentru sugestii, întrebări sau colaborări, ne puteți contacta la:{' '}
                <a href="mailto:contact@pisicopedia.ro" className="text-rose-500 hover:text-rose-600 font-medium">
                  contact@pisicopedia.ro
                </a>
              </p>
            </div>
          </Card>
        </div>
      </Container>
    </main>
  );
}