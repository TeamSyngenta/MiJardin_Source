using WebAppMiJardin.Entidades;
using System.Collections.Generic;

namespace WebAppMiJardin.DTO
{
    public class UsuarioDTO
    {
        public List<Usuario> ListaUsuarios { get; set; }
        public Usuario NuevoUsuario { get; set; }
        public List<RolUsuario> ListaRoles { get; set; }
        public int IdUsuario { get; set; }
        public bool Estado { get; set; }
    }
}
