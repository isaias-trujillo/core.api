import UncleanedRequest from "../cleaning/UncleanedRequest.ts";
import SanitizedRequest from "./SanitizedRequest.ts";

type Result = { sanitized: SanitizedRequest[]; nonSanitized: UncleanedRequest[]; }

/**
 * @description Sanitizes the request, transforming all the fields to the correct type
 * @param {UncleanedRequest[]} requests the unfixed requests
 * @return {{sanitized: SanitizedRequest[]; nonSanitized: UncleanedRequest[]}} the sanitized requests
 */
const sanitize = (requests: UncleanedRequest[]) : Result => {
    // at this point, we know that all the fields are present, except for optional fields
    // So we can safely transform each field to the correct type using parsing
    return requests.reduce((acc, request) => {
        try {

            const sanitizedRequest = {
                'cod_asignatura': request['cod_asignatura'],
                'cod_seccion': parseInt(request['cod_seccion']),
                'cod_facultad': parseInt(request['cod_facultad']),
                'cod_escuela': parseInt(request['cod_escuela']),
                'cod_plan': parseInt(request['cod_plan']),
                'cod_semestre': request['cod_semestre'],
                'autofinanciado': Boolean(parseInt(request['autofinanciado'])),
                'aula_turno': request['aula_turno']?.length > 0 ? request['aula_turno'] : undefined,
                'num_ciclo_ano_asignatura': parseInt(request['num_ciclo_ano_asignatura']),
                'num_creditaje': parseInt(request['num_creditaje']),
                'des_asignatura': request['des_asignatura'],
                'ape_paterno': request['ape_paterno'],
                'ape_materno': request['ape_materno'],
                'nom_docente': request['nom_docente'],
                'dni': request['dni'],
            } as SanitizedRequest
            acc.sanitized.push(sanitizedRequest)
            return acc
        } catch (_error) {
            acc.nonSanitized.push(request)
            console.log({error: _error})
            return acc
        }
    }, {sanitized: [], nonSanitized: []} as Result)
}

export default sanitize