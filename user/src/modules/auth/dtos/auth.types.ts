export type JwtPayload = {
  sub: string;
  username: string;
  roles: string[];
};
export type AuthToken = {
  accessToken: string;
};
