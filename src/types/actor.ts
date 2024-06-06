export interface CastOrCrew {
    id: number;
    name: string;
    profile_path: string;
    popularity: number;
}

interface Actor {
    cast: CastOrCrew[];
    id: number;
    crew: CastOrCrew[];
}

export default Actor;
