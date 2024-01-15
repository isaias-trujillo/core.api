import FacultyRepository from "../domain/FacultyRepository.ts";
import findFacultyByCode from "../application/find/findFacultyByCode.ts";
import findFacultyByName from "../application/find/findFacultyByName.ts";
import saveFaculty from "../application/saveFaculty.ts";
import Faculty from "../domain/Faculty.ts";
import MariaDBFacultyRepository from "./MariaDBFacultyRepository.ts";

export default class FacultyService {
    private readonly facultyRepository: FacultyRepository
    constructor() {
        this.facultyRepository = new MariaDBFacultyRepository();
    }

    async findByCode(facultyCode: number) {
        return findFacultyByCode(this.facultyRepository)(facultyCode);
    }

    async findByName(facultyName: string) {
        return findFacultyByName(this.facultyRepository)(facultyName);
    }

    async save(faculty: Faculty) {
        return saveFaculty(this.facultyRepository)(faculty);
    }
}