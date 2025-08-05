
import { Mail, Phone, MapPin, Linkedin, MessageSquare } from 'lucide-react';
import type { Profile } from '../../../server/src/schema';

interface FooterProps {
  profile: Profile | null;
}

export function Footer({ profile }: FooterProps) {
  const currentYear = new Date().getFullYear();

  if (!profile) return null;

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{profile.full_name}</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {profile.headline}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Berpengalaman dalam mengelola proyek-proyek aerospace kompleks dan 
              memberikan pelatihan manajemen proyek untuk profesional industri.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">{profile.email}</span>
              </div>
              {profile.phone && (
                <div className="flex items-center text-gray-300">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="text-sm">{profile.phone}</span>
                </div>
              )}
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">Bandung, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Menu</h4>
            <div className="space-y-2">
              {[
                { label: 'Tentang Saya', href: '#about' },
                { label: 'Proyek', href: '#projects' },
                { label: 'Sertifikasi', href: '#certifications' },
                { label: 'Pelatihan', href: '#trainings' },
                { label: 'Testimoni', href: '#testimonials' },
                { label: 'Kontak', href: '#contact' }
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} {profile.full_name}. Hak cipta dilindungi.
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-4">
            <button
              onClick={() => {
                const phoneNumber = '6281234567890';
                const message = 'Halo Pak Noven, saya ingin berdiskusi mengenai proyek/pelatihan.';
                const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
              }}
              className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
            </button>
            
            {profile.linkedin_url && (
              <button
                onClick={() => window.open(profile.linkedin_url!, '_blank')}
                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
