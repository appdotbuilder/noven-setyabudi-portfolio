
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';

import { 
  createProjectInputSchema, 
  createCertificationInputSchema, 
  createTrainingInputSchema, 
  createTestimonialInputSchema, 
  contactFormSchema,
  updateProfileInputSchema 
} from './schema';

import { getProfile } from './handlers/get_profile';
import { updateProfile } from './handlers/update_profile';
import { getProjects } from './handlers/get_projects';
import { createProject } from './handlers/create_project';
import { getCertifications } from './handlers/get_certifications';
import { createCertification } from './handlers/create_certification';
import { getTrainings } from './handlers/get_trainings';
import { createTraining } from './handlers/create_training';
import { getTestimonials } from './handlers/get_testimonials';
import { createTestimonial } from './handlers/create_testimonial';
import { submitContact } from './handlers/submit_contact';
import { getContactSubmissions } from './handlers/get_contact_submissions';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // Profile routes
  getProfile: publicProcedure
    .query(() => getProfile()),
  
  updateProfile: publicProcedure
    .input(updateProfileInputSchema)
    .mutation(({ input }) => updateProfile(input)),

  // Project routes
  getProjects: publicProcedure
    .query(() => getProjects()),
  
  createProject: publicProcedure
    .input(createProjectInputSchema)
    .mutation(({ input }) => createProject(input)),

  // Certification routes
  getCertifications: publicProcedure
    .query(() => getCertifications()),
  
  createCertification: publicProcedure
    .input(createCertificationInputSchema)
    .mutation(({ input }) => createCertification(input)),

  // Training routes
  getTrainings: publicProcedure
    .query(() => getTrainings()),
  
  createTraining: publicProcedure
    .input(createTrainingInputSchema)
    .mutation(({ input }) => createTraining(input)),

  // Testimonial routes
  getTestimonials: publicProcedure
    .query(() => getTestimonials()),
  
  createTestimonial: publicProcedure
    .input(createTestimonialInputSchema)
    .mutation(({ input }) => createTestimonial(input)),

  // Contact routes
  submitContact: publicProcedure
    .input(contactFormSchema)
    .mutation(({ input }) => submitContact(input)),
  
  getContactSubmissions: publicProcedure
    .query(() => getContactSubmissions()),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();
