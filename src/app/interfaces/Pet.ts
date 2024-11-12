export interface Pet {
    name: string;
    gender: string;
    birth: string;
    race: string;
    breed: string;
    code: string;
    image?: string;
    description?: string;
    character?: string;
    age?:string;
    breed_en?:string;
    breed_es?:string;
    specie_id?:string;
    specie_en?:string;
    specie_es?:string;
    vaccines?: any;
    allergies?: any;
    scheduleWalks?: any;
    scheduleDiets?: any;
    vetvisits?: any;
    treatments?: any;
    surgeries?: any;
    medicaltests?: any;
    constants?: any;
    adoptive?: any;
    is_in_adoption: boolean;
}

export interface responsePet {
    count: number;
    data: Pet[]
}