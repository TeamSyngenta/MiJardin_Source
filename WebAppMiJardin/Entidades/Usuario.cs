

using System.Collections.Generic;

namespace WebAppMiJardin.Entidades
{
    public class Usuario
    {
        public int idUsuario { get; set; }
        public string userName { get; set; }
        public string correo { get; set; }
        public string roles { get; set; }
        public string fechaCreacion { get; set; }
        public bool estado { get; set; }
        public string nombre { get; set; }
        public string apellido { get; set; }
        public List<RolUsuario> listaRoles { get; set; }


    }
}
