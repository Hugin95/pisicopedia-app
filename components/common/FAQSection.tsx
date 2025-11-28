import { generateFAQSchema } from '@/lib/seo';
import Script from 'next/script';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
}

export default function FAQSection({ faqs, title = "Întrebări frecvente" }: FAQSectionProps) {
  const faqSchema = generateFAQSchema(faqs);

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="mt-12 bg-gradient-to-br from-lavender-50 to-cream-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-warmgray-900 mb-6">{title}</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="text-lg font-semibold text-warmgray-900 pr-4">
                  {faq.question}
                </h3>
                <span className="flex-shrink-0 ml-2">
                  <svg
                    className="w-5 h-5 text-lavender-500 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </summary>
              <div className="mt-4 text-warmgray-600 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}