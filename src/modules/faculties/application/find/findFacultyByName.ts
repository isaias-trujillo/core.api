import Faculty from "../../domain/Faculty.ts";
import FacultyRepository from "../../domain/FacultyRepository.ts";

const findFacultyByName = (facultyRepository: FacultyRepository) => async (facultyName: string): Promise<Faculty | null> => {
    return await facultyRepository.findByName(facultyName);
}

export default findFacultyByName;