// same as 'UnfilteredRequest' but with all fields has correct types
export default interface SanitizedRequest {
    'cod_asignatura': string,
    'cod_seccion': number,
    'cod_facultad': number,
    'cod_escuela': number,
    'cod_plan': number,
    'cod_semestre': string,
    'autofinanciado': boolean,
    'aula_turno': string | undefined,
    'num_ciclo_ano_asignatura': number,
    'num_creditaje': number,
    'des_asignatura': string,
    'ape_paterno': string,
    'ape_materno': string,
    'nom_docente': string,
    'dni': string,
}