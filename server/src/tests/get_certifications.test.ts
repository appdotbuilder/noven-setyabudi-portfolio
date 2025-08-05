
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { certificationsTable } from '../db/schema';
import { type CreateCertificationInput } from '../schema';
import { getCertifications } from '../handlers/get_certifications';

// Test certification data
const testCertifications: CreateCertificationInput[] = [
  {
    name: 'Project Management Professional (PMP)',
    issuer: 'Project Management Institute (PMI)',
    year: 2020,
    description: 'Globally recognized certification in project management'
  },
  {
    name: 'Aerospace Project Management Certification',
    issuer: 'Indonesian Aerospace',
    year: 2021,
    description: 'Specialized certification in aerospace industry'
  },
  {
    name: 'Risk Management Professional',
    issuer: 'Risk Management Society',
    year: 2019,
    description: null // Test nullable field
  }
];

describe('getCertifications', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return empty array when no certifications exist', async () => {
    const result = await getCertifications();
    expect(result).toHaveLength(0);
  });

  it('should fetch all certifications ordered by year desc', async () => {
    // Insert test certifications
    await db.insert(certificationsTable)
      .values(testCertifications)
      .execute();

    const result = await getCertifications();

    expect(result).toHaveLength(3);
    
    // Check ordering by year descending
    expect(result[0].year).toBe(2021);
    expect(result[1].year).toBe(2020);
    expect(result[2].year).toBe(2019);

    // Verify first certification details
    expect(result[0].name).toBe('Aerospace Project Management Certification');
    expect(result[0].issuer).toBe('Indonesian Aerospace');
    expect(result[0].description).toBe('Specialized certification in aerospace industry');
    expect(result[0].id).toBeDefined();
    expect(result[0].created_at).toBeInstanceOf(Date);
  });

  it('should handle nullable description field correctly', async () => {
    // Insert certification with null description
    await db.insert(certificationsTable)
      .values([testCertifications[2]]) // This one has null description
      .execute();

    const result = await getCertifications();

    expect(result).toHaveLength(1);
    expect(result[0].description).toBeNull();
    expect(result[0].name).toBe('Risk Management Professional');
  });

  it('should return certifications with all required fields', async () => {
    await db.insert(certificationsTable)
      .values([testCertifications[0]])
      .execute();

    const result = await getCertifications();

    expect(result).toHaveLength(1);
    const certification = result[0];

    // Verify all required fields are present
    expect(certification.id).toBeDefined();
    expect(certification.name).toBe('Project Management Professional (PMP)');
    expect(certification.issuer).toBe('Project Management Institute (PMI)');
    expect(certification.year).toBe(2020);
    expect(certification.description).toBe('Globally recognized certification in project management');
    expect(certification.created_at).toBeInstanceOf(Date);
  });
});
