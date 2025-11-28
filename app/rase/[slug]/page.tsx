import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/common/Container';
import Badge from '@/components/common/Badge';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import BannerPlaceholder from '@/components/layout/BannerPlaceholder';
import { getBreedBySlug, getAllBreeds } from '@/lib/data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const breeds = await getAllBreeds();
  return breeds.map((breed) => ({
    slug: breed.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const breed = await getBreedBySlug(slug);

  if (!breed) {
    return {
      title: 'Rasă negăsită',
    };
  }

  return {
    title: `${breed.title} - Caracteristici, Temperament și Îngrijire`,
    description: breed.description,
    openGraph: {
      title: `${breed.title} - Pisicopedia`,
      description: breed.description,
      images: breed.image ? [breed.image] : [],
    },
  };
}

export default async function BreedPage({ params }: PageProps) {
  const { slug } = await params;
  const breed = await getBreedBySlug(slug);

  if (!breed) {
    notFound();
  }

  const relatedBreeds = await getAllBreeds();
  const similarBreeds = relatedBreeds
    .filter((b) => b.slug !== breed.slug && b.category === breed.category)
    .slice(0, 3);

  return (
    <>
      {/* Hero Section with Breed Image */}
      <section className="relative h-[400px] bg-gradient-to-br from-lavender-100 to-rose-100">
        {breed.image && (
          <Image
            src={breed.image}
            alt={breed.title}
            fill
            className="object-cover opacity-20"
            priority
          />
        )}
        <Container>
          <div className="relative pt-20">
            <nav className="text-sm mb-4">
              <ol className="flex items-center space-x-2 text-warmgray-600">
                <li>
                  <Link href="/" className="hover:text-lavender-600">
                    Acasă
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/rase" className="hover:text-lavender-600">
                    Rase
                  </Link>
                </li>
                <li>/</li>
                <li className="text-warmgray-900 font-medium">{breed.title}</li>
              </ol>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold text-warmgray-900 mb-4">
              {breed.title}
            </h1>
            <p className="text-xl text-warmgray-700 max-w-3xl">
              {breed.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              <Badge variant="primary" size="md">
                {breed.origin}
              </Badge>
              <Badge variant="secondary" size="md">
                {breed.lifeSpan}
              </Badge>
              <Badge variant="default" size="md">
                {breed.weight}
              </Badge>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Facts */}
            <Card>
              <h2 className="text-2xl font-bold text-warmgray-900 mb-6">
                Caracteristici Rapide
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-lavender-50 rounded-lg">
                  <div className="text-2xl mb-2">🏠</div>
                  <div className="text-sm text-warmgray-600">Origine</div>
                  <div className="font-semibold">{breed.origin}</div>
                </div>
                <div className="text-center p-4 bg-rose-50 rounded-lg">
                  <div className="text-2xl mb-2">⚖️</div>
                  <div className="text-sm text-warmgray-600">Greutate</div>
                  <div className="font-semibold">{breed.weight}</div>
                </div>
                <div className="text-center p-4 bg-warmgray-50 rounded-lg">
                  <div className="text-2xl mb-2">📅</div>
                  <div className="text-sm text-warmgray-600">Durată Viață</div>
                  <div className="font-semibold">{breed.lifeSpan}</div>
                </div>
                <div className="text-center p-4 bg-lavender-50 rounded-lg">
                  <div className="text-2xl mb-2">📏</div>
                  <div className="text-sm text-warmgray-600">Mărime</div>
                  <div className="font-semibold capitalize">
                    {breed.size === 'small' ? 'Mică' :
                     breed.size === 'medium' ? 'Medie' : 'Mare'}
                  </div>
                </div>
                <div className="text-center p-4 bg-rose-50 rounded-lg">
                  <div className="text-2xl mb-2">✂️</div>
                  <div className="text-sm text-warmgray-600">Îngrijire</div>
                  <div className="font-semibold capitalize">
                    {breed.grooming === 'low' ? 'Minimă' :
                     breed.grooming === 'medium' ? 'Moderată' : 'Intensivă'}
                  </div>
                </div>
                <div className="text-center p-4 bg-warmgray-50 rounded-lg">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="text-sm text-warmgray-600">Activitate</div>
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={i < breed.activityLevel ? 'text-lavender-500' : 'text-warmgray-300'}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Temperament */}
            <Card>
              <h2 className="text-2xl font-bold text-warmgray-900 mb-6">
                Temperament și Personalitate
              </h2>
              <div className="prose prose-lg max-w-none text-warmgray-600">
                <p>
                  {breed.title} este cunoscută pentru temperamentul său{' '}
                  {breed.temperament.join(', ').toLowerCase()}. Această rasă este
                  ideală pentru persoanele care caută o pisică cu aceste caracteristici.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {breed.temperament.map((trait) => (
                  <Badge key={trait} variant="primary" size="md">
                    {trait}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Health Concerns */}
            <Card>
              <h2 className="text-2xl font-bold text-warmgray-900 mb-6">
                Probleme de Sănătate Frecvente
              </h2>
              <div className="space-y-3">
                {breed.healthConcerns.map((concern) => (
                  <div key={concern} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-rose-500 mt-0.5 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <p className="font-medium text-warmgray-900">{concern}</p>
                      <p className="text-sm text-warmgray-600 mt-1">
                        Consultați veterinarul pentru prevenție și tratament adecvat.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-rose-50 rounded-lg">
                <p className="text-sm text-warmgray-700">
                  <strong>Important:</strong> Vizitele regulate la veterinar și un stil
                  de viață sănătos pot preveni multe dintre aceste probleme.
                </p>
              </div>
            </Card>

            {/* Care Requirements */}
            <Card>
              <h2 className="text-2xl font-bold text-warmgray-900 mb-6">
                Cerințe de Îngrijire
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-warmgray-900 mb-2">
                    Periere și Toaletare
                  </h3>
                  <p className="text-warmgray-600">
                    {breed.grooming === 'high'
                      ? 'Necesită periere zilnică pentru a preveni încâlcirea părului și formarea ghemotoacelor.'
                      : breed.grooming === 'medium'
                      ? 'Periere de 2-3 ori pe săptămână pentru menținerea blănii sănătoase.'
                      : 'Periere săptămânală suficientă pentru menținerea aspectului.'}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-warmgray-900 mb-2">
                    Nivel de Activitate
                  </h3>
                  <p className="text-warmgray-600">
                    {breed.activityLevel >= 4
                      ? 'Rasă foarte activă care necesită mult timp de joacă și stimulare mentală.'
                      : breed.activityLevel >= 2
                      ? 'Nivel moderat de activitate, necesită joacă regulată.'
                      : 'Rasă calmă, perfectă pentru viața de apartament.'}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-warmgray-900 mb-2">
                    Năpârlire
                  </h3>
                  <p className="text-warmgray-600">
                    Nivel de năpârlire:{' '}
                    <span className="font-semibold capitalize">
                      {breed.shedding === 'very-high' ? 'Foarte ridicat' :
                       breed.shedding === 'high' ? 'Ridicat' :
                       breed.shedding === 'medium' ? 'Moderat' : 'Scăzut'}
                    </span>
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Banner Placeholder */}
            <BannerPlaceholder size="300x250" />

            {/* Is This Breed Right for You? */}
            <Card>
              <h3 className="text-xl font-bold text-warmgray-900 mb-4">
                Este Potrivită Pentru Tine?
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-warmgray-700">
                    {breed.activityLevel <= 2 ? 'Perfectă pentru apartament' : 'Ideală pentru case cu curte'}
                  </span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-warmgray-700">
                    {breed.temperament.includes('Prietenos') ? 'Excelentă cu copiii' : 'Potrivită pentru adulți'}
                  </span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-warmgray-700">
                    {breed.grooming === 'low' ? 'Îngrijire minimă' : 'Necesită îngrijire regulată'}
                  </span>
                </div>
              </div>
            </Card>

            {/* Related Breeds */}
            {similarBreeds.length > 0 && (
              <Card>
                <h3 className="text-xl font-bold text-warmgray-900 mb-4">
                  Rase Similare
                </h3>
                <div className="space-y-3">
                  {similarBreeds.map((similar) => (
                    <Link
                      key={similar.slug}
                      href={`/rase/${similar.slug}`}
                      className="block p-3 bg-warmgray-50 rounded-lg hover:bg-lavender-50 transition-colors duration-200"
                    >
                      <p className="font-medium text-warmgray-900">
                        {similar.title}
                      </p>
                      <p className="text-sm text-warmgray-600 mt-1">
                        {similar.origin} • {similar.lifeSpan}
                      </p>
                    </Link>
                  ))}
                </div>
              </Card>
            )}

            {/* CTA */}
            <Card className="bg-gradient-to-br from-lavender-100 to-rose-100">
              <h3 className="text-xl font-bold text-warmgray-900 mb-2">
                Ai întrebări?
              </h3>
              <p className="text-sm text-warmgray-700 mb-4">
                Consultă un veterinar pentru sfaturi personalizate despre această rasă.
              </p>
              <Button href="/contact" variant="primary" className="w-full">
                Contactează-ne
              </Button>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}