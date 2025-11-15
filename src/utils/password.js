import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';

// Hash por defecto: bcrypt (para nuevos usuarios)
export const hashPassword = (plainPassword) => {
  // cost 10 está bien para desarrollo
  return bcrypt.hashSync(plainPassword, 10);
};

// Verifica tanto bcrypt como el esquema antiguo sha256$...
export const verifyPassword = (plainPassword, storedHash) => {
  if (!storedHash) return false;

  // Soporte legado: hashes tipo sha256$<salt_hex>$<digest_hex>
  if (storedHash.startsWith('sha256$')) {
    const parts = storedHash.split('$');
    if (parts.length !== 3) return false;

    const [, saltHex, digestHex] = parts;

    const salt = Buffer.from(saltHex, 'hex');
    const hash = crypto
      .createHash('sha256')
      .update(Buffer.concat([salt, Buffer.from(plainPassword)]))
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(hash, 'hex'),
      Buffer.from(digestHex, 'hex'),
    );
  }

  // bcrypt: $2a$, $2b$, $2y$ ...
  if (
    storedHash.startsWith('$2a$') ||
    storedHash.startsWith('$2b$') ||
    storedHash.startsWith('$2y$')
  ) {
    try {
      return bcrypt.compareSync(plainPassword, storedHash);
    } catch {
      return false;
    }
  }

  // 3) Formato desconocido
  return false;
};
