import { IUser } from './user.model';
import { FormControl } from '@angular/forms';

export type IUserFormOptionsModal = {
  [K in keyof IUser]: FormControl<IUser[K]>;
};
