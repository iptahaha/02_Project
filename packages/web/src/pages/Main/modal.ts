import { setDisplay } from '../../utils/ts/utils';

export function openModal(id: string): void {
  setDisplay(id, 'block');
}

export function cleanForm() {
  const input = document.querySelectorAll('input');
  input.forEach(( el) => (el.value = ''));
}

export function closedModal(id: string): void {
  setDisplay(id, 'none');
  cleanForm();
}
