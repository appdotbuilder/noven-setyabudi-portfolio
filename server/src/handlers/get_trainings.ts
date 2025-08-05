
import { type Training } from '../schema';

export async function getTrainings(): Promise<Training[]> {
    // This is a placeholder declaration! Real code should be implemented here.
    // The goal of this handler is fetching all training records from the database ordered by year desc.
    const mockTrainings: Training[] = [
        {
            id: 1,
            title: "Work Breakdown Structure (WBS) Workshop",
            organization: "Indonesian Aerospace",
            location: "Bandung, Indonesia",
            year: 2023,
            description: "Conducted comprehensive WBS training for project managers and team leads, covering decomposition techniques, work package definition, and WBS dictionary creation.",
            created_at: new Date()
        },
        {
            id: 2,
            title: "Earned Value Management (EVM) Training",
            organization: "SRZ Training Center",
            location: "Kuala Lumpur, Malaysia",
            year: 2023,
            description: "Delivered advanced EVM training covering performance measurement, variance analysis, and forecasting techniques for international aerospace professionals.",
            created_at: new Date()
        },
        {
            id: 3,
            title: "Project Scheduling & Critical Path Method",
            organization: "Indonesian Aerospace",
            location: "Bandung, Indonesia",
            year: 2022,
            description: "Training program focused on advanced scheduling techniques, resource allocation, and critical path analysis using industry-standard tools.",
            created_at: new Date()
        },
        {
            id: 4,
            title: "Risk Management in Aerospace Projects",
            organization: "SRZ Training Center",
            location: "Jakarta, Indonesia",
            year: 2022,
            description: "Specialized training on identifying, assessing, and mitigating risks specific to aerospace industry projects and operations.",
            created_at: new Date()
        }
    ];
    
    return Promise.resolve(mockTrainings);
}
