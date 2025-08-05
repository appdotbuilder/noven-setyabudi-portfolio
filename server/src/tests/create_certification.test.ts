
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { certificationsTable } from '../db/schema';
import { type CreateCertificationInput } from '../schema';
import { createCertification } from '../handlers/create_certification';
import { eq } from 'drizzle-orm';

// Test input with all required fields
const testInput: CreateCertificationInput = {
  name: 'AWS Solutions Architect',
  issuer: 'Amazon Web Services',
  year: 2023,
  description: 'Professional certification for cloud architecture'
};

// Test input with optional description
const testInputWithoutDescription: CreateCertificationInput = {
  name: 'Google Cloud Professional',
  issuer: 'Google Cloud',
  year: 2024
};

describe('createCertification', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create a certification with description', async () => {
    const result = await createCertification(testInput);

    // Basic field validation
    expect(result.name).toEqual('AWS Solutions Architect');
    expect(result.issuer).toEqual('Amazon Web Services');
    expect(result.year).toEqual(2023);
    expect(result.description).toEqual('Professional certification for cloud architecture');
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
  });

  it('should create a certification with null description', async () => {
    const result = await createCertification(testInputWithoutDescription);

    // Basic field validation
    expect(result.name).toEqual('Google Cloud Professional');
    expect(result.issuer).toEqual('Google Cloud');
    expect(result.year).toEqual(2024);
    expect(result.description).toBeNull();
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
  });

  it('should save certification to database', async () => {
    const result = await createCertification(testInput);

    // Query using proper drizzle syntax
    const certifications = await db.select()
      .from(certificationsTable)
      .where(eq(certificationsTable.id, result.id))
      .execute();

    expect(certifications).toHaveLength(1);
    expect(certifications[0].name).toEqual('AWS Solutions Architect');
    expect(certifications[0].issuer).toEqual('Amazon Web Services');
    expect(certifications[0].year).toEqual(2023);
    expect(certifications[0].description).toEqual('Professional certification for cloud architecture');
    expect(certifications[0].created_at).toBeInstanceOf(Date);
  });

  it('should save certification with null description to database', async () => {
    const result = await createCertification(testInputWithoutDescription);

    // Query the database
    const certifications = await db.select()
      .from(certificationsTable)
      .where(eq(certificationsTable.id, result.id))
      .execute();

    expect(certifications).toHaveLength(1);
    expect(certifications[0].name).toEqual('Google Cloud Professional');
    expect(certifications[0].issuer).toEqual('Google Cloud');
    expect(certifications[0].year).toEqual(2024);
    expect(certifications[0].description).toBeNull();
    expect(certifications[0].created_at).toBeInstanceOf(Date);
  });
});
