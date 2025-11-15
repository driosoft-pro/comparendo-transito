import bcrypt from 'bcryptjs';

/**
 * Genera hash bcrypt de una contraseña
 * @param {string} plainPassword - Contraseña en texto plano
 * @returns {string} Hash bcrypt
 */
export const hashPassword = (plainPassword) => {
  if (!plainPassword) {
    throw new Error('La contraseña no puede estar vacía');
  }
  
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(plainPassword, salt);
  
  console.log('Hash generado:', hash);
  return hash;
};

/**
 * Verifica si una contraseña coincide con un hash bcrypt
 * @param {string} plainPassword - Contraseña en texto plano
 * @param {string} storedHash - Hash almacenado en BD
 * @returns {boolean} True si coinciden
 */
export const verifyPassword = (plainPassword, storedHash) => {
  if (!plainPassword || !storedHash) {
    console.log('Password o hash vacío');
    return false;
  }

  // Verificar que el hash tenga formato bcrypt válido
  if (!storedHash.startsWith('$2a$') && !storedHash.startsWith('$2b$') && !storedHash.startsWith('$2y$')) {
    console.log('Hash no es formato bcrypt válido:', storedHash.substring(0, 20));
    return false;
  }

  try {
    const isValid = bcrypt.compareSync(plainPassword, storedHash);
    console.log('Verificación:', isValid ? 'Correcta' : 'Incorrecta');
    return isValid;
  } catch (error) {
    console.error('Error al verificar password:', error.message);
    return false;
  }
};
