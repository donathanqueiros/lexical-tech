const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;
const MIME_TYPE = "image/jpeg";
const QUALITY = 0.8;

const compressImage = (file: File) => {
  console.log(file);
  return new Promise((resolve, reject) => {
    const blobURL = URL.createObjectURL(file);
    const img = new Image();
    img.src = blobURL;
    img.onerror = function () {
      URL.revokeObjectURL(this.src);
      console.log("Cannot load image");
      reject();
    };

    img.onload = function () {
      console.log(this);
      //@ts-ignore
      URL.revokeObjectURL(this.src);
      const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
      console.log(newWidth, newHeight);
      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext("2d");
      ctx!.drawImage(img, 0, 0, newWidth, newHeight);
      canvas.toBlob(
        (blob) => {
          // Handle the compressed image. es. upload or save in local state
          resolve(blob);
        },
        MIME_TYPE,
        QUALITY
      );
      //   document.getElementById("root").append(canvas);
    };
  });
};

function calculateSize(
  img: HTMLImageElement,
  maxWidth: number,
  maxHeight: number
) {
  let width = img.width;
  let height = img.height;

  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height);
      height = maxHeight;
    }
  }
  return [width, height];
}

export default compressImage;
