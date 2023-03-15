import { UniversityEntity } from "./university.entity";

export type UserEntity = {
  id: string;
  name: string;
  email: string;
  password: string;
  universities?: UniversityEntity[];
};
