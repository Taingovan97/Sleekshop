export interface UserReadPort {
  getCredentialsByUsername(username: string): Promise<{
    userId: string;
    username: string;
    passwordHash: string;
    isActive: boolean;
  } | null>;

  // used for authorization, only get role after successful authentication
  getRoleCodesByUserId(userId: string): Promise<string[]>;
}

export const USER_READ_PORT = Symbol('USER_READ_PORT');
