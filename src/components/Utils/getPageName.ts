import { siteName } from '../../../site.config';

export const getPageName = (pagename: string) => {
  return `${pagename} - ${siteName}`;
};