import {AbstractControl} from "@angular/forms";

export function RequireSelection (control: AbstractControl){
  return control.value && typeof control.value === 'string'
    ? {incorrect: true}
    : null;
}
