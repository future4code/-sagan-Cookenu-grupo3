import * as jwt from "jsonwebtoken";

export class Authenticator {
  private static EXPIRES_IN = process.env.TOKEN_EXPIRATION;

  public generateToken(input: AuthenticationData): string {
    const token = jwt.sign(
      {
        id: input.id,
        role: input.role,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn: Authenticator.EXPIRES_IN,
      }
    );
    return token;
  }

  public getData(token: string): AuthenticationData {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = {
      id: payload.id,
      role: payload.role
    };
    return result;
  }
  
  public verify(token: string): AuthenticationData {
        const data = jwt.verify(token, process.env.JWT_KEY as string) as any;
        return {
            id: data.id,
            role: data.role
        }
    }

}

interface AuthenticationData {
  id: string;
  role: string;
}