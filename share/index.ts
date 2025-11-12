import contacts from './static-data/contacts.json';
import contactsCIS from './static-data/contacts-cis.json';
import about from './static-data/about.json';
import aboutCIS from './static-data/about-cis.json';
import skills from './static-data/skills.json';
import experiences from './static-data/experiences.json';

function isCISCountry(country?: string | null) {
    if (!country) return false;
    return ['AM', 'AZ', 'BY', 'KZ', 'KG', 'MD', 'RU', 'TJ', 'UZ'].includes(country);
}

function getStaticDataByCountry(country?: string | null): StaticData {
    return isCISCountry(country)
        ? { about: aboutCIS, contacts: contactsCIS, skills, experiences }
        : { about, contacts, skills, experiences };
}

export { isCISCountry, getStaticDataByCountry };
