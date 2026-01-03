import Link from 'next/link';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import SearchBar from '@/components/forms/SearchBar';
import BreedCard from '@/components/breeds/BreedCard';
import ArticleCard from '@/components/articles/ArticleCard';
import GuideCard from '@/components/guides/GuideCard';
import WhyPisicopedia from '@/components/common/WhyPisicopedia';
import BannerPlaceholder from '@/components/layout/BannerPlaceholder';
import { getTopBreeds, getLatestArticles, getTopGuides } from '@/lib/data';
import { Article, Breed, Guide } from '@/types';

export default async function HomePage() {
  const popularBreeds = await getTopBreeds(6);
  const recentArticles = await getLatestArticles(3);
  const topGuides = await getTopGuides(3);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-soft pt-20 pb-16">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-warmgray-900 mb-6">
              Enciclopedia Completă a{' '}
              <span className="text-lavender-600">Raselor</span> și{' '}
              <span className="text-rose-500">Sănătății</span> Pisicilor
            </h1>
            <p className="text-lg md:text-xl text-warmgray-600 mb-8">
              Informații medicale verificate și ghiduri complete pentru îngrijirea optimă a pisicii tale.
              Descoperă peste 150 de rase și sute de articole specializate.
            </p>
            <SearchBar className="mb-8" />
            <div className="flex flex-wrap gap-4 justify-center">
              <Button href="/rase" size="lg">
                Explorează Rasele
              </Button>
              <Button href="/sanatate" variant="outline" size="lg">
                Articole Sănătate
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Pisicopedia Section */}
      <WhyPisicopedia />

      {/* Popular Breeds Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-warmgray-900 mb-4">
              Rase Populare de Pisici
            </h2>
            <p className="text-lg text-warmgray-600">
              Descoperă caracteristicile și cerințele de îngrijire ale celor mai populare rase
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {popularBreeds.map((breed: Breed) => (
              <BreedCard key={breed.slug} breed={breed} featured />
            ))}
          </div>

          <div className="text-center">
            <Button href="/rase" size="lg" variant="outline">
              Vezi Toate Rasele (150+)
            </Button>
          </div>
        </Container>
      </section>

      {/* Health Articles Section */}
      <section className="py-16 bg-lavender-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-warmgray-900 mb-4">
              Articole Recente despre Sănătate
            </h2>
            <p className="text-lg text-warmgray-600">
              Informații medicale verificate de medici veterinari specializați
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {recentArticles.map((article: Article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          <div className="text-center">
            <Button href="/sanatate" size="lg">
              Toate Articolele de Sănătate
            </Button>
          </div>
        </Container>
      </section>

      {/* Medical Guides Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-warmgray-900 mb-4">
              Ghiduri Medicale Esențiale
            </h2>
            <p className="text-lg text-warmgray-600">
              Pași detaliați pentru proceduri și îngrijiri importante
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {topGuides.map((guide: Guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>

          <div className="text-center">
            <Button href="/ghiduri" size="lg" variant="outline">
              Vezi Toate Ghidurile
            </Button>
          </div>
        </Container>
      </section>

      {/* Newsletter CTA Section */}
      <section className="py-16 bg-rose-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-warmgray-900 mb-4">
              Rămâi Informat cu Sfaturi Veterinare
            </h2>
            <p className="text-lg text-warmgray-600 mb-8">
              Primește săptămânal cele mai noi articole despre sănătatea pisicilor,
              sfaturi de îngrijire și noutăți din lumea felină.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Adresa ta de email"
                className="flex-1 px-4 py-3 border border-warmgray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
                required
              />
              <Button type="submit" size="lg">
                Abonează-te Gratuit
              </Button>
            </form>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-warmgray-900 mb-8 text-center">
              Întrebări Frecvente
            </h2>
            <div className="space-y-6">
              <details className="group bg-warmgray-50 rounded-lg p-6">
                <summary className="font-semibold text-lg cursor-pointer list-none flex justify-between items-center">
                  Ce informații găsesc pe Pisicopedia?
                  <span className="text-lavender-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-warmgray-600">
                  Pisicopedia oferă informații complete despre peste 150 de rase de pisici,
                  articole medicale verificate despre boli și simptome, ghiduri de îngrijire,
                  și sfaturi de prevenție pentru sănătatea pisicii tale.
                </p>
              </details>

              <details className="group bg-warmgray-50 rounded-lg p-6">
                <summary className="font-semibold text-lg cursor-pointer list-none flex justify-between items-center">
                  Informațiile sunt verificate medical?
                  <span className="text-lavender-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-warmgray-600">
                  Da, toate articolele medicale sunt revizuite de medici veterinari.
                  Totuși, informațiile prezentate nu înlocuiesc consultația veterinară.
                  Pentru probleme de sănătate, consultați întotdeauna un specialist.
                </p>
              </details>

              <details className="group bg-warmgray-50 rounded-lg p-6">
                <summary className="font-semibold text-lg cursor-pointer list-none flex justify-between items-center">
                  Cum aleg rasa potrivită pentru mine?
                  <span className="text-lavender-600 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-warmgray-600">
                  Folosiți filtrele noastre pentru a găsi rase după temperament, mărime,
                  nivel de activitate și cerințe de îngrijire. Fiecare rasă are o secțiune
                  dedicată „Pentru cine este potrivită această rasă" care vă va ajuta să luați decizia corectă.
                </p>
              </details>
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom Banner Placeholder */}
      <section className="py-8 bg-warmgray-50">
        <Container>
          <BannerPlaceholder size="728x90" />
        </Container>
      </section>
    </>
  );
}
