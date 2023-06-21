import {
  AbstractControl,
  UntypedFormGroup,
  ValidationErrors,
} from '@angular/forms';

export function validateFormGroup(formGroup: UntypedFormGroup) {
  for (const i of Object.keys(formGroup.controls)) {
    formGroup.controls[i].markAsDirty();
    formGroup.controls[i].updateValueAndValidity();
  }

  for (const i of Object.keys(formGroup.controls)) {
    if (!formGroup.controls[i].valid && !formGroup.controls[i].disabled) {
      return false;
    }
  }

  return true;
}

export function nonEmptyValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (!control.value || !control.value.trim()) {
    return {
      forbiddenName: { value: control.value },
    };
  }
  return null;
}

export function usernameValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (
    !control.value ||
    control.value.length < 4 ||
    control.value.length > 16 ||
    !control.value.match(/^[A-z]{2,}[A-z0-9]{0,}$/)
  ) {
    return {
      forbiddenName: { value: control.value },
    };
  }
  return null;
}
