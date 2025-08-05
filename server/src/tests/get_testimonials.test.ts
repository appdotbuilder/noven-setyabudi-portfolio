
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { testimonialsTable } from '../db/schema';
import { type CreateTestimonialInput } from '../schema';
import { getTestimonials } from '../handlers/get_testimonials';

const testTestimonial1: CreateTestimonialInput = {
  name: 'Ahmad Rizki',
  position: 'Project Director',
  company: 'Indonesian Aerospace',
  message: 'Noven adalah project manager yang sangat kompeten dan berpengalaman.',
  rating: 5
};

const testTestimonial2: CreateTestimonialInput = {
  name: 'Sarah Abdullah',
  position: 'Senior Engineer',
  company: 'Royal Malaysian Air Force',
  message: 'Working with Noven on the CN235 project was an excellent experience.',
  rating: 4
};

describe('getTestimonials', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return empty array when no testimonials exist', async () => {
    const result = await getTestimonials();

    expect(result).toEqual([]);
  });

  it('should return all testimonials ordered by created_at desc', async () => {
    // Insert testimonials with a small delay to ensure different timestamps
    await db.insert(testimonialsTable)
      .values(testTestimonial1)
      .execute();

    // Small delay to ensure different created_at timestamps
    await new Promise(resolve => setTimeout(resolve, 10));

    await db.insert(testimonialsTable)
      .values(testTestimonial2)
      .execute();

    const result = await getTestimonials();

    expect(result).toHaveLength(2);
    
    // Verify order - most recent first
    expect(result[0].name).toEqual('Sarah Abdullah');
    expect(result[1].name).toEqual('Ahmad Rizki');
    
    // Verify all fields are present
    expect(result[0].id).toBeDefined();
    expect(result[0].position).toEqual('Senior Engineer');
    expect(result[0].company).toEqual('Royal Malaysian Air Force');
    expect(result[0].message).toEqual('Working with Noven on the CN235 project was an excellent experience.');
    expect(result[0].rating).toEqual(4);
    expect(result[0].created_at).toBeInstanceOf(Date);
    
    expect(result[1].id).toBeDefined();
    expect(result[1].position).toEqual('Project Director');
    expect(result[1].company).toEqual('Indonesian Aerospace');
    expect(result[1].rating).toEqual(5);
    expect(result[1].created_at).toBeInstanceOf(Date);
  });

  it('should return single testimonial correctly', async () => {
    await db.insert(testimonialsTable)
      .values(testTestimonial1)
      .execute();

    const result = await getTestimonials();

    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual('Ahmad Rizki');
    expect(result[0].position).toEqual('Project Director');
    expect(result[0].company).toEqual('Indonesian Aerospace');
    expect(result[0].message).toEqual('Noven adalah project manager yang sangat kompeten dan berpengalaman.');
    expect(result[0].rating).toEqual(5);
    expect(result[0].id).toBeDefined();
    expect(result[0].created_at).toBeInstanceOf(Date);
  });
});
