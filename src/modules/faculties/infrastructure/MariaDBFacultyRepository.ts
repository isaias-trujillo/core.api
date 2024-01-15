import Faculty from "../domain/Faculty.ts";
import FacultyRepository from "../domain/FacultyRepository.ts";
import MariaDBRepository from "../../shared/infrastructure/MariaDBRepository.ts";

type FacultyRow = {
    name: string,
    code: number
}

export default class MariaDBFacultyRepository extends MariaDBRepository implements FacultyRepository {
    async findByCode(facultyCode: number): Promise<Faculty | null> {
        try {
            const connection = await this.connect();
            const result = await connection.query(`SELECT name, code FROM faculties WHERE code = ?`, [facultyCode]);
            await connection.close();
            if (result.length === 0) {
                return null;
            }
            return result[0] as FacultyRow;
        }catch (e) {
            return null;
        }
    }

    async findByName(facultyName: string): Promise<Faculty | null> {
        try {
            const connection = await this.connect();
            const result = await connection.query(`SELECT name, code FROM faculties WHERE UPPER(name) = UPPER(?)`, [facultyName]);
            await connection.close();
            if (result.length === 0) {
                return null;
            }
            return result[0] as FacultyRow;
        }catch (e) {
            return null;
        }
    }

    async save(faculty: Faculty): Promise<void> {
        try {
            const connection = await this.connect();
            // check if faculty exists in database by code or name
            const result = await connection.query(`SELECT * FROM faculties WHERE code = ? OR UPPER(name) = UPPER(?)`, [faculty.code, faculty.name]);
            if (result.length > 0) {
                await connection.close();
                return;
            }
            await connection.execute(`INSERT INTO faculties (name, code) VALUES (?, ?)`, [faculty.name, faculty.code]);
            await connection.close();
        }catch (e) {
            console.log(e);
        }
    }
}