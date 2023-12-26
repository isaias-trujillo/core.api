import Property from "../shared/domain/Property.ts";
import Either, {left, right} from "../shared/domain/Either.ts";

export default class Course extends Property<string> {
    private static readonly UPPER_CASE_WORDS = [
        "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
        "NIC", "NIF"
    ];

    protected ensure(request: string): Either<Error, string> {
        const text = request.trim().replaceAll(/[\s\t\r\n]+/g, " ")
        if (text.length === 0) {
            return left(new Error("El nombre del curso no puede estar vacío."));
        }
        if (text.length < 3) {
            return left(new Error("El nombre del curso debe tener al menos 3 caracteres."));
        }
        if (text.length > 128) {
            return left(new Error("El nombre del curso no puede tener más de 128 caracteres."));
        }
        const pattern = /^[a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ\s,]+[a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ]*$/gi;
        if (!pattern.test(text)) {
            return left(new Error("El nombre del curso solo puede contener letras, números y espacios."));
        }
        const maxLengthWord = Course.UPPER_CASE_WORDS.reduce((max, word) => {
            return word.length > max ? word.length : max;
        }, (0))

        const capitalize = (word: string): string => word[0].toUpperCase() + word.slice(1).toLocaleLowerCase(["es-ES", "en-US"])

        return right(
            text.split(" ")
                .map(word => {
                    if (word.length > maxLengthWord) {
                        return capitalize(word);
                    }
                    if (Course.UPPER_CASE_WORDS.includes(word.toUpperCase())) {
                        return word.toUpperCase();
                    }
                    return word.toLocaleLowerCase(["es-ES", "en-US"])
                })
                .join(" ")
        );
    }
}