export interface CastOrCrew {
    id: number;
    name: string;
    profile_path: string;
    popularity: number;
    character: string;
}

interface Credits {
    cast: CastOrCrew[];
    id: number;
    crew: CastOrCrew[];
}

export default Credits;
