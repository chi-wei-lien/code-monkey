export interface AccessTokenType {
  access: string;
  refresh: string;
}

export interface RefreshTokenType {
  tokens: {
    access: string;
    refresh: string;
  };
}
