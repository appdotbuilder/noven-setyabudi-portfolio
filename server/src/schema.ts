
import { z } from 'zod';

// Project schema
export const projectSchema = z.object({
  id: z.number(),
  name: z.string(),
  year: z.number().int(),
  role: z.string(),
  tools: z.string(), // JSON string of tools array
  achievements: z.string(),
  image_url: z.string().nullable(),
  description: z.string(),
  created_at: z.coerce.date()
});

export type Project = z.infer<typeof projectSchema>;

// Certification schema
export const certificationSchema = z.object({
  id: z.number(),
  name: z.string(),
  issuer: z.string(),
  year: z.number().int(),
  description: z.string().nullable(),
  created_at: z.coerce.date()
});

export type Certification = z.infer<typeof certificationSchema>;

// Training schema
export const trainingSchema = z.object({
  id: z.number(),
  title: z.string(),
  organization: z.string(),
  location: z.string(),
  year: z.number().int(),
  description: z.string(),
  created_at: z.coerce.date()
});

export type Training = z.infer<typeof trainingSchema>;

// Testimonial schema
export const testimonialSchema = z.object({
  id: z.number(),
  name: z.string(),
  position: z.string(),
  company: z.string(),
  message: z.string(),
  rating: z.number().int().min(1).max(5),
  created_at: z.coerce.date()
});

export type Testimonial = z.infer<typeof testimonialSchema>;

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10),
  phone: z.string().optional()
});

export type ContactForm = z.infer<typeof contactFormSchema>;

// Contact submission schema (for database)
export const contactSubmissionSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  subject: z.string(),
  message: z.string(),
  phone: z.string().nullable(),
  created_at: z.coerce.date(),
  status: z.enum(['new', 'read', 'replied'])
});

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;

// Profile schema
export const profileSchema = z.object({
  id: z.number(),
  full_name: z.string(),
  headline: z.string(),
  bio: z.string(),
  profile_image_url: z.string().nullable(),
  cv_url: z.string().nullable(),
  email: z.string(),
  phone: z.string().nullable(),
  linkedin_url: z.string().nullable(),
  whatsapp_url: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Profile = z.infer<typeof profileSchema>;

// Input schemas for creating/updating
export const createProjectInputSchema = z.object({
  name: z.string().min(1),
  year: z.number().int().min(2000).max(2030),
  role: z.string().min(1),
  tools: z.string(), // JSON string
  achievements: z.string().min(1),
  image_url: z.string().nullable().optional(),
  description: z.string().min(1)
});

export type CreateProjectInput = z.infer<typeof createProjectInputSchema>;

export const createCertificationInputSchema = z.object({
  name: z.string().min(1),
  issuer: z.string().min(1),
  year: z.number().int().min(2000).max(2030),
  description: z.string().nullable().optional()
});

export type CreateCertificationInput = z.infer<typeof createCertificationInputSchema>;

export const createTrainingInputSchema = z.object({
  title: z.string().min(1),
  organization: z.string().min(1),
  location: z.string().min(1),
  year: z.number().int().min(2000).max(2030),
  description: z.string().min(1)
});

export type CreateTrainingInput = z.infer<typeof createTrainingInputSchema>;

export const createTestimonialInputSchema = z.object({
  name: z.string().min(1),
  position: z.string().min(1),
  company: z.string().min(1),
  message: z.string().min(10),
  rating: z.number().int().min(1).max(5)
});

export type CreateTestimonialInput = z.infer<typeof createTestimonialInputSchema>;

export const updateProfileInputSchema = z.object({
  full_name: z.string().min(1).optional(),
  headline: z.string().min(1).optional(),
  bio: z.string().min(1).optional(),
  profile_image_url: z.string().nullable().optional(),
  cv_url: z.string().nullable().optional(),
  email: z.string().email().optional(),
  phone: z.string().nullable().optional(),
  linkedin_url: z.string().nullable().optional(),
  whatsapp_url: z.string().nullable().optional()
});

export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>;
