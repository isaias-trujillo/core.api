import {assertEquals} from "https://deno.land/std@0.209.0/assert/mod.ts";
import ClassroomAndTurn from "../../../src/modules/groups/ClassroomAndTurn.ts";
import {Field} from "../../../src/modules/shared/domain/Field.ts";

Deno.test({
    name: "Cuando se envía aula sin formato válido debe devolver un error",
    fn(): void {
        const requests = [
            "invalid classroom",
            "  102-M-T  ",
            "Lab-A-1  ",
            "  499 A-W  ",
            " Lab-B A-W  ",
            " 30A ",
            "  19A-M  ",
            "  34A-M-T  ",
        ];
        const expected: Field<ClassroomAndTurn>[] = [
            {
                ok: false,
                error: "Aula sin formato válido, por ejemplo: 102-M, Lab-A-T, 406 D, etc.",
            },
            {
                ok: false,
                error: "Aula sin formato válido, por ejemplo: 102-M, Lab-A-T, 406 D, etc.",
            },
            {
                ok: false,
                error: "Aula sin formato válido, por ejemplo: 102-M, Lab-A-T, 406 D, etc.",
            },
            {
                ok: false,
                error: "Aula sin formato válido, por ejemplo: 102-M, Lab-A-T, 406 D, etc.",
            },
            {
                ok: false,
                error: "Aula sin formato válido, por ejemplo: 102-M, Lab-A-T, 406 D, etc.",
            },
            {
                ok: false,
                error: "Aula sin formato válido, por ejemplo: 102-M, Lab-A-T, 406 D, etc.",
            },
            {
                ok: false,
                error: "Aula sin formato válido, por ejemplo: 102-M, Lab-A-T, 406 D, etc.",
            },
            {
                ok: false,
                error: "Aula sin formato válido, por ejemplo: 102-M, Lab-A-T, 406 D, etc.",
            },
        ]
        requests.forEach((request, index) => {
            assertEquals(ClassroomAndTurn.of(request), expected[index]);
        });
    },
})

Deno.test({
    name: "Cuando se envía aula vacía debe devolver el aula vacía y turno vacío",
    fn(): void {
        const requests = [
            "",
            " ",
            "  ",
        ];

        const expected: Field<ClassroomAndTurn>[] = [
            ClassroomAndTurn.empty(),
            ClassroomAndTurn.empty(),
            ClassroomAndTurn.empty(),
        ]
        // iterate over requests
        requests.forEach((request, index) => {
            assertEquals(ClassroomAndTurn.of(request), expected[index]);
        });
    },
})


Deno.test({
    name: "Dada una aula numérica sin turno debe devolver el aula y turno vacío",
    fn(): void {
        const requests = [
            "102",
            "309",
            "405",
        ];
        const expected: Field<ClassroomAndTurn>[] = [
            {
                ok: true,
                value: {
                    classroom: "102",
                    turn: undefined,
                },
            },
            {
                ok: true,
                value: {
                    classroom: "309",
                    turn: undefined,
                },
            },
            {
                ok: true,
                value: {
                    classroom: "405",
                    turn: undefined,
                },
            },
        ];

        requests.forEach((request, index) => {
            assertEquals(ClassroomAndTurn.of(request), expected[index]);
        });
    },
})

Deno.test({
    name: "Dada una aula alfanumérica sin turno debe devolver el aula y turno vacío",
    fn(): void {
        const requests = [
            "400 D",
            "100 A",
            "200 B",
        ];
        const expected: Field<ClassroomAndTurn>[] = [
            {
                ok: true,
                value: {
                    classroom: "400 D",
                    turn: undefined,
                },
            },
            {
                ok: true,
                value: {
                    classroom: "100 A",
                    turn: undefined,
                },
            },
            {
                ok: true,
                value: {
                    classroom: "200 B",
                    turn: undefined,
                },
            },
        ];

        requests.forEach((request, index) => {
            assertEquals(ClassroomAndTurn.of(request), expected[index]);
        });
    },
})


Deno.test({
    name: "Dada una aula numérica con turno debe devolver el aula y turno",
    fn(): void {
        const requests = [
            "102-M",
            "309-T",
            "405-N",
        ];
        const expected: Field<ClassroomAndTurn>[] = [
            {
                ok: true,
                value: {
                    classroom: "102",
                    turn: "M",
                },
            },
            {
                ok: true,
                value: {
                    classroom: "309",
                    turn: "T",
                },
            },
            {
                ok: true,
                value: {
                    classroom: "405",
                    turn: "N",
                },
            },
        ];
        requests.forEach((request, index) => {
            assertEquals(ClassroomAndTurn.of(request), expected[index]);
        });
    },
})

Deno.test({
    name: "Dada una aula alfanumérica con turno debe devolver el aula y turno",
    fn(): void {
        const requests = [
            "400 D-M",
            "100 A-T",
            "200 B-N",
            "Lab-A-M",
            "Lab-B-T",
            "Lab-C-N",
        ];
        const expected: Field<ClassroomAndTurn>[] = [
            {
                ok: true,
                value: {
                    classroom: "400 D",
                    turn: "M",
                },
            },
            {
                ok: true,
                value: {
                    classroom: "100 A",
                    turn: "T",
                },
            },
            {
                ok: true,
                value: {
                    classroom: "200 B",
                    turn: "N",
                },
            },
            {
                ok: true,
                value: {
                    classroom: "Lab-A",
                    turn: "M",
                },
            },
            {
                ok: true,
                value: {
                    classroom: "Lab-B",
                    turn: "T",
                },
            },
            {
                ok: true,
                value: {
                    classroom: "Lab-C",
                    turn: "N",
                },
            },
        ];
        requests.forEach((request, index) => {
            assertEquals(ClassroomAndTurn.of(request), expected[index]);
        });
    },
})