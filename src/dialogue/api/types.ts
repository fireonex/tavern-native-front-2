export type DialogueRequest = {
    userId: string;
    characterId: string;
    action: string | null;
}

export type DialogueResponse = {
    message: string;
    options: { action: string; label: string }[];
}