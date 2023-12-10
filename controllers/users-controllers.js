const {
  registerUserService,
  loginUserService,
  logoutUserService,
  subscriptionUserService,
  updateAvatarUserService,
  verifyMailUserService,
  reSendMailUserService,
} = require("../servises");
const { decorateConrtoller } = require("../utils");

const register = decorateConrtoller(async (req, res) => {
  const { email, subscription } = await registerUserService(req.body);

  res.status(201).json({
    user: {
      email,
      subscription,
    },
  });
});

const login = decorateConrtoller(async (req, res) => {
  const { token, email, subscription } = await loginUserService(req.body);

  res.json({
    token,
    user: { email, subscription },
  });
});

const logout = decorateConrtoller(async (req, res) => {
  await logoutUserService(req.user._id);

  res.sendStatus(204);
});

const current = decorateConrtoller((req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
});

const subscription = decorateConrtoller(async (req, res) => {
  const { email, subscription } = await subscriptionUserService(
    req.user._id,
    req.body
  );

  res.json({
    email,
    subscription,
  });
});

const avatar = decorateConrtoller(async (req, res) => {
  const { avatarURL } = await updateAvatarUserService(req.user._id, req.file);

  res.json({ avatarURL });
});

const verifyMail = decorateConrtoller(async (req, res) => {
  await verifyMailUserService(req.params.verificationToken);

  res.json({ message: "Verification successful" });
});

const reSendVerificationMail = decorateConrtoller(async (req, res) => {
  await reSendMailUserService(req.body.email);

  res.json({ message: "Verification email sent" });
});

module.exports = {
  register,
  login,
  logout,
  current,
  subscription,
  avatar,
  verifyMail,
  reSendVerificationMail,
};
