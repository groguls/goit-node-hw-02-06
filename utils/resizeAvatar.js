const Jimp = require("jimp");

const resizeAvatar = async (pathToAvatar) => {
  const avatar = await Jimp.read(pathToAvatar);
  await avatar.contain(
    250,
    250,
    Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
  );
  await avatar.writeAsync(pathToAvatar);
  return null;
};

module.exports = resizeAvatar;
