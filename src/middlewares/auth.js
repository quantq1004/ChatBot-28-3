const asyncMiddleware = require('./async');
const CustomError = require('../errors/CustomError');
const codes = require('../errors/code');
const authService = require('../services/user');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new CustomError(codes.UNAUTHORIZED);

  const [tokenType, accessToken] = authorization.split(' ');

  if (tokenType !== 'Bearer') throw new Error(codes.UNAUTHORIZED);

  const data = await authService.verifyAccessToken(accessToken);
  const { sub: userId, email, name } = data;
  req.user = { userId, email, name };
  req.userId = userId;
  if (['/users/logout', '/users/verify'].includes(req.path)) {
    req.accessToken = accessToken;
  }

  return next();
};

module.exports = {
  auth: asyncMiddleware(auth),
};
