// const products = [
//   // Конфигурация для одного товара
//   {
//     name: "Savex Super Caps Color XL",
//     quantity: 42,
//     image: "assets/images/1.png",
//     prices: [
//       {
//         value: 380.69,
//         currency: "UAH",
//         position: "left", // Варианты: "left", "right", "both"
//       },
//       {
//         value: 400.5,
//         currency: "UAH",
//         position: "right",
//       },
//     ],
//     labels: [
//       {
//         text: "НОВИНКА",
//         color: "red",
//       },
//       {
//         text: "КРАЩА ЦІНА",
//         color: "blue",
//       },
//     ],
//   },

//   {
//     name: "Savex Super Caps Color",
//     quantity: 28,
//     image: "assets/images/1.png",
//     prices: [{ value: 279.89, currency: "UAH" }],
//     labels: [{ text: "НОВИНКА", color: "red" }],
//   },
//   {
//     name: "Savex Super Caps Color",
//     quantity: 42,
//     image: "assets/images/1.png",
//     prices: [{ value: 380.69, currency: "UAH" }],
//     labels: [{ text: "НОВИНКА", color: "red" }],
//   },
//   {
//     name: "Savex Extra Fresh",
//     quantity: 28,
//     image: "assets/images/1.png",
//     prices: [{ value: 279.89, currency: "UAH" }],
//     labels: [{ text: "НОВИНКА", color: "red" }],
//   },
//   {
//     name: "Savex Extra Fresh",
//     quantity: 42,
//     image: "assets/images/1.png",
//     prices: [{ value: 380.69, currency: "UAH" }],
//     labels: [{ text: "НОВИНКА", color: "red" }],
//   },
// ];

// module.exports = products;

const products = [
  // Конфигурация для одного товара
  {
    name: "Savex Super Caps Color XL",
    quantity: 42,
    image: "assets/images/1.png",
    prices: [
      {
        value: 380.69,
        currency: "UAH",
        position: "left", // Варианты: "left", "right"
      },
      {
        value: 400.5,
        currency: "UAH",
        position: "right",
      },
    ],
    labels: [
      {
        text: "НОВИНКА",
        color: "red",
      },
      {
        text: "КРАЩА ЦІНА",
        color: "blue",
      },
    ],
  },

  // Конфигурация для четырех товаров (грид 2x2)
  {
    name: "Savex Super Caps Color",
    quantity: 28,
    images: [
      "assets/images/1.png",
      "assets/images/1.png",
      "assets/images/1.png",
      "assets/images/1.png",
    ],
    prices: [{ value: 279.89, currency: "UAH" }],
    labels: [{ text: "НОВИНКА", color: "red" }],
  },
];

module.exports = products;
