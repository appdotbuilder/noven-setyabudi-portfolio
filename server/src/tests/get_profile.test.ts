
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { profileTable } from '../db/schema';
import { getProfile } from '../handlers/get_profile';

describe('getProfile', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return null when no profile exists', async () => {
    const result = await getProfile();
    expect(result).toBeNull();
  });

  it('should return the profile when it exists', async () => {
    // Create test profile
    const testProfile = {
      full_name: 'John Doe',
      headline: 'Software Engineer',
      bio: 'Experienced developer with 5 years in web development',
      profile_image_url: 'https://example.com/profile.jpg',
      cv_url: 'https://example.com/cv.pdf',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      linkedin_url: 'https://linkedin.com/in/johndoe',
      whatsapp_url: 'https://wa.me/1234567890'
    };

    await db.insert(profileTable)
      .values(testProfile)
      .execute();

    const result = await getProfile();

    expect(result).not.toBeNull();
    expect(result!.full_name).toEqual('John Doe');
    expect(result!.headline).toEqual('Software Engineer');
    expect(result!.bio).toEqual('Experienced developer with 5 years in web development');
    expect(result!.profile_image_url).toEqual('https://example.com/profile.jpg');
    expect(result!.cv_url).toEqual('https://example.com/cv.pdf');
    expect(result!.email).toEqual('john.doe@example.com');
    expect(result!.phone).toEqual('+1234567890');
    expect(result!.linkedin_url).toEqual('https://linkedin.com/in/johndoe');
    expect(result!.whatsapp_url).toEqual('https://wa.me/1234567890');
    expect(result!.id).toBeDefined();
    expect(result!.created_at).toBeInstanceOf(Date);
    expect(result!.updated_at).toBeInstanceOf(Date);
  });

  it('should return only the first profile when multiple exist', async () => {
    // Create multiple profiles
    const profiles = [
      {
        full_name: 'First Profile',
        headline: 'First Headline',
        bio: 'First bio',
        email: 'first@example.com'
      },
      {
        full_name: 'Second Profile',
        headline: 'Second Headline',
        bio: 'Second bio',
        email: 'second@example.com'
      }
    ];

    for (const profile of profiles) {
      await db.insert(profileTable)
        .values(profile)
        .execute();
    }

    const result = await getProfile();

    expect(result).not.toBeNull();
    expect(result!.full_name).toEqual('First Profile');
    expect(result!.email).toEqual('first@example.com');
  });

  it('should handle profile with null optional fields', async () => {
    const testProfile = {
      full_name: 'Jane Smith',
      headline: 'Product Manager',
      bio: 'Experienced PM with a focus on user experience',
      profile_image_url: null,
      cv_url: null,
      email: 'jane@example.com',
      phone: null,
      linkedin_url: null,
      whatsapp_url: null
    };

    await db.insert(profileTable)
      .values(testProfile)
      .execute();

    const result = await getProfile();

    expect(result).not.toBeNull();
    expect(result!.full_name).toEqual('Jane Smith');
    expect(result!.profile_image_url).toBeNull();
    expect(result!.cv_url).toBeNull();
    expect(result!.phone).toBeNull();
    expect(result!.linkedin_url).toBeNull();
    expect(result!.whatsapp_url).toBeNull();
  });
});
