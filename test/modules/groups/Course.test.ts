import {assertEquals} from "asserts";
import CourseName from "../../../src/modules/groups/CourseName.ts";

Deno.test({
    name: "Cuando se crea un curso con un nombre vacío, debe fallar",
    fn() {
        const request = [
            '',
            ' ',
            '  ',
        ]
        request.forEach(name => {
            const result = CourseName.from(name);
            assertEquals(result.ok, false);
        })
    }
})

Deno.test({
    name: "Cuando se proporciona un nombre inválido, debe fallar",
    fn() {
        const request = [
            'a!#!#$Tkdii2o12r nmwebklu34ioo[3',
            "progrmaci[on",
            "@sA?>REY^ ^&AS <VF"
        ]
        request.forEach(name => {
            const result = CourseName.from(name);
            assertEquals(result.ok, false);
        })
    }
})

Deno.test({
    name: "Cuando se proporciona un nombre válido, debe crear el curso",
    fn() {
        const request = [
            "           INTRODUCCIÓN         A       LA          CONTABILIDAD",
            "   DERECHOS FUNDAMENTALES, CIUDADANÍA Y DERECHOS HUMANOS",
            "INGLÉS II          ",
            "MICROECONOMÍA      ",
            "SEMINARIO NIC Y            NIF CON INCIDENCIA TRIBUTARIA            ",
        ]
        const expected = [
            "Introducción a la Contabilidad",
            "Derechos Fundamentales, Ciudadanía y Derechos Humanos",
            "Inglés II",
            "Microeconomía",
            "Seminario NIC y NIF con Incidencia Tributaria",
        ]
        request.forEach((name, index) => {
            const result = CourseName.from(name);
            if (result.ok === false) {
                throw result.error
            }
            const course = result.value
            assertEquals(course, expected[index]);
        })
    }
})