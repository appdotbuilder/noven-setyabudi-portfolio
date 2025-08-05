
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { contactSubmissionsTable } from '../db/schema';
import { getContactSubmissions } from '../handlers/get_contact_submissions';

describe('getContactSubmissions', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return empty array when no submissions exist', async () => {
    const result = await getContactSubmissions();
    expect(result).toEqual([]);
  });

  it('should return all contact submissions', async () => {
    // Create test submissions separately to ensure different timestamps
    await db.insert(contactSubmissionsTable).values({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Business Inquiry',
      message: 'I would like to discuss a project with you.',
      phone: '+1234567890',
      status: 'new'
    }).execute();

    // Small delay to ensure different timestamp
    await new Promise(resolve => setTimeout(resolve, 10));

    await db.insert(contactSubmissionsTable).values({
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'Question',
      message: 'I have a question about your services.',
      phone: null,
      status: 'read'
    }).execute();

    const result = await getContactSubmissions();

    expect(result).toHaveLength(2);
    
    // Since Jane was inserted second, she should be first (newest first)
    expect(result[0].name).toEqual('Jane Smith');
    expect(result[0].email).toEqual('jane@example.com');
    expect(result[0].subject).toEqual('Question');
    expect(result[0].message).toEqual('I have a question about your services.');
    expect(result[0].phone).toBeNull();
    expect(result[0].status).toEqual('read');
    expect(result[0].id).toBeDefined();
    expect(result[0].created_at).toBeInstanceOf(Date);

    expect(result[1].name).toEqual('John Doe');
    expect(result[1].email).toEqual('john@example.com');
    expect(result[1].subject).toEqual('Business Inquiry');
    expect(result[1].message).toEqual('I would like to discuss a project with you.');
    expect(result[1].phone).toEqual('+1234567890');
    expect(result[1].status).toEqual('new');
    expect(result[1].id).toBeDefined();
    expect(result[1].created_at).toBeInstanceOf(Date);
  });

  it('should return submissions ordered by created_at desc (newest first)', async () => {
    // Create submissions with explicit delays to ensure different timestamps
    const firstSubmission = await db.insert(contactSubmissionsTable).values({
      name: 'First User',
      email: 'first@example.com',
      subject: 'First Subject',
      message: 'First message content here.',
      status: 'new'
    }).returning().execute();

    // Delay to ensure different timestamps
    await new Promise(resolve => setTimeout(resolve, 10));

    const secondSubmission = await db.insert(contactSubmissionsTable).values({
      name: 'Second User',
      email: 'second@example.com',
      subject: 'Second Subject',
      message: 'Second message content here.',
      status: 'read'
    }).returning().execute();

    const result = await getContactSubmissions();

    expect(result).toHaveLength(2);
    // Newest submission should be first
    expect(result[0].name).toEqual('Second User');
    expect(result[1].name).toEqual('First User');
    expect(result[0].created_at.getTime()).toBeGreaterThanOrEqual(result[1].created_at.getTime());
  });

  it('should handle different status values correctly', async () => {
    // Create submissions separately to avoid timestamp issues
    await db.insert(contactSubmissionsTable).values({
      name: 'User 1',
      email: 'user1@example.com',
      subject: 'Test 1',
      message: 'Test message 1',
      status: 'new'
    }).execute();

    await db.insert(contactSubmissionsTable).values({
      name: 'User 2',
      email: 'user2@example.com',
      subject: 'Test 2',
      message: 'Test message 2',
      status: 'read'
    }).execute();

    await db.insert(contactSubmissionsTable).values({
      name: 'User 3',
      email: 'user3@example.com',
      subject: 'Test 3',
      message: 'Test message 3',
      status: 'replied'
    }).execute();

    const result = await getContactSubmissions();

    expect(result).toHaveLength(3);
    const statuses = result.map(submission => submission.status);
    expect(statuses).toContain('new');
    expect(statuses).toContain('read');
    expect(statuses).toContain('replied');
  });
});
