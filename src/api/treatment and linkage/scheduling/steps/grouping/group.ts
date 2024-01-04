import RestructuredRequest from "../restructuring/restructuredRequest.ts";
import GroupedRequest from "./GroupedRequest.ts";

const group = (requests: RestructuredRequest[]) => {
    return requests.reduce((acc, request) => {
        // a group is defined by the following attributes: classroom, turn, autofinanciad, subject, teacher
        const index = acc.findIndex((grouped) => {
            return grouped.group.classroom === request.group.classroom
                && grouped.group.turn === request.group.turn
                && grouped.group.autofinanciad === request.group.autofinanciad
                && grouped.group.subject === request.group.subject
                && grouped.group.teacher.dni === request.group.teacher.dni
        });
        // if the group doesn't exist, create it
        if (index === -1) {
            // add the group to the list of groups
            acc.push({
                semester: request.semester,
                group: {
                    classroom: request.group.classroom,
                    turn: request.group.turn,
                    autofinanciad: request.group.autofinanciad,
                    subject: request.group.subject,
                    teacher: request.group.teacher,
                    sections: [
                        {
                            number: request.section,
                            course: request.course,
                        }
                    ]
                }
            })
            // if the group already exists, add the section to the group
        } else {
            // add the section to the group
            acc[index].group.sections.push({
                number: request.section,
                course: request.course,
            })
        }
        return acc;
    }, [] as GroupedRequest[]);
}

export default group;