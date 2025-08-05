
import { db } from '../db';
import { trainingsTable } from '../db/schema';
import { type Training } from '../schema';
import { desc } from 'drizzle-orm';

export const getTrainings = async (): Promise<Training[]> => {
  try {
    const results = await db.select()
      .from(trainingsTable)
      .orderBy(desc(trainingsTable.year))
      .execute();

    return results;
  } catch (error) {
    console.error('Failed to fetch trainings:', error);
    throw error;
  }
};
