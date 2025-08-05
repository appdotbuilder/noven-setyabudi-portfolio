
import { db } from '../db';
import { testimonialsTable } from '../db/schema';
import { type CreateTestimonialInput, type Testimonial } from '../schema';

export const createTestimonial = async (input: CreateTestimonialInput): Promise<Testimonial> => {
  try {
    // Insert testimonial record
    const result = await db.insert(testimonialsTable)
      .values({
        name: input.name,
        position: input.position,
        company: input.company,
        message: input.message,
        rating: input.rating
      })
      .returning()
      .execute();

    // Return the created testimonial
    return result[0];
  } catch (error) {
    console.error('Testimonial creation failed:', error);
    throw error;
  }
};
