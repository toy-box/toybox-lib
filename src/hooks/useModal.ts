import { useState } from 'react';

export default () => {
  const [visible, setVisible] = useState(false);

  return [visible, setVisible] as [boolean, (visible: boolean) => void];
};
