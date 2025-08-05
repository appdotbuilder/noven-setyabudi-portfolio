
import { db } from '../db';
import { certificationsTable } from '../db/schema';
import { type CreateCertificationInput, type Certification } from '../schema';

export const createCertification = async (input: CreateCertificationInput): Promise<Certification> => {
  try {
    // Insert certification record
    const result = await db.insert(certificationsTable)
      .values({
        name: input.name,
        issuer: input.issuer,
        year: input.year,
        description: input.description || null
      })
      .returning()
      .execute();

    return result[0];
  } catch (error) {
    console.error('Certification creation failed:', error);
    throw error;
  }
};
