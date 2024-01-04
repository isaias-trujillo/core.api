type RestructuredRequest = {
    semester: string, // cod_semestre
    section: number, // cod_seccion
    group: {
        classroom: string | undefined, // aula_turno (solo el aula)
        turn: string | undefined, // aula_turno (solo el turno)
        autofinanciad: boolean, // autofinanciado
        subject: string, // des_asignatura
        teacher: {
            'first name': string, // nom_docente
            'last name': string, // ape_paterno
            'second last name': string, // ape_materno
            dni: string, // dni
        }
    },
    course: {
        code: string, // cod_asignatura
        facultyId: number, // cod_facultad
        schoolId: number, // cod_escuela
        plan: number, // cod_plan
        cycle: number, // num_ciclo_ano_asignatura
        credits: number, // num_creditaje
        subject: string, // des_asignatura
    }
}

export default RestructuredRequest