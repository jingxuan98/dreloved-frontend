import { Props } from "./props";

export const getFieldMeta = (props: Props) => {
  const { data } = props;
  return {
    formItemLayout: [24, 24],
    fields: [
      {
        key: "trackingNo",
        label: "Tracking No.",
        placeholder: "Tracking No",
        initialValue: data?.trackingNo,
        hasFeedback: true,
        rules: [
          {
            required: true,
            message: "This field is required",
          },
        ],
      },
      {
        key: "courrierName",
        label: "Courrier Name",
        placeholder: "Courier Name",
        initialValue: data?.courrierName,
        hasFeedback: true,
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
