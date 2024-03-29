import { useContext, useState, useEffect, useImperativeHandle } from "react";
import FormBuilder from "antd-form-builder";
import { api, UserContext } from "../_app";
import styles from "../../styles/Home.module.css";
import { Form, Button, notification } from "antd";
import getFieldMeta from "../../helper/CreatePostSettings";

type Props = {};
const initialProps = {};

const fallback =
  "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg";

const CreateForm: React.FC<Props> = (props) => {
  const { user, setUser } = useContext(UserContext);
  const [image, setImage] = useState<File | null>(null);
  const [item, setItem] = useState(null);
  const [url, setUrl] = useState("");

  const metas = getFieldMeta();
  const [form] = Form.useForm();

  useEffect(() => {
    //callback to run code after url is set
    if (url && item) {
      fetch(`${api}createItem`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: item.title,
          body: item.body,
          photo: url,
          status: "UNSOLD",
          price: item.price,
          catogery: item.catogery,
          _id: user?.data?._id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log({ html: data.error });
          } else {
            //Success
            notification.open({ message: "Created Item successfully!" });
            //   window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const onActionSubmit = (values: any) => {
    const data = new FormData();
    setItem(values);
    data.append("file", image);
    data.append("upload_preset", "usmforum");
    data.append("cloud_name", "dfoc7c90v");

    fetch("https://api.cloudinary.com/v1_1/dfoc7c90v/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {user?.data ? (
        <div className={styles.container}>
          <div className="connectTextContainer">
            <h2 style={{ textAlign: "center" }} className={styles.header1}>
              Post Your DreLoved Item
            </h2>
          </div>
          <div className={styles.formContainer}>
            <Form form={form} layout="vertical" onFinish={onActionSubmit}>
              <div className="file-field input-field">
                <FormBuilder
                  // @ts-ignore
                  meta={metas}
                  form={form}
                />
                <div className="btn">
                  <span style={{ fontWeight: "600" }}>Photo</span>
                  <input
                    type="file"
                    style={{ marginTop: 8 }}
                    required={true}
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
              </div>
              <Form.Item style={{ textAlign: "right" }}>
                <Button htmlType="submit" type="primary">
                  Create Post
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className="connectTextContainer">
            <h2
              style={{ textAlign: "center", fontSize: 28 }}
              className={styles.header1}
            >
              Please Connect A Wallet To Create Post....
            </h2>
          </div>
        </div>
      )}
    </>
  );
};
export default CreateForm;
CreateForm.defaultProps = initialProps;
