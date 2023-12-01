interface Column {
  name: string;
  type: number;
  props: Props;
}

interface Props {
  name: string;
  type: string;
  unique: boolean;
  length: number;
}

export default class ContentTypeDto {
  name: string;
  columns: Column[];
  projectName: string;
}
