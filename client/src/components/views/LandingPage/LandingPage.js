import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Icon, Col, Card, Row, Divider, Button } from "antd";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import {
  continents,
  price,
  Types,
  Genders,
  Sizes,
  Brands,
} from "./Sections/Datas";
import SearchFeature from "./Sections/SearchFeature";

const { Meta } = Card;

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [reset, setReset] = useState(false);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState();
  const [SearchTerms, setSearchTerms] = useState("");

  const [Filters, setFilters] = useState({
    type: [],
    gender: [],
    brand: [],
    price: [],
  });

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(variables);
  }, []);

  const getProducts = (variables) => {
    console.log(variables);
    Axios.post("/api/product/getProducts", variables).then((response) => {
      if (response.data.success) {
        if (variables.loadMore) {
          setProducts([...Products, ...response.data.products]);
        } else {
          setProducts(response.data.products);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("Failed to fectch product datas");
      }
    });
  };

  const onLoadMore = () => {
    let skip = Skip + Limit;

    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true,
      filters: Filters,
      searchTerm: SearchTerms,
    };
    getProducts(variables);
    setSkip(skip);
  };

  const renderCards = Products.map((product, index) => {
    return (
      <Col lg={6} md={8} sm={8} xs={24}>
        <Card
          hoverable={true}
          cover={
            <a href={`/product/${product._id}`}>
              <ImageSlider images={product.images} />
            </a>
          }
        >
          <Meta
            title={product.title}
            description={`Price: $${product.price} `}
          />
          <Meta description={`Type: ${product.type}`} />
          <Meta description={`Gender: ${product.gender}`} />
          <Meta description={`Brand: ${product.brand}`} />
          <Meta description={`Sizes: ${product.size.map((data) => data)}`} />
        </Card>
      </Col>
    );
  });

  const showFilteredResults = (filters) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };
    getProducts(variables);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    console.log("array", array);
    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };
    const arr = [];

    if (category === "price") {
      newFilters[category] = filters;
    } else {
      newFilters[category] = filters.map((data) => data.name);
    }

    if (category === "price") {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }

    console.log(newFilters);

    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const handleRecet = () => {
    setFilters({});
    setSearchTerms("");
    setReset(!reset);
    showFilteredResults({});
  };
  const updateSearchTerms = (newSearchTerm) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };

    setSkip(0);
    setSearchTerms(newSearchTerm);

    getProducts(variables);
  };

  return (
    <Row gutter={[16, 16]}>
      <Col
        className="gutter-row"
        xs={24}
        md={6}
        style={{ padding: "0rem 2rem 0rem 2rem" }}
      >
        {/* Filter  */}

        <CheckBox
          list={Brands}
          reset={reset}
          name={"Brands"}
          handleFilters={(filters) => handleFilters(filters, "brand")}
        />
        <CheckBox
          list={Genders}
          reset={reset}
          name={"Genders"}
          handleFilters={(filters) => handleFilters(filters, "gender")}
        />
        <CheckBox
          list={Types}
          reset={reset}
          name={"Types"}
          handleFilters={(filters) => handleFilters(filters, "type")}
        />
        <RadioBox
          list={price}
          reset={reset}
          handleFilters={(filters) => handleFilters(filters, "price")}
        />
        <Button
          onClick={handleRecet}
          type="primary"
          style={{ marginTop: "1rem ", width: "100%" }}
        >
          Recet All
        </Button>
      </Col>
      <Col
        className="gutter-row"
        xs={24}
        md={18}
        style={{ padding: "0rem 2rem 0rem 2rem" }}
      >
        {/* Search  */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "1rem auto",
          }}
        >
          <SearchFeature
            refreshFunction={updateSearchTerms}
            searchTerms={SearchTerms}
          />
        </div>

        {Products.length === 0 ? (
          <div
            style={{
              display: "flex",
              height: "300px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>No post yet...</h2>
          </div>
        ) : (
          <div>
            <Row gutter={[16, 16]}>{renderCards}</Row>
          </div>
        )}
        <br />
        <br />

        {PostSize >= Limit && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={onLoadMore}>Load More</button>
          </div>
        )}
      </Col>
    </Row>
  );
}

export default LandingPage;
