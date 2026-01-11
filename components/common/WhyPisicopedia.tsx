import Container from './Container';

export default function WhyPisicopedia() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-lavender-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Articole medicale verificate',
      description: 'Informații medicale verificate de veterinari, actualizate constant pentru siguranța pisicii tale.',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-lavender-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Ghiduri complete pentru îngrijire',
      description: 'De la alegerea rasei până la îngrijirea seniorilor - ghiduri pas cu pas pentru fiecare etapă.',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-lavender-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Peste 80 de pagini de conținut',
      description: 'Cea mai completă enciclopedie despre pisici în limba română - 30 rase, 30+ articole, 24 ghiduri.',
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-lavender-50 to-rose-50">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-warmgray-900 mb-3">
            De ce Pisicopedia?
          </h2>
          <p className="text-warmgray-600 max-w-2xl mx-auto">
            Resursa ta de încredere pentru tot ce înseamnă îngrijirea și sănătatea pisicii tale
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-lavender-100 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-warmgray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-warmgray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
