
import { db } from '../db';
import { profileTable } from '../db/schema';
import { type UpdateProfileInput, type Profile } from '../schema';
import { eq } from 'drizzle-orm';

export const updateProfile = async (input: UpdateProfileInput): Promise<Profile> => {
  try {
    // Get existing profile first (assuming single profile)
    const existingProfiles = await db.select()
      .from(profileTable)
      .execute();

    if (existingProfiles.length === 0) {
      throw new Error('Profile not found');
    }

    const existingProfile = existingProfiles[0];

    // Build update object with only provided fields
    const updateData: any = {};
    
    if (input.full_name !== undefined) updateData.full_name = input.full_name;
    if (input.headline !== undefined) updateData.headline = input.headline;
    if (input.bio !== undefined) updateData.bio = input.bio;
    if (input.profile_image_url !== undefined) updateData.profile_image_url = input.profile_image_url;
    if (input.cv_url !== undefined) updateData.cv_url = input.cv_url;
    if (input.email !== undefined) updateData.email = input.email;
    if (input.phone !== undefined) updateData.phone = input.phone;
    if (input.linkedin_url !== undefined) updateData.linkedin_url = input.linkedin_url;
    if (input.whatsapp_url !== undefined) updateData.whatsapp_url = input.whatsapp_url;

    // Always update the updated_at timestamp
    updateData.updated_at = new Date();

    // Update the profile
    const result = await db.update(profileTable)
      .set(updateData)
      .where(eq(profileTable.id, existingProfile.id))
      .returning()
      .execute();

    return result[0];
  } catch (error) {
    console.error('Profile update failed:', error);
    throw error;
  }
};
