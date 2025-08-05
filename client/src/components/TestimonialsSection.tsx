
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '../../../server/src/schema';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Testimoni</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Feedback dari klien, rekan kerja, dan peserta pelatihan yang telah bekerja sama 
          dalam berbagai proyek dan program pengembangan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {testimonials.map((testimonial: Testimonial) => (
          <Card key={testimonial.id} className="group hover:shadow-xl transition-all duration-300 bg-white relative overflow-hidden">
            <CardContent className="p-8">
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="h-12 w-12 text-blue-600" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Message */}
              <blockquote className="text-gray-700 leading-relaxed mb-6 text-lg italic">
                "{testimonial.message}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                    {getInitials(testimonial.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-blue-600 font-medium">{testimonial.position}</div>
                  <div className="text-gray-500 text-sm">{testimonial.company}</div>
                </div>
              </div>

              {/* Decorative border */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-200">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            {renderStars(5)}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Kepercayaan Klien</h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Komitmen terhadap kepuasan klien dan kualitas layanan menjadi prioritas utama 
            dalam setiap proyek dan program pelatihan yang dilaksanakan.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">Kepuasan Klien</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Rating Rata-rata</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Testimonial</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600">Repeat Client</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
