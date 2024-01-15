type Group = {
    classroom?: string;
    turn?: string;
    subject: string;
    'self-financed': boolean;
    teacher: {
        'first name': string;
        'last name': string;
        'second last name': string;
        dni: string;
    };
}

export default Group;