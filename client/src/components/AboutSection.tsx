
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plane, Target, Users, BarChart, Shield, Clock } from 'lucide-react';
import type { Profile } from '../../../server/src/schema';

interface AboutSectionProps {
  profile: Profile | null;
}

export function AboutSection({ profile }: AboutSectionProps) {
  const skills = [
    { name: 'Work Breakdown Structure (WBS)', icon: Target },
    { name: 'Project Scheduling', icon: Clock },
    { name: 'Budgeting & Cost Control', icon: BarChart },
    { name: 'PMIS Implementation', icon: BarChart },
    { name: 'Earned Value Management (EVM)', icon: BarChart },
    { name: 'Risk Analysis & Management', icon: Shield },
    { name: 'Stakeholder Management', icon: Users },
    { name: 'Flight Test Coordination', icon: Plane }
  ];

  const keyProjects = [
    {
      name: 'NC212i untuk PAF',
      description: 'Philippine Air Force aircraft delivery project',
      year: '2023'
    },
    {
      name: 'CN235 untuk RMAF',
      description: 'Royal Malaysian Air Force program management',
      year: '2022'
    },
    {
      name: 'C295 untuk TNI AU',
      description: 'Indonesian Air Force aircraft project',
      year: '2021'
    },
    {
      name: 'AS565 Panther & Bell 412EPI',
      description: 'TNI AL & AD helicopter projects',
      year: '2020-2021'
    }
  ];

  if (!profile) return null;

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Tentang Saya</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Project Manager berpengalaman dengan keahlian mendalam dalam industri aerospace 
          dan komitmen terhadap pengembangan SDM melalui pelatihan profesional.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Professional Journey */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Perjalanan Karier</h3>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-4">
              Memulai karier sebagai Project Manager di industri aerospace sejak 2014, 
              saya telah memimpin berbagai proyek strategis untuk angkatan udara dan 
              angkatan laut di Asia Tenggara.
            </p>
            <p className="mb-4">
              Sejak 2022, saya juga aktif sebagai trainer manajemen proyek di Indonesian 
              Aerospace dan SRZ, termasuk memberikan pelatihan di Malaysia. Pengalaman 
              ini memungkinkan saya untuk berbagi pengetahuan praktis dengan profesional 
              lain di industri.
            </p>
            <p>
              Fokus utama saya adalah memastikan setiap proyek diselesaikan tepat waktu, 
              sesuai budget, dan memenuhi standar kualitas tertinggi sambil membangun 
              kapabilitas tim untuk kesuksesan jangka panjang.
            </p>
          </div>
        </div>

        {/* Key Projects */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Proyek Utama</h3>
          <div className="space-y-4">
            {keyProjects.map((project, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{project.name}</h4>
                    <Badge variant="secondary">{project.year}</Badge>
                  </div>
                  <p className="text-gray-600">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Keahlian Utama</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm leading-tight">
                    {skill.name}
                  </h4>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Training Role */}
      <div className="mt-16 bg-blue-50 rounded-2xl p-8">
        <div className="text-center">
          <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Peran sebagai Trainer</h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Sejak 2022, saya aktif memberikan pelatihan manajemen proyek di Indonesian Aerospace 
            dan SRZ Training Center, dengan fokus pada aplikasi praktis metodologi PM dalam 
            industri aerospace.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['WBS Workshop', 'EVM Training', 'Risk Management', 'Scheduling'].map((topic, index) => (
              <Badge key={index} variant="outline" className="text-base py-2 px-4 bg-white">
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
