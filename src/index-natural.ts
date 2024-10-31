import { parseText } from './helpers/nlp-natural';
import { searchPhotos } from './services/arc/photo-api';

const formatPhoto = (p: any) => {
    return {
        ...{
            caption: p.caption,
            subtitle: p.subtitle,
            url: p.url,
            created_date: p.created_date,
            last_updated_date: p.last_updated_date,
            slug: p.slug
        }, ...parseText(p.caption)
    }
}
const main = async () => {
    const photos = await searchPhotos(
        {
            startDateUpdated: '2024-10-30',
            caption: 'soccer|futbol',
            published: true,
            operator: 'or',
            sort: '-created_date',
            limit: 100
        }
    ).catch(err => {
        console.error(err);
        throw err;
    });
    const filteredPhotos = photos
        .map(p => formatPhoto(p))
        .filter(tokenizedPhotos =>
            ['soccer', 'carabao', 'game'].every(keyword => (tokenizedPhotos.tokens || []).includes(keyword))
        );
    console.log(filteredPhotos);
    console.log(filteredPhotos.length);
    const photo = filteredPhotos[0];
    console.log(photo);
}

main();
