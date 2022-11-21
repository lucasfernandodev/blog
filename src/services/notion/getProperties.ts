import { database, notion } from '../../../config/clientNotion';
import Slugify from '../../lib/slugfy';
import { res } from './util';

export async function getProperties(Name: string) {
  const retrieveDatabase = await notion.databases.retrieve({
    database_id: database,
  });

  const response = retrieveDatabase.properties[Name];

  if (typeof response.type === 'undefined' || response.type === null) {
    res.error = {
      message: 'Propriedade não encontrada',
    };
    return res;
  }

  if (response.type === 'multi_select') {
    res.results = response.multi_select.options.map((value: any) => {
      return {
        name: value.name,
        slug: Slugify(value.name),
        color: value.color,
      };
    });

    return res;
  } else {
    res.results = response;
    return res;
  }
}
