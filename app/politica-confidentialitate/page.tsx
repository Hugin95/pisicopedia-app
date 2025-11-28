import { Metadata } from 'next';
import Container from '@/components/common/Container';
import Card from '@/components/common/Card';

export const metadata: Metadata = {
  title: 'Politica de Confidențialitate | Pisicopedia.ro',
  description: 'Politica de confidențialitate și protecția datelor personale pe Pisicopedia.ro.',
};

export default function PoliticaPage() {
  return (
    <main className="py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-warmgray-900 mb-8">Politica de Confidențialitate</h1>

          <Card>
            <div className="prose prose-lg max-w-none">
              <p className="text-warmgray-700 mb-4">
                <strong>Ultima actualizare: Noiembrie 2024</strong>
              </p>

              <h2 className="text-2xl font-semibold text-warmgray-900 mb-4">1. Introducere</h2>
              <p className="text-warmgray-700 mb-4">
                Pisicopedia.ro respectă confidențialitatea vizitatorilor săi. Această politică
                descrie cum colectăm, folosim și protejăm informațiile dumneavoastră.
              </p>

              <h2 className="text-2xl font-semibold text-warmgray-900 mb-4 mt-8">2. Informații Colectate</h2>
              <p className="text-warmgray-700 mb-4">
                Pisicopedia.ro colectează minimal de date:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-warmgray-700 mb-4">
                <li>Date de trafic anonimizate (pagini vizitate, timp petrecut)</li>
                <li>Informații tehnice (browser, dispozitiv, sistem de operare)</li>
                <li>Date furnizate voluntar prin formularul de contact</li>
              </ul>

              <h2 className="text-2xl font-semibold text-warmgray-900 mb-4 mt-8">3. Utilizarea Informațiilor</h2>
              <p className="text-warmgray-700 mb-4">
                Folosim informațiile colectate pentru:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-warmgray-700 mb-4">
                <li>Îmbunătățirea conținutului și experienței utilizatorilor</li>
                <li>Răspunderea la întrebările trimise prin formularul de contact</li>
                <li>Analiza statistică a traficului site-ului</li>
                <li>Detectarea și prevenirea problemelor tehnice</li>
              </ul>

              <h2 className="text-2xl font-semibold text-warmgray-900 mb-4 mt-8">4. Cookie-uri</h2>
              <p className="text-warmgray-700 mb-4">
                Site-ul folosește cookie-uri esențiale pentru funcționare și cookie-uri analitice
                pentru îmbunătățirea experienței. Puteți dezactiva cookie-urile din setările
                browser-ului, dar acest lucru poate afecta funcționalitatea site-ului.
              </p>

              <h2 className="text-2xl font-semibold text-warmgray-900 mb-4 mt-8">5. Partajarea Datelor</h2>
              <p className="text-warmgray-700 mb-4">
                Nu vindem, închiriem sau partajăm datele personale cu terți, cu excepția:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-warmgray-700 mb-4">
                <li>Când este cerut de lege sau autorități competente</li>
                <li>Pentru protejarea drepturilor și siguranței noastre sau a altora</li>
              </ul>

              <h2 className="text-2xl font-semibold text-warmgray-900 mb-4 mt-8">6. Securitatea Datelor</h2>
              <p className="text-warmgray-700 mb-4">
                Implementăm măsuri de securitate rezonabile pentru protejarea datelor colectate.
                Cu toate acestea, nicio metodă de transmitere pe internet nu este 100% sigură.
              </p>

              <h2 className="text-2xl font-semibold text-warmgray-900 mb-4 mt-8">7. Drepturile Dumneavoastră</h2>
              <p className="text-warmgray-700 mb-4">
                Aveți dreptul să:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-warmgray-700 mb-4">
                <li>Accesați datele personale pe care le deținem despre dumneavoastră</li>
                <li>Solicitați corectarea datelor inexacte</li>
                <li>Solicitați ștergerea datelor personale</li>
                <li>Vă opuneți procesării datelor</li>
                <li>Retrageți consimțământul în orice moment</li>
              </ul>

              <h2 className="text-2xl font-semibold text-warmgray-900 mb-4 mt-8">8. Copii</h2>
              <p className="text-warmgray-700 mb-4">
                Site-ul nu colectează în mod deliberat informații de la copii sub 13 ani.
                Dacă sunteți părinte și credeți că copilul dumneavoastră ne-a furnizat date
                personale, vă rugăm să ne contactați.
              </p>

              <h2 className="text-2xl font-semibold text-warmgray-900 mb-4 mt-8">9. Modificări ale Politicii</h2>
              <p className="text-warmgray-700 mb-4">
                Ne rezervăm dreptul de a actualiza această politică. Modificările vor fi
                publicate pe această pagină cu data actualizării.
              </p>

              <h2 className="text-2xl font-semibold text-warmgray-900 mb-4 mt-8">10. Contact</h2>
              <p className="text-warmgray-700">
                Pentru întrebări despre această politică sau despre datele dumneavoastră, contactați-ne la:{' '}
                <a href="mailto:contact@pisicopedia.ro" className="text-rose-500 hover:text-rose-600">
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