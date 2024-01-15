import {assertEquals, assertExists} from "https://deno.land/std@0.104.0/testing/asserts.ts";
import FacultyService from "../../../../src/modules/faculties/infrastructure/FacultyService.ts";
import Faculty from "../../../../src/modules/faculties/domain/Faculty.ts";

Deno.test("Cuando se proporciona una facultad que ya existe no debe registrarse", async () => {
    const service = new FacultyService();
    // check if faculty exists
    const facultyExists = await service.findByCode(11);
    // assert faculty exists
    assertExists(facultyExists);
    // save faculty
    const faculty: Faculty = {
        name: "Facultad de Ciencias Contables",
        code: 11
    }
    await service.save(faculty);

    // check if faculty exists
    assertExists(facultyExists);
});

Deno.test("Cuando se proporciona una facultad que no existe debe registrarse", async () => {
    const service = new FacultyService();
    // check if faculty exists
    const facultyExists = await service.findByCode(100);
    // assert faculty exists
    assertEquals(facultyExists, null);
    // save faculty
    const faculty: Faculty = {
        name: "Facultad de Ciencias Contables 2",
        code: 100
    }
    await service.save(faculty);

    // check if faculty exists
    const facultySaved = await service.findByCode(100);
    assertExists(facultySaved);
});