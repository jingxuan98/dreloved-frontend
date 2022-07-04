import { InputNumber, Select } from "antd";
// import { Props } from "./props";

export const catogeries = [
  { value: "Services", label: "Services" },
  { value: "Supplements", label: "Supplements" },
  { value: "Electronics", label: "Electronics" },
  { value: "Medical Supplies", label: "Medical Supplies" },
  { value: "Furnitures & Collectibles", label: "Furnitures & Collectibles" },
  { value: "Beauty & Cosmectics", label: "Beauty & Cosmectics" },
  { value: "Weapons", label: "Weapons" },
];

export const getFieldMeta = () => {
  // const { data, sell } = props;

  return {
    formItemLayout: [24, 24],
    fields: [
      {
        key: "title",
        label: "Item Title",
        placeholder: "Item Title",
        hasFeedback: true,
        rules: [
          {
            required: true,
            message: "This field is required",
          },
        ],
      },
      {
        key: "body",
        label: "Item Description",
        placeholder: "Description",
        hasFeedback: true,
        rules: [
          {
            required: true,
            message: "This field is required",
          },
        ],
      },
      {
        key: "price",
        label: "Price",
        widget: InputNumber,
        rules: [
          {
            required: true,
            message: "This field is required",
          },
        ],
        prefix: "BUSD",
        hasFeedback: true,
        min: 1,
        max: 9999,
        placeholder: "Price in (BUSD)",
      },
      {
        key: "catogery",
        label: "Catogery",
        widget: Select,
        placeholder: "Click To Select",
        hasFeedback: true,
        options: catogeries,
        rules: [
          {
            required: true,
            message: "This field is required",
          },
        ],
      },
    ],
  };
};

export default getFieldMeta;
