
import { db } from '../db';
import { contactSubmissionsTable } from '../db/schema';
import { type ContactForm, type ContactSubmission } from '../schema';

export const submitContact = async (input: ContactForm): Promise<ContactSubmission> => {
  try {
    // Insert contact submission record
    const result = await db.insert(contactSubmissionsTable)
      .values({
        name: input.name,
        email: input.email,
        subject: input.subject,
        message: input.message,
        phone: input.phone || null, // Handle optional phone field
        status: 'new' // Default status for new submissions
      })
      .returning()
      .execute();

    return result[0];
  } catch (error) {
    console.error('Contact submission failed:', error);
    throw error;
  }
};
