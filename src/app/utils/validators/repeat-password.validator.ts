import { AbstractControl, ValidationErrors } from '@angular/forms';

export function repeatPasswordValidator(
  control: AbstractControl
): ValidationErrors | null {
  const repeatPassword = control.value;
  const password = control.parent?.get('password')?.value;

  return repeatPassword === password ? null : { notEqualPassword: true };
}
