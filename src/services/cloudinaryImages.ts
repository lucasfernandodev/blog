// Converte imagem to low quality
export function cloudinaryImages(url: string): string {

  const urlFields = url.split('/');
  const urlSplit = url.split('.');

  const cloudName = 'https://res.cloudinary.com/lucasfernandodev/image/upload';
  const folderpath = 'blog/thumbnails';
  const transformation = 'c_scale,q_85,w_1024';
  const fileType = urlSplit[urlSplit.length - 1];

  const typefile = fileType === 'svg' ? 'f_svg' : 'f_webp';


  const filename = urlFields[urlFields.length - 1];

  const image = `${cloudName}/${transformation}/${typefile}/${folderpath}/${filename}`;
  return image;
};
