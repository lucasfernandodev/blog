// Converte imagem to low quality
export function cloudinaryImages(url: string): string{
  const cloudName = 'https://res.cloudinary.com/lucasfernandodev/image/upload';
  const folderpath = 'blog/thumbnails';
  const transformation = 'c_scale,q_50,w_550';
  const typefile = 'f_webp';

  const urlFields = url.split('/');
  const filename = urlFields[urlFields.length - 1];

  const image = `${cloudName}/${transformation}/${typefile}/${folderpath}/${filename}`;
  return image;
};