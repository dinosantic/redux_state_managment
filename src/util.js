//Media resize
export const smallImage = (imagePath, size) => {
  return imagePath.match(/media\/(screenshots || games)/)
    ? imagePath.replace("/media/", `/media/resize/${size}/-/`)
    : imagePath;
};
