
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Download, Eye, Mail, Plane, Award, Users } from 'lucide-react';
import type { Profile } from '../../../server/src/schema';

interface HeroSectionProps {
  profile: Profile | null;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDownloadCV = () => {
    // Placeholder for CV download functionality
    console.log('Download CV clicked');
    // You could implement actual CV download here
  };

  if (!profile) return null;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20">
          <Plane className="h-32 w-32 text-white transform rotate-45" />
        </div>
        <div className="absolute bottom-20 right-20">
          <Award className="h-24 w-24 text-white" />
        </div>
        <div className="absolute top-1/2 left-10">
          <Users className="h-20 w-20 text-white" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Profile Image */}
        <div className="mb-8">
          <Avatar className="w-40 h-40 mx-auto mb-6 border-4 border-white/20">
            <AvatarImage src={profile.profile_image_url || undefined} />
            <AvatarFallback className="text-4xl font-bold bg-white/10 text-white">
              NS
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Name and Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
          {profile.full_name}
        </h1>
        
        <p className="text-xl md:text-2xl text-blue-100 mb-8 font-light">
          {profile.headline}
        </p>

        {/* Brief Description */}
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-lg text-blue-50 leading-relaxed opacity-90">
            Berpengalaman dalam mengelola proyek-proyek aerospace sejak 2014, dengan spesialisasi 
            dalam proyek pesawat militer dan pelatihan manajemen proyek profesional.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">10+</div>
            <div className="text-blue-100">Tahun Pengalaman</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">15+</div>
            <div className="text-blue-100">Proyek Selesai</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-blue-100">Peserta Pelatihan</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={handleDownloadCV}
            size="lg" 
            className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3 text-lg font-semibold"
          >
            <Download className="mr-2 h-5 w-5" />
            Download CV
          </Button>
          
          <Button 
            onClick={() => scrollToSection('projects')}
            variant="outline" 
            size="lg" 
            className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 text-lg font-semibold"
          >
            <Eye className="mr-2 h-5 w-5" />
            Lihat Proyek
          </Button>
          
          <Button 
            onClick={() => scrollToSection('contact')}
            variant="outline" 
            size="lg" 
            className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 text-lg font-semibold"
          >
            <Mail className="mr-2 h-5 w-5" />
            Hubungi Saya
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
