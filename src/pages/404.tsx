import { siteDescription, sitePreview } from '../../site.config';
import Layout from '@/Organisms/Layout';
import { getPageName } from '../components/Utils/getPageName';

import { TemplateCustom404 } from '@/Templates/Custom404';

const Custom404 = () => {
  return (
    <Layout
      head={{
        title: getPageName('Pagina não encontrada'),
        image: sitePreview,
        description: siteDescription,
      }}
    >
      <TemplateCustom404 />
    </Layout>
  );
};

export default Custom404;
