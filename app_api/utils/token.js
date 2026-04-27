const crypto = require('crypto');

const SECRET = process.env.JWT_SECRET || 'travlr-secure-development-secret';
const DEFAULT_EXPIRY_SECONDS = 2 * 60 * 60;

const encode = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
const decode = (b64) => JSON.parse(Buffer.from(b64, 'base64url').toString('utf8'));

const signPart = (payload) => crypto.createHmac('sha256', SECRET).update(payload).digest('base64url');

const createToken = (claims, expiresInSeconds = DEFAULT_EXPIRY_SECONDS) => {
  const header = encode({ alg: 'HS256', typ: 'JWT' });
  const payload = encode({ ...claims, exp: Math.floor(Date.now() / 1000) + expiresInSeconds });
  const signature = signPart(`${header}.${payload}`);
  return `${header}.${payload}.${signature}`;
};

const verifyToken = (token) => {
  const [header, payload, signature] = token.split('.');
  if (!header || !payload || !signature) {
    throw new Error('Malformed token');
  }

  const expectedSignature = signPart(`${header}.${payload}`);
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    throw new Error('Invalid signature');
  }

  const data = decode(payload);
  if (!data.exp || data.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('Token expired');
  }

  return data;
};

module.exports = {
  createToken,
  verifyToken,
};
