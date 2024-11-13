import {Gender, Race, SocialClasses, Traits} from "../../common/types";

export type CreateCharacterRequest = {
    name: string;
    age: number;
    gender: Gender
    traits: Traits[];
    race: Race;
    socialClass: SocialClasses
    backstory?: string;
};

export type CreateCharacterResponse = {
    characterId: string;
    message: string;
};
