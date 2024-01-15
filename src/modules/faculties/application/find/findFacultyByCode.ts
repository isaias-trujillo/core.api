import FacultyRepository from "../../domain/FacultyRepository.ts";
import Faculty from "../../domain/Faculty.ts";

const findFacultyByCode = (facultyRepository: FacultyRepository) => async (facultyCode: number): Promise<Faculty | null> => {
    return await facultyRepository.findByCode(facultyCode);
}

export default findFacultyByCode;