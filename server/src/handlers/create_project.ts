
import { db } from '../db';
import { projectsTable } from '../db/schema';
import { type CreateProjectInput, type Project } from '../schema';

export const createProject = async (input: CreateProjectInput): Promise<Project> => {
  try {
    // Insert project record
    const result = await db.insert(projectsTable)
      .values({
        name: input.name,
        year: input.year,
        role: input.role,
        tools: input.tools,
        achievements: input.achievements,
        image_url: input.image_url || null,
        description: input.description
      })
      .returning()
      .execute();

    // Return the created project
    const project = result[0];
    return project;
  } catch (error) {
    console.error('Project creation failed:', error);
    throw error;
  }
};
