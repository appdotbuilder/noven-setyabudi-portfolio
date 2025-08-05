
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Linkedin, MessageSquare, Send, Download, CheckCircle } from 'lucide-react';
import type { Profile, ContactForm } from '../../../server/src/schema';

interface ContactSectionProps {
  profile: Profile | null;
  onSubmit: (formData: ContactForm) => Promise<void>;
}

export function ContactSection({ profile, onSubmit }: ContactSectionProps) {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        phone: ''
      });
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Failed to submit contact form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadCV = () => {
    // Placeholder for CV download functionality
    console.log('Download CV clicked');
  };

  const openWhatsApp = () => {
    // Placeholder WhatsApp number - replace with actual number
    const phoneNumber = '6281234567890'; // Format: country code + number without +
    const message = 'Halo Pak Noven, saya tertarik untuk berdiskusi mengenai proyek/pelatihan.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!profile) return null;

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Hubungi Saya</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Mari berdiskusi mengenai proyek Anda atau peluang pelatihan manajemen proyek 
          untuk tim Anda. Saya siap membantu mencapai kesuksesan proyek Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 flex items-center">
                <MessageSquare className="h-6 w-6 mr-2 text-blue-600" />
                Kirim Pesan
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-green-700">Pesan Anda berhasil dikirim! Saya akan merespons dalam waktu 24 jam.</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData((prev: ContactForm) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData((prev: ContactForm) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="nama@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor Telepon
                    </label>
                    <Input
                      value={formData.phone || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData((prev: ContactForm) => ({ ...prev, phone: e.target.value || undefined }))
                      }
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subjek *
                    </label>
                    <Input
                      value={formData.subject}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData((prev: ContactForm) => ({ ...prev, subject: e.target.value }))
                      }
                      placeholder="Topik diskusi"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pesan *
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setFormData((prev: ContactForm) => ({ ...prev, message: e.target.value }))
                    }
                    placeholder="Ceritakan tentang proyek atau kebutuhan pelatihan Anda..."
                    rows={6}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Kirim Pesan
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info & Actions */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Informasi Kontak</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Email</div>
                  <div className="text-gray-600">{profile.email}</div>
                </div>
              </div>

              {profile.phone && (
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">Telepon</div>
                    <div className="text-gray-600">{profile.phone}</div>
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Lokasi</div>
                  <div className="text-gray-600">Bandung, Indonesia</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={handleDownloadCV}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Download CV
              </Button>

              <Button 
                onClick={openWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>

              {profile.linkedin_url && (
                <Button 
                  onClick={() => window.open(profile.linkedin_url!, '_blank')}
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Availability */}
          <Card className="shadow-lg bg-blue-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Siap Membantu</h3>
              <p className="text-gray-600 text-sm">
                Tersedia untuk konsultasi proyek dan program pelatihan. 
                Response time: 24 jam.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
