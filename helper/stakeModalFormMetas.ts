import { InputNumber, Select } from "antd";

export const getFieldMeta = () => {
  return {
    formItemLayout: [24, 24],
    fields: [
      {
        key: "stakedAmount",
        label: "Stake/Top Up Amount",
        placeholder: "eg. 100",
        widget: InputNumber,
        min: 10,
        hasFeedback: true,
        rules: [
          {
            type: "number",
            message: "The input is not a number",
          },
          {
            required: true,
            message: "This field is required",
          },
        ],
      },
    ],
  };
};
