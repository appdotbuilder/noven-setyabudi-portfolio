
import { db } from '../db';
import { profileTable } from '../db/schema';
import { type Profile } from '../schema';

export const getProfile = async (): Promise<Profile | null> => {
  try {
    const results = await db.select()
      .from(profileTable)
      .limit(1)
      .execute();

    if (results.length === 0) {
      return null;
    }

    return results[0];
  } catch (error) {
    console.error('Profile fetch failed:', error);
    throw error;
  }
};
