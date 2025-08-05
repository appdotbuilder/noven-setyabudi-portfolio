
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Award, Eye } from 'lucide-react';
import type { Project } from '../../../server/src/schema';

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const parseTools = (toolsString: string): string[] => {
    try {
      return JSON.parse(toolsString);
    } catch {
      return [];
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Pengalaman Proyek</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Portfolio proyek-proyek aerospace yang telah berhasil diselesaikan dengan 
          standar kualitas tinggi dan tepat waktu.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map((project: Project) => {
          const tools = parseTools(project.tools);
          
          return (
            <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    {project.year}
                  </Badge>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <Award className="h-6 w-6 text-blue-600 group-hover:text-white" />
                  </div>
                </div>
                <CardTitle className="text-xl leading-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                  {project.name}
                </CardTitle>
                <p className="text-blue-600 font-medium">{project.role}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {project.description}
                </p>

                {/* Achievements */}
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r">
                  <h4 className="font-semibold text-green-800 mb-2 text-sm">Pencapaian Utama:</h4>
                  <p className="text-green-700 text-sm leading-relaxed">
                    {project.achievements}
                  </p>
                </div>

                {/* Tools Used */}
                {tools.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm">Tools yang Digunakan:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tools.map((tool: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* View Details Button */}
                <Button 
                  variant="outline" 
                  className="w-full mt-4 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Lihat Detail
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Ringkasan Proyek</h3>
          <p className="text-blue-100">Statistik keseluruhan dari proyek-proyek yang telah diselesaikan</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{projects.length}+</div>
            <div className="text-blue-100">Proyek Selesai</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">100%</div>
            <div className="text-blue-100">Tingkat Keberhasilan</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">4</div>
            <div className="text-blue-100">Negara</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">98%</div>
            <div className="text-blue-100">On-Time Delivery</div>
          </div>
        </div>
      </div>
    </div>
  );
}
