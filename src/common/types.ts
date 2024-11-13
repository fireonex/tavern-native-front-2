export type User = {
    userId: string;
    username: string;
    email: string;
};

export type Character = {
    _id: string;
    userId: string;
    name: string;
    age: number;
    gender: Gender;
    traits: Traits[];
    race: Race;
    socialClass: SocialClasses;
    backstory?: string;
};

export type Gender = 'Male' | 'Female' | 'Other';

export type Race = 'Human' | 'High Elf' | 'Wood Elf' | 'Dwarf' | 'Orc';

export type Traits = 'Brave'
    | 'Honest'
    | 'Kind'
    | 'Loyal'
    | 'Wise'
    | 'Charismatic'
    | 'Resilient'
    | 'Generous'
    | 'Courageous'
    | 'Compassionate'
    | 'Curious'
    | 'Independent'
    | 'Ambitious'
    | 'Reserved'
    | 'Adventurous'
    | 'Cautious'
    | 'Observant'
    | 'Determined'
    | 'Diplomatic'
    | 'Pragmatic'
    | 'Arrogant'
    | 'Selfish'
    | 'Greedy'
    | 'Impulsive'
    | 'Stubborn'
    | 'Jealous'
    | 'Vindictive'
    | 'Cowardly'
    | 'Deceitful'
    | 'Lazy'

export type SocialClasses = | 'Peasant'
    | 'Warrior'
    | 'Healer'
    | 'Merchant'
    | 'Guard'
    | 'Archer'
    | 'Mage'
    | 'Noble'
    | 'Lord'
    | 'Thief';