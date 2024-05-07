import { Name } from './Role.model';

export const roleNames: string[] = [
  Name.Lecturer,
  Name.Developer,
  Name.Bookeeper,
  Name.Designer,
].map((role) => Name[role]);
