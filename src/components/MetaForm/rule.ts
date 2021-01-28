import { FieldMeta } from "../../types/interface";
import { Rule } from "antd/lib/form";

export function fieldRules(field: FieldMeta): Rule[] {
  const rules: Rule[] = [];
  if (field.required) {
    rules.push({
      required: true,
      message: `请填写${field.name}`
    });
  }
  if (field.type === 'singleOption') {
    rules.push({
      enum: field.options ? field.options.map(opt => opt.value) : [],
      message: '请选择合法的选项',
    });
  }
  if (field.maximum || field.minimum) {
    rules.push({
      max: field.maximum,
      min: field.minimum,
      message: `请输入${field.minimum ? '小于' : ''}${field.minimum}${field.maximum ? '大于' : ''}${field.maximum}的值`
    });
  }
  return rules;
}