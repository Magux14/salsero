export function getFamilyClassName(family) {
  switch (family) {
    case 'dile que sí':
      return 'dile-que-si';
    case 'dile que no':
      return 'dile-que-no';
    default:
      return family;
  }
}
