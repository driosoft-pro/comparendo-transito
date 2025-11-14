import crypto from 'node:crypto';

// Genera hash tipo: sha256$<salt_hex>$<digest_hex>
export const hashPassword = (plainPassword) => {
  const salt = crypto.randomBytes(16);
  const digest = crypto
    .createHash('sha256')
    .update(Buffer.concat([salt, Buffer.from(plainPassword)]))
    .digest('hex');

  return `sha256$${salt.toString('hex')}$${digest}`;
};

// Verifica hash tipo: sha256$<salt_hex>$<digest_hex>
export const verifyPassword = (plainPassword, storedHash) => {
  if (!storedHash || !storedHash.startsWith('sha256$')) {
    return false;
  }

  const parts = storedHash.split('$');
  if (parts.length !== 3) return false;

  const [, saltHex, digestHex] = parts;

  const salt = Buffer.from(saltHex, 'hex');
  const hash = crypto
    .createHash('sha256')
    .update(Buffer.concat([salt, Buffer.from(plainPassword)]))
    .digest('hex');

  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(digestHex, 'hex'));
};
