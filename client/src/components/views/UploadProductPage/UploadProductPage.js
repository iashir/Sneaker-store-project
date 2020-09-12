import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";
import CheckBox from "./sections/CheckBox";

const { Title } = Typography;
const { TextArea } = Input;

const Brands = [
  { key: 1, value: "Nike" },
  { key: 2, value: "Adidas" },
  { key: 3, value: "New Balance" },
  { key: 4, value: "Puma" },
  { key: 5, value: "Reebok" },
  { key: 6, value: "Dr.Martens" },
  { key: 7, value: "Converse" },
];

const Sizes = [
  { key: 1, value: "7.5" },
  { key: 2, value: "8" },
  { key: 3, value: "8.5" },
  { key: 4, value: "9" },
  { key: 5, value: "9.5" },
  { key: 6, value: "10" },
  { key: 7, value: "10.5" },
  { key: 8, value: "11" },
];

const Types = [
  { key: 1, value: "Anthletic Shoes" },
  { key: 2, value: "Boots" },
  { key: 3, value: "Casual Shoe" },
  { key: 4, value: "Dress Shoes" },
  { key: 5, value: "Sandals" },
  { key: 6, value: "Slippers" },
];

const Genders = [
  { key: 1, value: "Men" },
  { key: 2, value: "Women" },
  { key: 3, value: "Unisex" },
];

function UploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState("");
  const [DescriptionValue, setDescriptionValue] = useState("");
  const [PriceValue, setPriceValue] = useState(0);
  const [Brand, setBrand] = useState("");
  const [Size, SetSize] = useState([]);
  const [Type, setType] = useState("");
  const [Gender, setGender] = useState("");

  const [Images, setImages] = useState([]);

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };

  const onPriceChange = (event) => {
    setPriceValue(event.currentTarget.value);
  };

  const handleFilters = (size) => {
    const arr = [];
    Sizes.filter((data, i) =>
      data.key === size[i] ? arr.push(data.value) : null
    );
    SetSize(arr);
  };

  const onSelectChange = (event) => {
    switch (event.target.name) {
      case "Type":
        setType(event.target.value);
        break;
      case "Gender":
        setGender(event.target.value);
        break;
      case "Brand":
        setBrand(event.target.value);
        break;
      default:
        break;
    }
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    if (
      !TitleValue ||
      !DescriptionValue ||
      !PriceValue ||
      !Brand ||
      !Size ||
      !Gender ||
      !Type ||
      !Images
    ) {
      return alert("fill all the fields first!");
    }

    const variables = {
      writer: props.user.userData._id,
      title: TitleValue,
      description: DescriptionValue,
      price: PriceValue,
      images: Images,
      brand: Brand,
      size: Size,
      gender: Gender,
      type: Type,
    };

    Axios.post("/api/product/uploadProduct", variables).then((response) => {
      if (response.data.success) {
        alert("Product Successfully Uploaded");
        props.history.push("/");
      } else {
        alert("Failed to upload Product");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Upload Travel Product</Title>
      </div>

      <Form onSubmit={onSubmit}>
        {/* DropZone */}
        <FileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={TitleValue} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={DescriptionValue} />
        <br />
        <br />
        <label>Price($)</label>
        <Input onChange={onPriceChange} value={PriceValue} type="number" />
        <br />
        <br />
        <CheckBox list={Sizes} handleFilters={handleFilters} />
        <br />
        <br />
        <select name="Brand" onChange={onSelectChange} value={Brand}>
          {Brands.map((item) => (
            <option key={item.key} value={item.value}>
              {item.value}{" "}
            </option>
          ))}
        </select>
        <br />
        <br />
        <select name="Gender" onChange={onSelectChange} value={Gender}>
          {Genders.map((item) => (
            <option key={item.key} value={item.value}>
              {item.value}{" "}
            </option>
          ))}
        </select>
        <br />
        <br />
        <select name="Type" onChange={onSelectChange} value={Type}>
          {Types.map((item) => (
            <option key={item.key} value={item.value}>
              {item.value}{" "}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
