
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { projectsTable } from '../db/schema';
import { type CreateProjectInput } from '../schema';
import { createProject } from '../handlers/create_project';
import { eq } from 'drizzle-orm';

// Test input with all required fields
const testInput: CreateProjectInput = {
  name: 'Test Project',
  year: 2024,
  role: 'Full Stack Developer',
  tools: '["React", "Node.js", "TypeScript"]',
  achievements: 'Successfully delivered the project on time',
  image_url: 'https://example.com/image.jpg',
  description: 'A comprehensive project showcasing modern web development'
};

describe('createProject', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create a project with all fields', async () => {
    const result = await createProject(testInput);

    // Basic field validation
    expect(result.name).toEqual('Test Project');
    expect(result.year).toEqual(2024);
    expect(result.role).toEqual('Full Stack Developer');
    expect(result.tools).toEqual('["React", "Node.js", "TypeScript"]');
    expect(result.achievements).toEqual('Successfully delivered the project on time');
    expect(result.image_url).toEqual('https://example.com/image.jpg');
    expect(result.description).toEqual('A comprehensive project showcasing modern web development');
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
  });

  it('should save project to database', async () => {
    const result = await createProject(testInput);

    // Query using proper drizzle syntax
    const projects = await db.select()
      .from(projectsTable)
      .where(eq(projectsTable.id, result.id))
      .execute();

    expect(projects).toHaveLength(1);
    expect(projects[0].name).toEqual('Test Project');
    expect(projects[0].year).toEqual(2024);
    expect(projects[0].role).toEqual('Full Stack Developer');
    expect(projects[0].tools).toEqual('["React", "Node.js", "TypeScript"]');
    expect(projects[0].achievements).toEqual('Successfully delivered the project on time');
    expect(projects[0].image_url).toEqual('https://example.com/image.jpg');
    expect(projects[0].description).toEqual('A comprehensive project showcasing modern web development');
    expect(projects[0].created_at).toBeInstanceOf(Date);
  });

  it('should create project with null image_url when not provided', async () => {
    const inputWithoutImage: CreateProjectInput = {
      name: 'Project Without Image',
      year: 2023,
      role: 'Backend Developer',
      tools: '["Node.js", "PostgreSQL"]',
      achievements: 'Built scalable API architecture',
      description: 'Backend-focused project'
    };

    const result = await createProject(inputWithoutImage);

    expect(result.name).toEqual('Project Without Image');
    expect(result.image_url).toBeNull();
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);

    // Verify in database
    const projects = await db.select()
      .from(projectsTable)
      .where(eq(projectsTable.id, result.id))
      .execute();

    expect(projects[0].image_url).toBeNull();
  });

  it('should handle multiple projects creation', async () => {
    const input1: CreateProjectInput = {
      name: 'First Project',
      year: 2023,
      role: 'Frontend Developer',
      tools: '["React", "CSS"]',
      achievements: 'Created responsive UI',
      description: 'Frontend project'
    };

    const input2: CreateProjectInput = {
      name: 'Second Project',
      year: 2024,
      role: 'Backend Developer',
      tools: '["Node.js", "Express"]',
      achievements: 'Built REST API',
      description: 'Backend project'
    };

    const result1 = await createProject(input1);
    const result2 = await createProject(input2);

    expect(result1.id).not.toEqual(result2.id);
    expect(result1.name).toEqual('First Project');
    expect(result2.name).toEqual('Second Project');

    // Verify both projects exist in database
    const allProjects = await db.select()
      .from(projectsTable)
      .execute();

    expect(allProjects).toHaveLength(2);
  });
});
