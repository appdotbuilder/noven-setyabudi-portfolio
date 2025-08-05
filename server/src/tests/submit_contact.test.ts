
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { contactSubmissionsTable } from '../db/schema';
import { type ContactForm } from '../schema';
import { submitContact } from '../handlers/submit_contact';
import { eq } from 'drizzle-orm';

// Test input with all required fields
const testInput: ContactForm = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  subject: 'Inquiry about your services',
  message: 'I would like to know more about your portfolio and availability.',
  phone: '+1234567890'
};

// Test input without optional phone field
const testInputNoPhone: ContactForm = {
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  subject: 'Project collaboration',
  message: 'I have a project that might interest you. Let me know if you are available.'
};

describe('submitContact', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should submit contact form with all fields', async () => {
    const result = await submitContact(testInput);

    // Basic field validation
    expect(result.name).toEqual('John Doe');
    expect(result.email).toEqual('john.doe@example.com');
    expect(result.subject).toEqual('Inquiry about your services');
    expect(result.message).toEqual('I would like to know more about your portfolio and availability.');
    expect(result.phone).toEqual('+1234567890');
    expect(result.status).toEqual('new');
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
  });

  it('should submit contact form without phone number', async () => {
    const result = await submitContact(testInputNoPhone);

    // Basic field validation
    expect(result.name).toEqual('Jane Smith');
    expect(result.email).toEqual('jane.smith@example.com');
    expect(result.subject).toEqual('Project collaboration');
    expect(result.message).toEqual('I have a project that might interest you. Let me know if you are available.');
    expect(result.phone).toBeNull();
    expect(result.status).toEqual('new');
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
  });

  it('should save contact submission to database', async () => {
    const result = await submitContact(testInput);

    // Query using proper drizzle syntax
    const submissions = await db.select()
      .from(contactSubmissionsTable)
      .where(eq(contactSubmissionsTable.id, result.id))
      .execute();

    expect(submissions).toHaveLength(1);
    expect(submissions[0].name).toEqual('John Doe');
    expect(submissions[0].email).toEqual('john.doe@example.com');
    expect(submissions[0].subject).toEqual('Inquiry about your services');
    expect(submissions[0].message).toEqual('I would like to know more about your portfolio and availability.');
    expect(submissions[0].phone).toEqual('+1234567890');
    expect(submissions[0].status).toEqual('new');
    expect(submissions[0].created_at).toBeInstanceOf(Date);
  });

  it('should handle multiple contact submissions', async () => {
    // Submit first contact form
    const result1 = await submitContact(testInput);
    
    // Submit second contact form
    const result2 = await submitContact(testInputNoPhone);

    // Verify both submissions were saved
    const allSubmissions = await db.select()
      .from(contactSubmissionsTable)
      .execute();

    expect(allSubmissions).toHaveLength(2);
    
    // Find submissions by ID
    const submission1 = allSubmissions.find(s => s.id === result1.id);
    const submission2 = allSubmissions.find(s => s.id === result2.id);

    expect(submission1).toBeDefined();
    expect(submission1!.name).toEqual('John Doe');
    expect(submission1!.phone).toEqual('+1234567890');

    expect(submission2).toBeDefined();
    expect(submission2!.name).toEqual('Jane Smith');
    expect(submission2!.phone).toBeNull();
  });

  it('should default status to new for all submissions', async () => {
    const result1 = await submitContact(testInput);
    const result2 = await submitContact(testInputNoPhone);

    expect(result1.status).toEqual('new');
    expect(result2.status).toEqual('new');

    // Verify in database
    const submissions = await db.select()
      .from(contactSubmissionsTable)
      .execute();

    submissions.forEach(submission => {
      expect(submission.status).toEqual('new');
    });
  });
});
