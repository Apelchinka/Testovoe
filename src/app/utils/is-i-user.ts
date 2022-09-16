import { IUser } from '../models/user.model';

export function isIUser(
  value: Partial<{ [K in keyof IUser]: IUser[K] | null | undefined }>
): value is IUser {
  return (
    typeof value.id === 'number' &&
    typeof value.email === 'string' &&
    typeof value.first_name === 'string' &&
    typeof value.last_name === 'string' &&
    typeof value.avatar === 'string'
  );
}
