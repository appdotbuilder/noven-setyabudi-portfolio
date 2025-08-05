
import { useState, useEffect, useCallback } from 'react';
import { trpc } from '@/utils/trpc';
import type { Profile, Project, Certification, Training, Testimonial, ContactForm } from '../../server/src/schema';

// Components
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { TrainingsSection } from './components/TrainingsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';

// UI Components
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [profileData, projectsData, certificationsData, trainingsData, testimonialsData] = await Promise.all([
        trpc.getProfile.query(),
        trpc.getProjects.query(),
        trpc.getCertifications.query(),
        trpc.getTrainings.query(),
        trpc.getTestimonials.query()
      ]);

      setProfile(profileData);
      setProjects(projectsData);
      setCertifications(certificationsData);
      setTrainings(trainingsData);
      setTestimonials(testimonialsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleContactSubmit = async (formData: ContactForm) => {
    try {
      await trpc.submitContact.mutate(formData);
      // You might want to show a success message here
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      throw error;
    }
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="relative">
        <section id="hero" className="min-h-screen">
          <HeroSection profile={profile} />
        </section>

        <section id="about" className="py-20 bg-white">
          <AboutSection profile={profile} />
        </section>

        <section id="projects" className="py-20 bg-gray-50">
          <ProjectsSection projects={projects} />
        </section>

        <section id="certifications" className="py-20 bg-white">
          <CertificationsSection certifications={certifications} />
        </section>

        <section id="trainings" className="py-20 bg-gray-50">
          <TrainingsSection trainings={trainings} />
        </section>

        <section id="testimonials" className="py-20 bg-white">
          <TestimonialsSection testimonials={testimonials} />
        </section>

        <section id="contact" className="py-20 bg-gray-50">
          <ContactSection profile={profile} onSubmit={handleContactSubmit} />
        </section>
      </main>

      <Footer profile={profile} />
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl w-full px-6">
        <div className="text-center mb-8">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto mb-2" />
          <Skeleton className="h-6 w-80 mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-full mb-4" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
