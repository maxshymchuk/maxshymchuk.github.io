type Primitive = string | number | boolean | null | undefined;
type Nullable<T> = T | null;
type ValueOf<T> = T[keyof T];

type MappedRepo = {
    name: string;
    description: Nullable<string>;
    stars: number;
    site: Nullable<string>;
    release: Nullable<string>;
    page: string;
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
    user: MappedUser;
    projects: Array<MappedRepo>;
    about: Array<string>;
    contacts: Array<Contact>;
    skills: Array<SkillsGroup>;
    experiences: Array<Experience>;
};

type DynamicData = {
    user: MappedUser;
    projects: Array<MappedRepo>;
};

type CacheData = {
    version: string;
    ttl: number;
    data: DynamicData;
};

type Telemetry = {
    timestamp: number;
    ip: string | undefined;
    place: string | undefined;
};
