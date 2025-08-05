
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { testimonialsTable } from '../db/schema';
import { type CreateTestimonialInput } from '../schema';
import { createTestimonial } from '../handlers/create_testimonial';
import { eq } from 'drizzle-orm';

// Simple test input
const testInput: CreateTestimonialInput = {
  name: 'John Doe',
  position: 'Senior Developer',
  company: 'Tech Corp',
  message: 'Excellent work and great communication skills.',
  rating: 5
};

describe('createTestimonial', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create a testimonial', async () => {
    const result = await createTestimonial(testInput);

    // Basic field validation
    expect(result.name).toEqual('John Doe');
    expect(result.position).toEqual('Senior Developer');
    expect(result.company).toEqual('Tech Corp');
    expect(result.message).toEqual('Excellent work and great communication skills.');
    expect(result.rating).toEqual(5);
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
  });

  it('should save testimonial to database', async () => {
    const result = await createTestimonial(testInput);

    // Query using proper drizzle syntax
    const testimonials = await db.select()
      .from(testimonialsTable)
      .where(eq(testimonialsTable.id, result.id))
      .execute();

    expect(testimonials).toHaveLength(1);
    expect(testimonials[0].name).toEqual('John Doe');
    expect(testimonials[0].position).toEqual('Senior Developer');
    expect(testimonials[0].company).toEqual('Tech Corp');
    expect(testimonials[0].message).toEqual('Excellent work and great communication skills.');
    expect(testimonials[0].rating).toEqual(5);
    expect(testimonials[0].created_at).toBeInstanceOf(Date);
  });

  it('should handle minimum rating value', async () => {
    const minRatingInput: CreateTestimonialInput = {
      name: 'Jane Smith',
      position: 'Project Manager',
      company: 'Business Inc',
      message: 'Good collaboration experience.',
      rating: 1
    };

    const result = await createTestimonial(minRatingInput);

    expect(result.rating).toEqual(1);
    expect(result.name).toEqual('Jane Smith');
  });

  it('should handle maximum rating value', async () => {
    const maxRatingInput: CreateTestimonialInput = {
      name: 'Bob Wilson',
      position: 'CEO',
      company: 'Startup Ltd',
      message: 'Outstanding performance and delivery.',
      rating: 5
    };

    const result = await createTestimonial(maxRatingInput);

    expect(result.rating).toEqual(5);
    expect(result.name).toEqual('Bob Wilson');
  });

  it('should handle long testimonial message', async () => {
    const longMessageInput: CreateTestimonialInput = {
      name: 'Alice Johnson',
      position: 'Technical Lead',
      company: 'Enterprise Solutions',
      message: 'This developer consistently delivered high-quality work throughout our project. Their attention to detail and problem-solving skills were exceptional.',
      rating: 4
    };

    const result = await createTestimonial(longMessageInput);

    expect(result.message).toEqual(longMessageInput.message);
    expect(result.rating).toEqual(4);
    expect(result.name).toEqual('Alice Johnson');
  });
});
