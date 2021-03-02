import React, { FC, Fragment, ReactNode, useCallback, useMemo } from 'react';

export interface FilterSearchProps {}

const FilterSearch: FC<DropdownMenuProps> = ({
  items,
  children,
  ...props
}) => {};
const ThemeContext = React.createContext(0);

export default FilterSearch;
