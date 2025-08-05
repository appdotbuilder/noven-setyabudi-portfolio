
import { type Project } from '../schema';

export async function getProjects(): Promise<Project[]> {
    // This is a placeholder declaration! Real code should be implemented here.
    // The goal of this handler is fetching all projects from the database ordered by year desc.
    const mockProjects: Project[] = [
        {
            id: 1,
            name: "NC212i for PAF (Philippine Air Force)",
            year: 2023,
            role: "Senior Project Manager",
            tools: '["MS Project", "Primavera P6", "Power BI", "Excel"]',
            achievements: "Successfully delivered aircraft modification project on time and within budget. Coordinated flight test activities and stakeholder management across multiple countries.",
            image_url: null,
            description: "Leading the NC212i aircraft delivery project for Philippine Air Force, managing end-to-end project lifecycle including design modifications, manufacturing, testing, and delivery.",
            created_at: new Date()
        },
        {
            id: 2,
            name: "CN235 for RMAF (Royal Malaysian Air Force)",
            year: 2022,
            role: "Project Manager",
            tools: '["MS Project", "SAP", "Risk Register", "EVM Tools"]',
            achievements: "Implemented comprehensive risk management framework. Achieved 98% schedule adherence through effective stakeholder coordination.",
            image_url: null,
            description: "Managing CN235 aircraft program for Royal Malaysian Air Force, focusing on delivery scheduling, quality assurance, and customer satisfaction.",
            created_at: new Date()
        },
        {
            id: 3,
            name: "C295 for TNI AU (Indonesian Air Force)",
            year: 2021,
            role: "Project Manager",
            tools: '["Primavera P6", "Power BI", "Excel", "MS Teams"]',
            achievements: "Delivered complex military aircraft project with 100% quality compliance. Established new project management standards for military contracts.",
            image_url: null,
            description: "Leading C295 aircraft delivery for Indonesian Air Force, managing technical specifications, compliance requirements, and delivery timelines.",
            created_at: new Date()
        }
    ];
    
    return Promise.resolve(mockProjects);
}
