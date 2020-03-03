using WebAppMiJardin.Entidades;
using System.Collections.Generic;

namespace WebAppMiJardin.DTO
{
    public class ValidarUsuarioDTO
    {
        public string userName { get; set; }
        public string password { get; set; }
        public Usuario usuario { get; set; }
    }
}
