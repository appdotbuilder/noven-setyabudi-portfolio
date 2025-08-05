
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { projectsTable } from '../db/schema';
import { type CreateProjectInput } from '../schema';
import { getProjects } from '../handlers/get_projects';

const testProject1: CreateProjectInput = {
  name: 'NC212i for PAF (Philippine Air Force)',
  year: 2023,
  role: 'Senior Project Manager',
  tools: '["MS Project", "Primavera P6", "Power BI", "Excel"]',
  achievements: 'Successfully delivered aircraft modification project on time and within budget.',
  image_url: null,
  description: 'Leading the NC212i aircraft delivery project for Philippine Air Force.'
};

const testProject2: CreateProjectInput = {
  name: 'CN235 for RMAF (Royal Malaysian Air Force)',
  year: 2022,
  role: 'Project Manager',
  tools: '["MS Project", "SAP", "Risk Register", "EVM Tools"]',
  achievements: 'Implemented comprehensive risk management framework.',
  image_url: null,
  description: 'Managing CN235 aircraft program for Royal Malaysian Air Force.'
};

const testProject3: CreateProjectInput = {
  name: 'C295 for TNI AU (Indonesian Air Force)',
  year: 2021,
  role: 'Project Manager',
  tools: '["Primavera P6", "Power BI", "Excel", "MS Teams"]',
  achievements: 'Delivered complex military aircraft project with 100% quality compliance.',
  image_url: null,
  description: 'Leading C295 aircraft delivery for Indonesian Air Force.'
};

describe('getProjects', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return empty array when no projects exist', async () => {
    const result = await getProjects();
    
    expect(result).toHaveLength(0);
  });

  it('should return all projects ordered by year descending', async () => {
    // Insert test projects
    await db.insert(projectsTable).values([
      testProject1,
      testProject2,
      testProject3
    ]).execute();

    const result = await getProjects();

    expect(result).toHaveLength(3);
    
    // Verify ordering by year (descending)
    expect(result[0].year).toBe(2023);
    expect(result[1].year).toBe(2022);
    expect(result[2].year).toBe(2021);

    // Verify project data
    expect(result[0].name).toBe('NC212i for PAF (Philippine Air Force)');
    expect(result[0].role).toBe('Senior Project Manager');
    expect(result[0].tools).toBe('["MS Project", "Primavera P6", "Power BI", "Excel"]');
    expect(result[0].achievements).toBe('Successfully delivered aircraft modification project on time and within budget.');
    expect(result[0].description).toBe('Leading the NC212i aircraft delivery project for Philippine Air Force.');
    expect(result[0].image_url).toBeNull();
    expect(result[0].id).toBeDefined();
    expect(result[0].created_at).toBeInstanceOf(Date);
  });

  it('should handle single project correctly', async () => {
    await db.insert(projectsTable)
      .values(testProject2)
      .execute();

    const result = await getProjects();

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('CN235 for RMAF (Royal Malaysian Air Force)');
    expect(result[0].year).toBe(2022);
    expect(result[0].created_at).toBeInstanceOf(Date);
  });

  it('should maintain correct ordering with same year projects', async () => {
    const sameYearProject1 = {
      ...testProject1,
      name: 'Project A',
      year: 2023
    };
    
    const sameYearProject2 = {
      ...testProject2,
      name: 'Project B',
      year: 2023
    };

    await db.insert(projectsTable)
      .values([sameYearProject1, sameYearProject2])
      .execute();

    const result = await getProjects();

    expect(result).toHaveLength(2);
    expect(result[0].year).toBe(2023);
    expect(result[1].year).toBe(2023);
    // Both projects should be from the same year
    result.forEach(project => {
      expect(project.year).toBe(2023);
    });
  });
});
