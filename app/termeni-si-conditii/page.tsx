import { Metadata } from 'next';
import Container from '@/components/common/Container';
import Card from '@/components/common/Card';

export const metadata: Metadata = {
  title: 'Termeni și Condiții | Pisicopedia.ro',
  description: 'Termenii și condițiile de utilizare a site-ului Pisicopedia.ro.',
};

export default function TermeniPage() {
  return (
    <main className="py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-warmgray-900 mb-8">Termeni și Condiții</h1>

          <Card>
            <div className="prose prose-lg max-w-none">
              <p className="text-warmgray-700 mb-4">
                <strong>Ultima actualizare: Noiembrie 2024</strong>
              </p>

              <h2 className="text-2xl font-semibold text-warmgray-900 mb-4">1. Acceptarea Termenilor</h2>
              <p className="text-warmgray-700 mb-4">
                Prin accesarea și utilizarea site-ului Pisicopedia.ro, acceptați să respectați acești
                termeni și condiții. Dacă nu sunteți de acord cu vreunul dintre termeni, vă rugăm să
                nu utilizați acest site.
              </p>

              <h2 className="text-2xl font-semibold text-warmgray-900 mb-4 mt-8">2. Scopul Site-ului</h2>
              <p className="text-warmgray-700 mb-4">
                Pisicopedia.ro este un site informativ și educativ despre pisici. Conținutul oferit
                are scop pur informativ și nu înlocuiește consultația veterinară profesională.
              </p>

              <h2 className="text-2xl font-semibold text-warmgray-900 mb-4 mt-8">3. Disclaimer Medical</h2>
              <p className="text-warmgray-700 mb-4">
                Informațiile medicale prezentate pe site sunt oferite doar în scop educativ. Pentru
                orice problemă de sănătate a animalului dumneavoastră, consultați întotdeauna un
                medic veterinar autorizat. Nu ne asumăm responsabilitatea pentru decizii luate pe
                baza informațiilor de pe acest site.
              </p>

              <h2 className="text-2xl font-semibold text-warmgray-900 mb-4 mt-8">4. Drepturi de Autor</h2>
              <p className="text-warmgray-700 mb-4">
                Tot conținutul site-ului (texte, imagini, design) este protejat de legile drepturilor
                de autor. Reproducerea sau distribuirea fără acordul nostru scris este interzisă.
              </p>

              <h2 className="text-2xl font-semibold text-warmgray-900 mb-4 mt-8">5. Limitarea Răspunderii</h2>
              <p className="text-warmgray-700 mb-4">
                Pisicopedia.ro nu își asumă răspunderea pentru:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-warmgray-700 mb-4">
                <li>Daune directe sau indirecte rezultate din utilizarea informațiilor de pe site</li>
                <li>Erori sau omisiuni în conținutul publicat</li>
                <li>Probleme tehnice sau întreruperi ale serviciului</li>
                <li>Conținutul site-urilor externe către care avem link-uri</li>
              </ul>

              <h2 className="text-2xl font-semibold text-warmgray-900 mb-4 mt-8">6. Utilizarea Acceptabilă</h2>
              <p className="text-warmgray-700 mb-4">
                Utilizatorii se obligă să:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-warmgray-700 mb-4">
                <li>Nu folosească site-ul în scopuri ilegale sau neautorizate</li>
                <li>Nu distribuie conținut ofensator sau dăunător</li>
                <li>Nu încerce să acceseze neautorizat sistemele noastre</li>
                <li>Respecte drepturile de autor și proprietate intelectuală</li>
              </ul>

              <h2 className="text-2xl font-semibold text-warmgray-900 mb-4 mt-8">7. Modificări ale Termenilor</h2>
              <p className="text-warmgray-700 mb-4">
                Ne rezervăm dreptul de a modifica acești termeni în orice moment. Modificările intră
                în vigoare imediat după publicarea pe site. Utilizarea continuă a site-ului după
                modificări constituie acceptarea noilor termeni.
              </p>

              <h2 className="text-2xl font-semibold text-warmgray-900 mb-4 mt-8">8. Legea Aplicabilă</h2>
              <p className="text-warmgray-700 mb-4">
                Acești termeni sunt guvernați de legile din România. Orice dispută va fi soluționată
                de instanțele competente din România.
              </p>

              <h2 className="text-2xl font-semibold text-warmgray-900 mb-4 mt-8">9. Contact</h2>
              <p className="text-warmgray-700">
                Pentru întrebări despre acești termeni, ne puteți contacta la:{' '}
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