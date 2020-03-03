using WebAppMiJardin.Constantes;
using WebAppMiJardin.DTO;
using WebAppMiJardin.Entidades;
using System.Data;
using System.Linq;
using System.Data.SqlClient;
using Dapper;

namespace WebAppMiJardin.DAO
{
    public class SeguridadDAO
    {


        public ValidarUsuarioDTO ValidarUsuario(ValidarUsuarioDTO request)
        {

            const string sqlSp = "ValidarIngresoUsuario";
            using (var conexionBd = new SqlConnection(ConstantesMiJardin._cadenaConexion))
            {   
                request.usuario = conexionBd.Query<Usuario>(sqlSp, new { request.userName, request.password }, commandType: CommandType.StoredProcedure).Single();
            }
            return request;
        }

        public RolDTO ObtenerRoles()
        {
            const string sqlSp = "ObtenerRoles";
            RolDTO response = new RolDTO();
            using (var conexionBd = new SqlConnection(ConstantesMiJardin._cadenaConexion))
            {
                conexionBd.Open();
                response.ListaRoles = conexionBd.Query<Tipo>(sqlSp, commandType: CommandType.StoredProcedure).ToList();
                return response;
            }
        }

        public UsuarioDTO ConsultarUsuarios(string idUsuario)
        {
            const string sqlSp = "ObtenerUsuarios";
            var response = new UsuarioDTO();
            using (var conexionBd = new SqlConnection(ConstantesMiJardin._cadenaConexion))
            {
                conexionBd.Open();
                response.ListaUsuarios = conexionBd.Query<Usuario>(sqlSp, new { idUsuario = idUsuario }, commandType: CommandType.StoredProcedure).ToList();
                return response;
            }
        }

        public bool CrearUsuario(UsuarioDTO request)
        {
            string sqlInsertUsuario = @"INSERT INTO Usuario (userName, correo,password, nombre, apellido ) 
                                Values (@userName, @correo, @password,  @nombre, @apellido);  SELECT CAST(SCOPE_IDENTITY() as int);";
            string sqlInsertRoles = @"INSERT INTO Usuario_Roles (idRol, idUsuario) 
                                Values (@idRol, @idUsuario)";
            using (var conexionBD = new SqlConnection(ConstantesMiJardin._cadenaConexion))
            {
                conexionBD.Open();
                int resultadoRol = 0;
                var idUsuarioN = conexionBD.Query<int>(sqlInsertUsuario, request.NuevoUsuario).Single();
                if (idUsuarioN > 0)
                {
                    foreach (RolUsuario rolN in request.ListaRoles)
                    {
                        rolN.IdUsuario = idUsuarioN;
                        resultadoRol = conexionBD.Execute(sqlInsertRoles, rolN);
                    }
                }
                return resultadoRol > 0;

            }
        }

        public bool ActualizarEstadoUsuario(UsuarioDTO request)
        {

            string sqlUpdateEstado = @"UPDATE Usuario set estado = @estado WHERE idUsuario = @idUsuario";
            using (var conexionBd = new SqlConnection(ConstantesMiJardin._cadenaConexion))
            {
                conexionBd.Open();
                var resultadoRol = conexionBd.Execute(sqlUpdateEstado, request);
                return resultadoRol > 0;
            }
        }

        public bool ActualizarRolesUsuario(UsuarioDTO request)
        {

            string sqlDeleteRoles = @"DELETE FROM  Usuario_Roles where idUsuario = @idUsuario";
            string sqlInsertRoles = @"INSERT INTO Usuario_Roles (idRol, idUsuario) Values (@idRol, @idUsuario)";
            using (var conexionBd = new SqlConnection(ConstantesMiJardin._cadenaConexion))
            {
                conexionBd.Open();
                var resultadoRoles = conexionBd.Execute(sqlDeleteRoles, request);

                if (resultadoRoles > 0)
                {
                    resultadoRoles = conexionBd.Execute(sqlInsertRoles, request.ListaRoles);
                }
                return resultadoRoles > 0;
            }
        }

        public bool CambiarPassword(UsuarioDTO request)
        {

            string sqlUpdateEstado = @"UPDATE Usuario set password = @password WHERE idUsuario = @idUsuario";
            using (var conexionBd = new SqlConnection(ConstantesMiJardin._cadenaConexion))
            {
                conexionBd.Open();
                var resultadoUpdate = conexionBd.Execute(sqlUpdateEstado, request);
                return resultadoUpdate > 0;
            }
        }



    }
}
