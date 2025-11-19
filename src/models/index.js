// Export centralizado de todos los modelos (útil para importaciones únicas)
export { UsuarioModel } from "./usuario.model.js";
export { CargoPolicialModel } from "./cargoPolicial.model.js";
export { CategoriaLicenciaModel } from "./categoriaLicencia.model.js";
export { InfraccionModel } from "./infraccion.model.js";
export { SecretariaTransitoModel } from "./secretariaTransito.model.js";
export { MunicipioModel } from "./municipio.model.js";
export { AutomotorModel } from "./automotor.model.js";
export { LicenciaConduccionModel } from "./licenciaConduccion.model.js";
export { PoliciaTransitoModel } from "./policiaTransito.model.js";
export { PersonaModel } from "./persona.model.js";
export { LicenciaCategoriaModel } from "./licenciaCategoria.model.js";
export { PropiedadAutomotorModel } from "./propiedadAutomotor.model.js";
export { ComparendoModel } from "./comparendo.model.js";
export { ComparendoInfraccionModel } from "./comparendoInfraccion.model.js";
export { Queja } from "./queja.model.js";

// Export por defecto como objeto único
import { UsuarioModel } from "./usuario.model.js";
import { CargoPolicialModel } from "./cargoPolicial.model.js";
import { CategoriaLicenciaModel } from "./categoriaLicencia.model.js";
import { InfraccionModel } from "./infraccion.model.js";
import { SecretariaTransitoModel } from "./secretariaTransito.model.js";
import { MunicipioModel } from "./municipio.model.js";
import { AutomotorModel } from "./automotor.model.js";
import { LicenciaConduccionModel } from "./licenciaConduccion.model.js";
import { PoliciaTransitoModel } from "./policiaTransito.model.js";
import { PersonaModel } from "./persona.model.js";
import { LicenciaCategoriaModel } from "./licenciaCategoria.model.js";
import { PropiedadAutomotorModel } from "./propiedadAutomotor.model.js";
import { ComparendoModel } from "./comparendo.model.js";
import { ComparendoInfraccionModel } from "./comparendoInfraccion.model.js";
import { Queja } from "./queja.model.js";

const models = {
  UsuarioModel,
  CargoPolicialModel,
  CategoriaLicenciaModel,
  InfraccionModel,
  SecretariaTransitoModel,
  MunicipioModel,
  AutomotorModel,
  LicenciaConduccionModel,
  PoliciaTransitoModel,
  PersonaModel,
  LicenciaCategoriaModel,
  PropiedadAutomotorModel,
  ComparendoModel,
  ComparendoInfraccionModel,
  Queja,
};

export default models;
