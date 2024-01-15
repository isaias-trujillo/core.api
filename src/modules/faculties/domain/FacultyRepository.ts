import Faculty from "./Faculty.ts";

export interface FacultyRepository {
    findByCode(id: number): Promise<Faculty | null>

    findByName(name: string): Promise<Faculty | null>

    save(faculty: Faculty): Promise<void>
}

export default FacultyRepository