export type TAssociatedUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  account_owner: boolean;
  locale: string;
  collaborator: boolean;
  email_verified: boolean;
};

export type TTokenData = {
  access_token: string;
  scope: string;
  expires_in: number;
  associated_user_scope: string;
  session: string | null;
  account_number: string | null;
  associated_user: TAssociatedUser;
};
