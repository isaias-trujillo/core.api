import {assertEquals, assertExists} from "https://deno.land/std@0.104.0/testing/asserts.ts";
import FacultyService from "../../../../src/modules/faculties/infrastructure/FacultyService.ts";
import Faculty from "../../../../src/modules/faculties/domain/Faculty.ts";

Deno.test("Cuando se da un código valido debe retornar la facultad", async () => {
    const service = new FacultyService();
    const faculty = await service.findByCode(11);
    const expected: Faculty = {
        name: "Facultad de Ciencias Contables",
        code: 11
    }
    // assert not null
    assertEquals(faculty, expected);
});

Deno.test("Cuando se da un código invalido debe retornar null", async () => {
    const service = new FacultyService();
    const faculty = await service.findByCode(100);
    assertEquals(faculty, null);
});

Deno.test("Cuando se da un nombre valido debe retornar la facultad", async () => {
    const service = new FacultyService();
    const faculty = await service.findByName("Facultad de Ciencias Contables");
    const expected: Faculty = {
        name: "Facultad de Ciencias Contables",
        code: 11
    }
    // assert not null
    assertEquals(faculty, expected);
});

Deno.test("Cuando se da un nombre invalido debe retornar null", async () => {
    const service = new FacultyService();
    const faculty = await service.findByName("Facultad de Ciencias Contables 2");
    assertEquals(faculty, null);
});