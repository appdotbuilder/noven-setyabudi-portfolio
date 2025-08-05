
import { db } from '../db';
import { certificationsTable } from '../db/schema';
import { type Certification } from '../schema';
import { desc } from 'drizzle-orm';

export const getCertifications = async (): Promise<Certification[]> => {
  try {
    const results = await db.select()
      .from(certificationsTable)
      .orderBy(desc(certificationsTable.year))
      .execute();

    return results;
  } catch (error) {
    console.error('Failed to fetch certifications:', error);
    throw error;
  }
};
