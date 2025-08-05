
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { profileTable } from '../db/schema';
import { type UpdateProfileInput, type Profile } from '../schema';
import { updateProfile } from '../handlers/update_profile';
import { eq } from 'drizzle-orm';

// Test input for updating profile
const testUpdateInput: UpdateProfileInput = {
  full_name: 'Updated Name',
  headline: 'Updated Headline',
  bio: 'Updated bio content',
  email: 'updated@example.com',
  phone: '+1234567890',
  linkedin_url: 'https://linkedin.com/in/updated',
  whatsapp_url: 'https://wa.me/1234567890'
};

describe('updateProfile', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should throw error when no profile exists', async () => {
    await expect(updateProfile(testUpdateInput)).rejects.toThrow(/profile not found/i);
  });

  it('should update profile with all fields', async () => {
    // Create initial profile
    await db.insert(profileTable).values({
      full_name: 'Original Name',
      headline: 'Original Headline',
      bio: 'Original bio',
      email: 'original@example.com',
      phone: null,
      linkedin_url: null,
      whatsapp_url: null
    }).execute();

    const result = await updateProfile(testUpdateInput);

    // Verify updated fields
    expect(result.full_name).toEqual('Updated Name');
    expect(result.headline).toEqual('Updated Headline');
    expect(result.bio).toEqual('Updated bio content');
    expect(result.email).toEqual('updated@example.com');
    expect(result.phone).toEqual('+1234567890');
    expect(result.linkedin_url).toEqual('https://linkedin.com/in/updated');
    expect(result.whatsapp_url).toEqual('https://wa.me/1234567890');
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should update only provided fields', async () => {
    // Create initial profile
    await db.insert(profileTable).values({
      full_name: 'Original Name',
      headline: 'Original Headline',
      bio: 'Original bio',
      email: 'original@example.com',
      phone: '+9876543210',
      linkedin_url: 'https://linkedin.com/in/original',
      whatsapp_url: 'https://wa.me/9876543210'
    }).execute();

    // Update only specific fields
    const partialUpdate: UpdateProfileInput = {
      full_name: 'New Name Only',
      email: 'newemail@example.com'
    };

    const result = await updateProfile(partialUpdate);

    // Verify only specified fields were updated
    expect(result.full_name).toEqual('New Name Only');
    expect(result.email).toEqual('newemail@example.com');
    
    // Original values should remain unchanged
    expect(result.headline).toEqual('Original Headline');
    expect(result.bio).toEqual('Original bio');
    expect(result.phone).toEqual('+9876543210');
    expect(result.linkedin_url).toEqual('https://linkedin.com/in/original');
    expect(result.whatsapp_url).toEqual('https://wa.me/9876543210');
  });

  it('should update profile in database', async () => {
    // Create initial profile
    const initialProfile = await db.insert(profileTable).values({
      full_name: 'Original Name',
      headline: 'Original Headline',
      bio: 'Original bio',
      email: 'original@example.com'
    }).returning().execute();

    const result = await updateProfile(testUpdateInput);

    // Query database to verify changes
    const updatedProfile = await db.select()
      .from(profileTable)
      .where(eq(profileTable.id, result.id))
      .execute();

    expect(updatedProfile).toHaveLength(1);
    expect(updatedProfile[0].full_name).toEqual('Updated Name');
    expect(updatedProfile[0].headline).toEqual('Updated Headline');
    expect(updatedProfile[0].email).toEqual('updated@example.com');
    expect(updatedProfile[0].updated_at).toBeInstanceOf(Date);
    
    // Verify updated_at is more recent than created_at
    expect(updatedProfile[0].updated_at.getTime()).toBeGreaterThanOrEqual(updatedProfile[0].created_at.getTime());
  });

  it('should handle nullable fields correctly', async () => {
    // Create initial profile with some null values
    await db.insert(profileTable).values({
      full_name: 'Test Name',
      headline: 'Test Headline', 
      bio: 'Test bio',
      email: 'test@example.com',
      phone: null,
      linkedin_url: null,
      whatsapp_url: null
    }).execute();

    // Update with explicit null values
    const nullUpdate: UpdateProfileInput = {
      phone: null,
      linkedin_url: null,
      profile_image_url: null,
      cv_url: null
    };

    const result = await updateProfile(nullUpdate);

    expect(result.phone).toBeNull();
    expect(result.linkedin_url).toBeNull();
    expect(result.profile_image_url).toBeNull();
    expect(result.cv_url).toBeNull();
    
    // Non-updated fields should remain
    expect(result.full_name).toEqual('Test Name');
    expect(result.email).toEqual('test@example.com');
  });
});
