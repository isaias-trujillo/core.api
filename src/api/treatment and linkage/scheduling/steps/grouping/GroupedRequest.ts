export default interface GroupedRequest {
    semester: string, // cod_semestre
    group: {
        classroom: string | undefined, // aula_turno (solo el aula)
        turn: string | undefined, // aula_turno (solo el turno)
        'self-financed': boolean, // autofinanciado
        subject: string, // des_asignatura
        teacher: {
            'first name': string, // nom_docente
            'last name': string, // ape_paterno
            'second last name': string, // ape_materno
            dni: string, // dni
        },
        sections: {
            number: number, // cod_seccion
            course: {
                code: string, // cod_asignatura
                facultyId: number, // cod_facultad
                schoolId: number, // cod_escuela
                plan: number, // cod_plan
                cycle: number, // num_ciclo_ano_asignatura
                credits: number, // num_creditaje
                subject: string, // des_asignatura
            },
        }[]
    }
}