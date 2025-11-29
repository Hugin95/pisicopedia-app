import Container from '@/components/common/Container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer Medical - Pisicopedia',
  description: 'Disclaimer medical și informații importante despre conținutul site-ului Pisicopedia.ro',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-warmgray-50 via-white to-lavender-50">
      <Container>
        <div className="py-12 lg:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-warmgray-900 mb-4">
                Disclaimer Medical
              </h1>
              <p className="text-lg text-warmgray-600">
                Informații importante despre utilizarea site-ului Pisicopedia.ro
              </p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8">
              {/* Important Notice */}
              <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-amber-900 mb-3">
                  ⚠️ Notificare Importantă
                </h2>
                <p className="text-amber-800">
                  Informațiile prezentate pe Pisicopedia.ro au exclusiv scop informativ și educațional.
                  Acestea NU înlocuiesc consultația, diagnosticul sau tratamentul medical veterinar profesionist.
                </p>
              </div>

              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-bold text-warmgray-900 mb-4">
                  1. Scopul Informațiilor
                </h2>
                <p className="text-warmgray-700 mb-3">
                  Site-ul Pisicopedia.ro oferă informații generale despre pisici, inclusiv:
                </p>
                <ul className="list-disc list-inside space-y-2 text-warmgray-700 ml-4">
                  <li>Caracteristici ale diferitelor rase de pisici</li>
                  <li>Informații generale despre sănătate și îngrijire</li>
                  <li>Sfaturi de nutriție și comportament</li>
                  <li>Ghiduri educative pentru proprietarii de pisici</li>
                </ul>
                <p className="text-warmgray-700 mt-3">
                  Toate aceste informații sunt prezentate în scop educativ și nu constituie sfaturi medicale veterinare.
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-bold text-warmgray-900 mb-4">
                  2. Limitarea Răspunderii Medicale
                </h2>
                <p className="text-warmgray-700 mb-3">
                  Pisicopedia.ro și autorii săi:
                </p>
                <ul className="list-disc list-inside space-y-2 text-warmgray-700 ml-4">
                  <li>NU oferă diagnostic medical pentru pisica dumneavoastră</li>
                  <li>NU recomandă tratamente specifice sau medicamente</li>
                  <li>NU înlocuiesc consultația cu un medic veterinar calificat</li>
                  <li>NU garantează că informațiile sunt complete sau aplicabile situației specifice a pisicii dumneavoastră</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-bold text-warmgray-900 mb-4">
                  3. Când să Consultați un Veterinar
                </h2>
                <p className="text-warmgray-700 mb-3">
                  Consultați ÎNTOTDEAUNA un medic veterinar calificat pentru:
                </p>
                <ul className="list-disc list-inside space-y-2 text-warmgray-700 ml-4">
                  <li>Orice schimbare în comportamentul sau starea de sănătate a pisicii</li>
                  <li>Simptome de boală (vomă, diaree, letargie, pierdere de apetit, etc.)</li>
                  <li>Urgențe medicale de orice natură</li>
                  <li>Programe de vaccinare și deparazitare</li>
                  <li>Recomandări de dietă specifice</li>
                  <li>Tratamente preventive sau curative</li>
                  <li>Înainte de administrarea oricăror medicamente sau suplimente</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-bold text-warmgray-900 mb-4">
                  4. Urgențe Medicale
                </h2>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-red-800 font-semibold">
                    În caz de urgență medicală, contactați IMEDIAT medicul veterinar sau clinica veterinară de urgență!
                  </p>
                </div>
                <p className="text-warmgray-700">
                  Nu vă bazați pe informațiile de pe internet în situații de urgență.
                  Timpul este esențial în multe urgențe medicale veterinare.
                </p>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-bold text-warmgray-900 mb-4">
                  5. Acuratețea Informațiilor
                </h2>
                <p className="text-warmgray-700 mb-3">
                  Deși depunem toate eforturile pentru a oferi informații corecte și actualizate:
                </p>
                <ul className="list-disc list-inside space-y-2 text-warmgray-700 ml-4">
                  <li>Medicina veterinară evoluează constant</li>
                  <li>Fiecare pisică este unică și poate avea nevoi specifice</li>
                  <li>Informațiile pot deveni depășite sau incomplete</li>
                  <li>Pot exista erori neintenționate în conținut</li>
                </ul>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-bold text-warmgray-900 mb-4">
                  6. Utilizarea Informațiilor
                </h2>
                <p className="text-warmgray-700">
                  Utilizarea informațiilor de pe Pisicopedia.ro se face pe propria răspundere.
                  Nu ne asumăm răspunderea pentru consecințele utilizării informațiilor prezentate,
                  inclusiv, dar fără a se limita la, probleme de sănătate, pierderi financiare sau
                  alte daune directe sau indirecte.
                </p>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-bold text-warmgray-900 mb-4">
                  7. Relația cu Veterinarul
                </h2>
                <p className="text-warmgray-700 mb-3">
                  Încurajăm dezvoltarea unei relații de încredere cu medicul veterinar al pisicii dumneavoastră.
                  Un veterinar care cunoaște istoricul medical al pisicii este cea mai bună sursă de consiliere
                  medicală pentru animalul dumneavoastră de companie.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-2xl font-bold text-warmgray-900 mb-4">
                  8. Conținut Generat Automat
                </h2>
                <p className="text-warmgray-700">
                  Unele articole de pe site pot fi generate cu ajutorul inteligenței artificiale.
                  Aceste articole sunt marcate corespunzător și sunt revizuite, dar pot conține
                  informații generale care nu se aplică situației specifice a pisicii dumneavoastră.
                </p>
              </section>

              {/* Contact */}
              <section className="bg-lavender-50 rounded-lg p-6">
                <h2 className="text-xl font-bold text-warmgray-900 mb-3">
                  Contact și Întrebări
                </h2>
                <p className="text-warmgray-700 mb-3">
                  Pentru întrebări despre acest disclaimer sau despre conținutul site-ului,
                  vă rugăm să ne contactați la:
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-lavender-500 text-white rounded-lg hover:bg-lavender-600 transition-colors"
                >
                  Contactează-ne
                </a>
              </section>

              {/* Last Update */}
              <div className="text-center text-sm text-warmgray-500 pt-4 border-t">
                Ultima actualizare: Noiembrie 2024
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}