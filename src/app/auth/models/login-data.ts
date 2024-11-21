export interface LoginData {
    usuario: string;
    contrasena: string;
    usuarioRegex: RegExp;
    errors: {
      usuario: boolean;
      contrasena: boolean;
    };
    loginFailed: boolean;
  }  