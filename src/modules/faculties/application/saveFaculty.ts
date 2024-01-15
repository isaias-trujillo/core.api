import facultyRepository from "../domain/FacultyRepository.ts";
import Faculty from "../domain/Faculty.ts";

const saveFaculty = (facultyRepository: facultyRepository) => async (faculty: Faculty) => {
    return await facultyRepository.save(faculty);
}

export default saveFaculty;