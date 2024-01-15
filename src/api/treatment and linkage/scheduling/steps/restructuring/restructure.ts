import SanitizedRequest from "../sanitizing/SanitizedRequest.ts";
import RestructuredRequest from "./restructuredRequest.ts";

// document this
/**
 * @description Restructures the requests, grouping them by group
 * @param {SanitizedRequest[]} requests the sanitized requests
 * @return {RestructuredRequest[]} the restructured requests
 */
const restructure = (requests: SanitizedRequest[]): RestructuredRequest[] => {
    return requests.map((request) => {
        return {
            semester: request['cod_semestre'],
            section: request['cod_seccion'],
            group: {
                classroom: request['aula_turno']?.split('-')[0],
                turn: request['aula_turno']?.split('-')[1],
                'self-financed': request['autofinanciado'],
                subject: request['des_asignatura'],
                teacher: {
                    'first name': request['nom_docente'],
                    'last name': request['ape_paterno'],
                    'second last name': request['ape_materno'],
                    dni: request['dni'],
                }
            },
            course: {
                code: request['cod_asignatura'],
                facultyId: request['cod_facultad'],
                schoolId: request['cod_escuela'],
                plan: request['cod_plan'],
                cycle: request['num_ciclo_ano_asignatura'],
                credits: request['num_creditaje'],
                subject: request['des_asignatura'],
            }
        }
    })
}

export default restructure