import {assertEquals} from "asserts";
import Course from "../../../src/modules/groups/Course.ts";

Deno.test({
    name: "Cuando se crea un curso con un nombre vacío, debe fallar",
    fn() {
        const request = [
            '',
            ' ',
            '  ',
        ]
        request.forEach(name => {
            const result = Course.from(name);
            assertEquals(result.tag, 'left');
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
            const result = Course.from(name);
            assertEquals(result.tag, 'left');
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
            const result = Course.from(name);
            if (result.tag === 'left') {
                throw new Error('Course creation failed')
            }
            const course = result.value
            assertEquals(course.value, expected[index]);
        })
    }
})