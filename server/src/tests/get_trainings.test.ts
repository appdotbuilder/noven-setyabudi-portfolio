
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { trainingsTable } from '../db/schema';
import { getTrainings } from '../handlers/get_trainings';

describe('getTrainings', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return empty array when no trainings exist', async () => {
    const result = await getTrainings();
    expect(result).toEqual([]);
  });

  it('should return all trainings ordered by year desc', async () => {
    // Create test trainings with different years
    await db.insert(trainingsTable).values([
      {
        title: 'Training A',
        organization: 'Org A',
        location: 'Location A',
        year: 2022,
        description: 'Description A'
      },
      {
        title: 'Training B',
        organization: 'Org B',
        location: 'Location B',
        year: 2024,
        description: 'Description B'
      },
      {
        title: 'Training C',
        organization: 'Org C',
        location: 'Location C',
        year: 2023,
        description: 'Description C'
      }
    ]).execute();

    const result = await getTrainings();

    expect(result).toHaveLength(3);
    
    // Verify ordering by year descending
    expect(result[0].year).toBe(2024);
    expect(result[0].title).toBe('Training B');
    expect(result[1].year).toBe(2023);
    expect(result[1].title).toBe('Training C');
    expect(result[2].year).toBe(2022);
    expect(result[2].title).toBe('Training A');

    // Verify all fields are present
    result.forEach(training => {
      expect(training.id).toBeDefined();
      expect(training.title).toBeDefined();
      expect(training.organization).toBeDefined();
      expect(training.location).toBeDefined();
      expect(training.year).toBeDefined();
      expect(training.description).toBeDefined();
      expect(training.created_at).toBeInstanceOf(Date);
    });
  });

  it('should handle trainings with same year consistently', async () => {
    // Create trainings with same year
    await db.insert(trainingsTable).values([
      {
        title: 'Training X',
        organization: 'Org X',
        location: 'Location X',
        year: 2023,
        description: 'Description X'
      },
      {
        title: 'Training Y',
        organization: 'Org Y',
        location: 'Location Y',
        year: 2023,
        description: 'Description Y'
      }
    ]).execute();

    const result = await getTrainings();

    expect(result).toHaveLength(2);
    expect(result[0].year).toBe(2023);
    expect(result[1].year).toBe(2023);
  });
});
