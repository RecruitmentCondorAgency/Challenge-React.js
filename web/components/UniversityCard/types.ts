import { UniversityEntity } from "../../common/entities";

export type UniversityCardProps = {
  onClickDetail?: (university: UniversityEntity) => void;
  fullWidth?: boolean;
  university: UniversityEntity;
  hideDetail?: boolean;
};
