const price = [
  {
    _id: 0,
    name: "Any",
    array: [],
  },
  {
    _id: 1,
    name: "$0 to $199",
    array: [0, 199],
  },
  {
    _id: 2,
    name: "$200 to $249",
    array: [200, 249],
  },
  {
    _id: 3,
    name: "$250 to $279",
    array: [250, 279],
  },
  {
    _id: 4,
    name: "$280 to $299",
    array: [280, 299],
  },
  {
    _id: 5,
    name: "More than $300",
    array: [300, 1500000],
  },
];

const Brands = [
  { _id: 1, name: "Nike" },
  { _id: 2, name: "Adidas" },
  { _id: 3, name: "New Balance" },
  { _id: 4, name: "Puma" },
  { _id: 5, name: "Reebok" },
  { _id: 6, name: "Dr.Martens" },
  { _id: 7, name: "Converse" },
];

const Sizes = [
  { _id: 1, name: "7.5" },
  { _id: 2, name: "8" },
  { _id: 3, name: "8.5" },
  { _id: 4, name: "9" },
  { _id: 5, name: "9.5" },
  { _id: 6, name: "10" },
  { _id: 7, name: "10.5" },
  { _id: 8, name: "11" },
];

const Types = [
  { _id: 1, name: "Anthletic Shoes" },
  { _id: 2, name: "Boots" },
  { _id: 3, name: "Casual Shoe" },
  { _id: 4, name: "Dress Shoes" },
  { _id: 5, name: "Sandals" },
  { _id: 6, name: "Slippers" },
];

const Genders = [
  { _id: 1, name: "Men" },
  { _id: 2, name: "Women" },
  { _id: 3, name: "Unisex" },
];

export { price, Types, Genders, Sizes, Brands };
