
import { serial, text, pgTable, timestamp, integer, pgEnum } from 'drizzle-orm/pg-core';

// Enum for contact submission status
export const contactStatusEnum = pgEnum('contact_status', ['new', 'read', 'replied']);

// Projects table
export const projectsTable = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  year: integer('year').notNull(),
  role: text('role').notNull(),
  tools: text('tools').notNull(), // JSON string of tools array
  achievements: text('achievements').notNull(),
  image_url: text('image_url'), // Nullable by default
  description: text('description').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// Certifications table
export const certificationsTable = pgTable('certifications', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  issuer: text('issuer').notNull(),
  year: integer('year').notNull(),
  description: text('description'), // Nullable by default
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// Trainings table
export const trainingsTable = pgTable('trainings', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  organization: text('organization').notNull(),
  location: text('location').notNull(),
  year: integer('year').notNull(),
  description: text('description').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// Testimonials table
export const testimonialsTable = pgTable('testimonials', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  position: text('position').notNull(),
  company: text('company').notNull(),
  message: text('message').notNull(),
  rating: integer('rating').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// Contact submissions table
export const contactSubmissionsTable = pgTable('contact_submissions', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  phone: text('phone'), // Nullable by default
  status: contactStatusEnum('status').default('new').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// Profile table (single row for the portfolio owner)
export const profileTable = pgTable('profile', {
  id: serial('id').primaryKey(),
  full_name: text('full_name').notNull(),
  headline: text('headline').notNull(),
  bio: text('bio').notNull(),
  profile_image_url: text('profile_image_url'), // Nullable by default
  cv_url: text('cv_url'), // Nullable by default
  email: text('email').notNull(),
  phone: text('phone'), // Nullable by default
  linkedin_url: text('linkedin_url'), // Nullable by default
  whatsapp_url: text('whatsapp_url'), // Nullable by default
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// TypeScript types for table schemas
export type Project = typeof projectsTable.$inferSelect;
export type NewProject = typeof projectsTable.$inferInsert;

export type Certification = typeof certificationsTable.$inferSelect;
export type NewCertification = typeof certificationsTable.$inferInsert;

export type Training = typeof trainingsTable.$inferSelect;
export type NewTraining = typeof trainingsTable.$inferInsert;

export type Testimonial = typeof testimonialsTable.$inferSelect;
export type NewTestimonial = typeof testimonialsTable.$inferInsert;

export type ContactSubmission = typeof contactSubmissionsTable.$inferSelect;
export type NewContactSubmission = typeof contactSubmissionsTable.$inferInsert;

export type Profile = typeof profileTable.$inferSelect;
export type NewProfile = typeof profileTable.$inferInsert;

// Export all tables for proper query building
export const tables = {
  projects: projectsTable,
  certifications: certificationsTable,
  trainings: trainingsTable,
  testimonials: testimonialsTable,
  contactSubmissions: contactSubmissionsTable,
  profile: profileTable,
};
