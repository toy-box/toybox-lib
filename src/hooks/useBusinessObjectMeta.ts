import { BusinessObjectMeta, FieldMeta } from '../types/interface';

const useBusinessObjectMeta = (objectMeta: BusinessObjectMeta) => {
  const fields: FieldMeta[] = [];
  Object.keys(objectMeta.properties).forEach(key => {
    fields.push(objectMeta.properties[key]);
  });
  return fields.sort((a, b) => {
    if (a.index == null) {
      return 1;
    }
    if (b.index == null) {
      return -1;
    }
    return a.index - b.index;
  });
};

export default useBusinessObjectMeta;
