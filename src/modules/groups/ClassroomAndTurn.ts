import Field from "../shared/domain/Field.ts";
import Turn from "./Turn.ts";

export class ClassroomAndTurn {
    // default empty value
    private static readonly CLASSROOM_PATTERN = /((\d{3}(\s[A-Z])?)|(Lab-[A-Z]))/.source;
    private static readonly TURN_PATTERN = /[MTN]/.source;
    private static readonly PATTERN = new RegExp(`^${ClassroomAndTurn.CLASSROOM_PATTERN}(-${ClassroomAndTurn.TURN_PATTERN})?$`, "gi");

    private constructor(public readonly classroom?: string, public readonly turn?: Turn) {
    }

    private static readonly EMPTY: Field<ClassroomAndTurn> = {
        ok: true,
        value: {
            classroom: undefined,
            turn: undefined,
        },
    };


    public static empty(): Field<ClassroomAndTurn> {
        return ClassroomAndTurn.EMPTY;
    }

    public static of(request: string): Field<ClassroomAndTurn> {
        // replace multiple spaces with one
        const text = request.replace(/\s+/g, " ").trim();
        // if empty return empty
        if (text.length === 0) {
            return ClassroomAndTurn.EMPTY;
        }
        const match = text.match(ClassroomAndTurn.PATTERN);
        if (!match) {
            return {
                ok: false,
                error: "Aula sin formato válido, por ejemplo: 102-M, Lab-A-T, 406 D, etc.",
            };
        }
        const matches = match[0].split("-");

        const classroom = matches.length === 3 ? `${matches[0]}-${matches[1]}` : matches[0];
        const turn: Turn = (matches.length === 3 ? matches[2] : matches[1]) as Turn;

        return {
            ok: true,
            value: {
                classroom,
                turn,
            },
        }
    }
}

export default ClassroomAndTurn