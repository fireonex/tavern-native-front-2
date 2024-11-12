import {Gender, SocialClasses, Traits} from "../../common/types";

export type CreateCharacterRequest = {
    name: string;
    age: number;
    gender: Gender
    traits: Traits[];
    socialClass: SocialClasses
    backstory?: string;
};

export type CreateCharacterResponse = {
    characterId: string;
    message: string;
};
