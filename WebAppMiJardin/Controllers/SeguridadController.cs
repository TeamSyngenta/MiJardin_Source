using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebAppMiJardin.Entidades;
using WebAppMiJardin.DAO;
using WebAppMiJardin.DTO;

namespace WebAppMiJardin.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SeguridadController : ControllerBase
    {
        
        private readonly SeguridadDAO seguridadDAO = new SeguridadDAO();

        public SeguridadController(ILogger<SeguridadController> logger)
        {
            
        }

        [HttpPost("[action]")]
        public Usuario ValidarIngresoUsuario([FromBody()] ValidarUsuarioDTO usuario)
        {

            var request = new DTO.ValidarUsuarioDTO();
            request.userName = usuario.userName;
            request.password = usuario.password;
            try
            {
                request = seguridadDAO.ValidarUsuario(request);

            }catch(Exception e)
            {

            }
            return request.usuario;
        }


        [HttpGet("[action]")]
        public List<Tipo> ObtenerRoles()
        {
            var response = new RolDTO();
            try
            {
               
                response = seguridadDAO.ObtenerRoles();
                return response.ListaRoles;
            }
            catch (Exception e)
            {
                
            }
            return response.ListaRoles;

        }

        [HttpGet("[action]")]
        public List<Usuario> ObtenerUsuarios(string idUsuario)
        {
            var response = new UsuarioDTO();
            try
            {

                response = seguridadDAO.ConsultarUsuarios(idUsuario);
                return response.ListaUsuarios;
            }
            catch (Exception e)
            {

            }
            return response.ListaUsuarios;

        }

        [HttpPost("[action]")]
        public bool CrearUsuario([FromBody()] Usuario nuevoUsuario)
        {

            var request = new UsuarioDTO();
            request.NuevoUsuario = nuevoUsuario;
            request.ListaRoles = new List<RolUsuario>();
            request.ListaRoles = nuevoUsuario.listaRoles;

            try
            {
               
                var respuesta = seguridadDAO.CrearUsuario(request);
                return respuesta;
            }
            catch (Exception e)
            {
                System.Console.WriteLine(e.Message);
            }
            return false;
        }

        [HttpGet("[action]")]
        public bool ActualizarEstadoUsuario(int idUsuario, bool estado)
        {
            var request = new UsuarioDTO();
            request.IdUsuario = idUsuario;
            request.Estado = estado;

            try
            {
                
                var response = seguridadDAO.ActualizarEstadoUsuario(request);
                return response;
            }
            catch (Exception e)
            {
                
            }
            return false;

        }


        

    }
}
