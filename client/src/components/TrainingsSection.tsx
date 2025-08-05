
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MapPin, Calendar, BookOpen } from 'lucide-react';
import type { Training } from '../../../server/src/schema';

interface TrainingsSectionProps {
  trainings: Training[];
}

export function TrainingsSection({ trainings }: TrainingsSectionProps) {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Pelatihan & Pengajaran</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Berbagi pengetahuan dan pengalaman melalui program pelatihan manajemen proyek 
          untuk profesional di Indonesia dan Malaysia.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {trainings.map((training: Training) => (
          <Card key={training.id} className="group hover:shadow-xl transition-all duration-300 bg-white">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <Badge variant="secondary">
                  <Calendar className="h-3 w-3 mr-1" />
                  {training.year}
                </Badge>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                {training.title}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <BookOpen className="h-4 w-4 mr-2 text-green-600" />
                  <span className="font-medium">{training.organization}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-green-600" />
                  <span>{training.location}</span>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {training.description}
              </p>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">Program Pelatihan</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 font-medium">Selesai</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Training Philosophy */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
        <div className="text-center mb-8">
          <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Filosofi Pengajaran</h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pendekatan praktis dan aplikatif dalam setiap sesi pelatihan, memastikan 
            peserta dapat langsung menerapkan pengetahuan di lingkungan kerja mereka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center bg-white rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Materi Terkini</h4>
            <p className="text-gray-600 text-sm">Konten yang selalu diperbaharui sesuai perkembangan industri</p>
          </div>

          <div className="text-center bg-white rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Interaktif</h4>
            <p className="text-gray-600 text-sm">Sesi diskusi dan studi kasus untuk pemahaman mendalam</p>
          </div>

          <div className="text-center bg-white rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="h-6 w-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Multi-Lokasi</h4>
            <p className="text-gray-600 text-sm">Pelatihan di Indonesia dan Malaysia</p>
          </div>

          <div className="text-center bg-white rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Berkelanjutan</h4>
            <p className="text-gray-600 text-sm">Program follow-up dan konsultasi lanjutan</p>
          </div>
        </div>
      </div>

      {/* Training Statistics */}
      <div className="mt-12 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Statistik Pelatihan</h3>
          <p className="text-green-100">Dampak pelatihan yang telah diberikan</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-green-100">Total Peserta</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">12</div>
            <div className="text-green-100">Program Pelatihan</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">2</div>
            <div className="text-green-100">Negara</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">4.9/5</div>
            <div className="text-green-100">Rating Peserta</div>
          </div>
        </div>
      </div>
    </div>
  );
}
