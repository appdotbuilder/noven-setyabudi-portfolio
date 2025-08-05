
import { db } from '../db';
import { trainingsTable } from '../db/schema';
import { type CreateTrainingInput, type Training } from '../schema';

export const createTraining = async (input: CreateTrainingInput): Promise<Training> => {
  try {
    // Insert training record
    const result = await db.insert(trainingsTable)
      .values({
        title: input.title,
        organization: input.organization,
        location: input.location,
        year: input.year,
        description: input.description
      })
      .returning()
      .execute();

    return result[0];
  } catch (error) {
    console.error('Training creation failed:', error);
    throw error;
  }
};
