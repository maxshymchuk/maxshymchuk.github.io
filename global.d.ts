type Nullable<T> = T | null;

type ValueOf<T> = T[keyof T];

type Meta = {
    timestamp: number;
    expired: number;
    snapshot: string;
};

type MappedRepo = {
    name: string;
    description: string;
    stars: number;
    site: Nullable<string>;
    release: Nullable<string>;
    page: string;
    topics: Array<string>;
    archived: boolean;
};

type MappedUser = {
    login: string;
    name: Nullable<string>;
    bio: Nullable<string>;
};

type Contact = {
    title: string;
    url: string;
    prettyUrl?: string;
    logo?: string;
};

type SkillsGroup = {
    title: string;
    list: Array<string>;
};

type Experience = {
    company: string;
    interval: string;
    achievements: Array<string>;
    techstack: Array<string>;
};

type StaticData = {
    about: Array<string>;
    contacts: Array<Contact>;
    skills: Array<SkillsGroup>;
    experiences: Array<Experience>;
};

type UserData = StaticData & {
    user: MappedUser;
    repositories: Array<MappedRepo>;
};

type Data = {
    meta: Meta;
    payload: UserData;
};
