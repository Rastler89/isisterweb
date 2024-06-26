export interface Pet {
    name: string;
    gender: string;
    birth: string;
    race: string;
    breed: string;
    code: string;
    imageUrl?: string;
}

export interface responsePet {
    count: number;
    data: Pet[]
}