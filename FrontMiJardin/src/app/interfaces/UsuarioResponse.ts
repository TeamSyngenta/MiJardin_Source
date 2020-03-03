import { RolResponse } from './RolResponse';

export class UsuarioResponse {
    idUsuario: number;
    userName: string;
    estado: boolean;
    password: string;
    fechaCreacion: string;
    descripcion: string;
    listaRoles: Array<RolResponse>;
    lstRolesString: Array<string>;
    mensaje: string;
    roles: string;
    nombre: string;
    apellido: string;
    correo: string;
    contrasena: string;
    contrasena2: string;
}
