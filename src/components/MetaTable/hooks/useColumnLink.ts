import { useCallback } from "react";
import { useHistory } from "react-router-dom";

type pathType<T> = (record: T) => string | string;

const useColumnLink = <T>(record: T, link?: pathType<T>) => {
  const history = useHistory();
  const linkHandle = useCallback(() => {
    if (link != null) {
      history.push(typeof link === 'string' ? link : link(record));
    }
  }, [history, link, record]);
  return linkHandle;
}

export default useColumnLink;
