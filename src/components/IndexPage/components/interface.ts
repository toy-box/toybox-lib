export interface OptionItem {
  label: string;
  value: string | number;
}

export interface SearchFindParam {
  name: string;
  type: 'date' | 'singleOption' | 'remoteSingleOption' | 'string';
  key: string;
  options?: OptionItem[];
  advance?: boolean;
  remote?: (query: string) => Promise<OptionItem[]>;
}
