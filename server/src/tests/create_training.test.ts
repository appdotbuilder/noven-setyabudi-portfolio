
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { trainingsTable } from '../db/schema';
import { type CreateTrainingInput } from '../schema';
import { createTraining } from '../handlers/create_training';
import { eq } from 'drizzle-orm';

// Simple test input
const testInput: CreateTrainingInput = {
  title: 'Advanced JavaScript Development',
  organization: 'Tech Academy',
  location: 'New York, NY',
  year: 2023,
  description: 'Comprehensive training on modern JavaScript frameworks and best practices'
};

describe('createTraining', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create a training', async () => {
    const result = await createTraining(testInput);

    // Basic field validation
    expect(result.title).toEqual('Advanced JavaScript Development');
    expect(result.organization).toEqual('Tech Academy');
    expect(result.location).toEqual('New York, NY');
    expect(result.year).toEqual(2023);
    expect(result.description).toEqual(testInput.description);
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
  });

  it('should save training to database', async () => {
    const result = await createTraining(testInput);

    // Query using proper drizzle syntax
    const trainings = await db.select()
      .from(trainingsTable)
      .where(eq(trainingsTable.id, result.id))
      .execute();

    expect(trainings).toHaveLength(1);
    expect(trainings[0].title).toEqual('Advanced JavaScript Development');
    expect(trainings[0].organization).toEqual('Tech Academy');
    expect(trainings[0].location).toEqual('New York, NY');
    expect(trainings[0].year).toEqual(2023);
    expect(trainings[0].description).toEqual(testInput.description);
    expect(trainings[0].created_at).toBeInstanceOf(Date);
  });

  it('should handle different training organizations', async () => {
    const corporateTraining = {
      ...testInput,
      organization: 'Microsoft Corporation',
      title: 'Azure Cloud Architecture',
      location: 'Seattle, WA'
    };

    const result = await createTraining(corporateTraining);

    expect(result.organization).toEqual('Microsoft Corporation');
    expect(result.title).toEqual('Azure Cloud Architecture');
    expect(result.location).toEqual('Seattle, WA');
  });

  it('should handle training from different years', async () => {
    const olderTraining = {
      ...testInput,
      year: 2020,
      title: 'Legacy System Modernization'
    };

    const result = await createTraining(olderTraining);

    expect(result.year).toEqual(2020);
    expect(result.title).toEqual('Legacy System Modernization');
  });
});
