import nlp from 'compromise';
import { Plugin } from 'compromise/types/misc';

const customPeoplePlugin: Plugin = {
    tags: {
        Soccer: {
            isA: 'Topic'
        },
        Sports: {
            isA: 'Topic'
        },
    },
    words: {
        // Words
        'Kylian Mbappe': 'Person',
        'Real Madrid': 'Organization',
        'Borussia Dortmund': 'Organization',
        'soccer': 'Soccer',
        'football': 'Soccer',
    }
};

nlp.plugin(customPeoplePlugin);

export const parseText = (text: string) => {
    if (!text) return null;
    const doc = nlp(text.toLocaleLowerCase());

    const terms = doc
        .terms()
        .out('array')
        .filter((term: any) => term.length > 1);

    const r = {
        organizations: doc.match('#Organization').out('array'),
        persons: doc.match('#Person').out('array'),
        dates: doc.match('#Date').out('array'),
        cities: doc.match('#Place').out('array'),
        countries: doc.match('#Country').out('array'),
        topics: doc.topics().out('array'),
        custom: doc.match('#Topic+').out('array'),
    }
    return r;
};