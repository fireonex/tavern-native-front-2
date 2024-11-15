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

export type UpdateCharacterRequest = {
    name: string;
    age: number;
    gender: string;
    traits: string[];
    socialClass: string;
    race: string;
    backstory: string;
}

export type UpdateCharacterResponse = {
    _id: string;
    userId: string;
    name: string;
    age: number;
    gender: string;
    traits: string[];
    socialClass: string;
    race: string;
    backstory: string;
    createdAt: string;
    updatedAt: string;
}
