export interface User {
  username: string;
  password: string;
}

export const validUserCredentials: User = {
  username: process.env.USERNAME || '',
  password: process.env.PASSWORD || '',
};

export const invalidUserCredentials: User = {
  username: 'invalidUsername',
  password: 'invalidPassword',
}

export const sqlInjectionPayloads = [
  { field: 'username', value: `' OR '1'='1` },
  { field: 'username', value: `admin' --` },
  { field: 'password', value: `' OR '1'='1` },
  { field: 'password', value: `" OR "" = "` },
];