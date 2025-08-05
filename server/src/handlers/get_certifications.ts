
import { type Certification } from '../schema';

export async function getCertifications(): Promise<Certification[]> {
    // This is a placeholder declaration! Real code should be implemented here.
    // The goal of this handler is fetching all certifications from the database ordered by year desc.
    const mockCertifications: Certification[] = [
        {
            id: 1,
            name: "Project Management Professional (PMP)",
            issuer: "Project Management Institute (PMI)",
            year: 2020,
            description: "Globally recognized certification in project management best practices and methodologies.",
            created_at: new Date()
        },
        {
            id: 2,
            name: "Aerospace Project Management Certification",
            issuer: "Indonesian Aerospace",
            year: 2019,
            description: "Specialized certification in aerospace industry project management standards and practices.",
            created_at: new Date()
        },
        {
            id: 3,
            name: "Risk Management Professional",
            issuer: "Risk Management Society",
            year: 2021,
            description: "Advanced certification in project risk assessment, analysis, and mitigation strategies.",
            created_at: new Date()
        }
    ];
    
    return Promise.resolve(mockCertifications);
}
