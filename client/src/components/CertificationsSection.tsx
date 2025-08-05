
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Calendar, Building } from 'lucide-react';
import type { Certification } from '../../../server/src/schema';

interface CertificationsSectionProps {
  certifications: Certification[];
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Sertifikasi Profesional</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Komitmen terhadap pengembangan profesional melalui sertifikasi dan 
          pelatihan berkelanjutan dari institusi terkemuka.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certifications.map((certification: Certification) => (
          <Card key={certification.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  <Calendar className="h-3 w-3 mr-1" />
                  {certification.year}
                </Badge>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                {certification.name}
              </h3>

              <div className="flex items-center text-gray-600 mb-4">
                <Building className="h-4 w-4 mr-2 text-blue-600" />
                <span className="font-medium">{certification.issuer}</span>
              </div>

              {certification.description && (
                <p className="text-gray-600 text-sm leading-relaxed">
                  {certification.description}
                </p>
              )}

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Sertifikat Profesional</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Certification Value Proposition */}
      <div className="mt-16 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200">
        <div className="text-center">
          <Award className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Komitmen Pengembangan Profesional</h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Sertifikasi dan pelatihan berkelanjutan memastikan penerapan best practices 
            terkini dalam manajemen proyek aerospace dan peningkatan kualitas layanan.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Standar Global</h4>
              <p className="text-gray-600 text-sm">Mengikuti standar internasional dalam manajemen proyek</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Building className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Institusi Terpercaya</h4>
              <p className="text-gray-600 text-sm">Sertifikasi dari lembaga profesional terkemuka</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Pembaruan Berkala</h4>
              <p className="text-gray-600 text-sm">Terus mengikuti perkembangan industri terbaru</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
