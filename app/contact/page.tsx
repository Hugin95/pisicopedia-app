'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import Container from '@/components/common/Container';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

// export const metadata: Metadata = {
//   title: 'Contact | Pisicopedia.ro',
//   description: 'Contactați echipa Pisicopedia.ro pentru întrebări, sugestii sau colaborări.',
// };

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just open mailto link
    const mailtoLink = `mailto:contact@pisicopedia.ro?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Nume: ${formData.name}\nEmail: ${formData.email}\n\nMesaj:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <main className="py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-warmgray-900 mb-8">Contact</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Card>
                <h2 className="text-2xl font-semibold text-warmgray-900 mb-4">Trimite-ne un mesaj</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-warmgray-700 mb-1">
                      Nume complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-warmgray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-warmgray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-warmgray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-warmgray-700 mb-1">
                      Subiect
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-warmgray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                    >
                      <option value="">Selectează un subiect</option>
                      <option value="Întrebare generală">Întrebare generală</option>
                      <option value="Sugestie articol">Sugestie articol</option>
                      <option value="Colaborare">Colaborare</option>
                      <option value="Raportare eroare">Raportare eroare</option>
                      <option value="Altele">Altele</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-warmgray-700 mb-1">
                      Mesaj
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-warmgray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none"
                    />
                  </div>

                  <Button type="submit" variant="primary" className="w-full">
                    Trimite Mesajul
                  </Button>
                </form>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <h2 className="text-2xl font-semibold text-warmgray-900 mb-4">Informații de Contact</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-warmgray-800">Email</h3>
                    <a href="mailto:contact@pisicopedia.ro" className="text-rose-500 hover:text-rose-600">
                      contact@pisicopedia.ro
                    </a>
                  </div>
                </div>
              </Card>

              <Card>
                <h2 className="text-2xl font-semibold text-warmgray-900 mb-4">Program de Răspuns</h2>
                <p className="text-warmgray-700">
                  Ne străduim să răspundem la toate mesajele în termen de 24-48 de ore lucrătoare.
                </p>
              </Card>

              <Card>
                <h2 className="text-2xl font-semibold text-warmgray-900 mb-4">Pentru Urgențe Medicale</h2>
                <div className="bg-rose-50 border-l-4 border-rose-400 p-4 rounded-r">
                  <p className="text-warmgray-700">
                    <strong>Atenție!</strong> Pentru urgențe medicale, vă rugăm să contactați imediat
                    un cabinet veterinar din zona dumneavoastră. Pisicopedia.ro oferă doar informații
                    educative și nu poate oferi consultații medicale.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}