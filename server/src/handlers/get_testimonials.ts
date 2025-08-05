
import { type Testimonial } from '../schema';

export async function getTestimonials(): Promise<Testimonial[]> {
    // This is a placeholder declaration! Real code should be implemented here.
    // The goal of this handler is fetching all testimonials from the database ordered by created_at desc.
    const mockTestimonials: Testimonial[] = [
        {
            id: 1,
            name: "Ahmad Rizki",
            position: "Project Director",
            company: "Indonesian Aerospace",
            message: "Noven adalah project manager yang sangat kompeten dan berpengalaman. Kemampuannya dalam mengelola proyek-proyek aerospace yang kompleks sangat mengesankan. Dia selalu berhasil menyelesaikan proyek tepat waktu dan sesuai budget.",
            rating: 5,
            created_at: new Date()
        },
        {
            id: 2,
            name: "Sarah Abdullah",
            position: "Senior Engineer",
            company: "Royal Malaysian Air Force",
            message: "Working with Noven on the CN235 project was an excellent experience. His expertise in stakeholder management and risk analysis helped us navigate complex technical challenges smoothly.",
            rating: 5,
            created_at: new Date()
        },
        {
            id: 3,
            name: "Captain Miguel Santos",
            position: "Project Coordinator",
            company: "Philippine Air Force",
            message: "Noven's professional approach and deep understanding of aerospace project management made the NC212i project a great success. His training programs also significantly improved our team's capabilities.",
            rating: 5,
            created_at: new Date()
        },
        {
            id: 4,
            name: "Budi Santoso",
            position: "Training Participant",
            company: "PT Dirgantara Indonesia",
            message: "Pelatihan EVM yang diberikan Noven sangat praktis dan mudah dipahami. Materi yang disampaikan langsung applicable di pekerjaan sehari-hari. Highly recommended trainer!",
            rating: 5,
            created_at: new Date()
        }
    ];
    
    return Promise.resolve(mockTestimonials);
}
