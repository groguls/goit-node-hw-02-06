const Jimp = require("jimp");

const resizeAvatar = async (pathToAvatar) => {
  const avatar = await Jimp.read(pathToAvatar);
  await avatar.resize(250, Jimp.AUTO);
  await avatar.writeAsync(pathToAvatar);
  return null;
};

module.exports = resizeAvatar;
