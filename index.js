const express = require("express");
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const path = require("path");
const products = require("./data");

const app = express();
const PORT = 3000;
const OUTPUT_DIR = path.join(__dirname, "output");

// Создаем папку output, если её нет
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

// Serve static assets
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Функция для сохранения изображения
const saveImage = (canvas, filename) => {
  return new Promise((resolve, reject) => {
    const out = fs.createWriteStream(filename);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", resolve);
    out.on("error", reject);
  });
};

// Функция для отображения лейблов в правом верхнем углу всего изображения
const drawGlobalLabels = async (ctx, canvasWidth) => {
  const circleNovinka = await loadImage("assets/labels/red-circle.png");
  const circleBestPrice = await loadImage("assets/labels/blue-circle.png");

  const labelX = canvasWidth - 150; // Отступ от правого края
  const labelY = 50; // Отступ сверху

  // Рисуем кружок "Новинка"
  ctx.drawImage(circleNovinka, labelX, labelY, 100, 100);
  ctx.fillStyle = "white";
  ctx.font = "bold 20px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Новинка", labelX + 50, labelY + 55);

  // Рисуем кружок "Краща ціна"
  ctx.drawImage(circleBestPrice, labelX, labelY + 110, 100, 100);
  ctx.fillStyle = "white";
  ctx.font = "bold 18px Arial";
  ctx.textAlign = "center";

  // Центрирование текста "Краща" и "ціна" по вертикали и горизонтали
  ctx.fillText("Краща", labelX + 50, labelY + 155); // Первая строка
  ctx.fillText("ціна", labelX + 50, labelY + 180); // Вторая строка
};

app.get("/generate", async (req, res) => {
  try {
    for (const [index, product] of products.entries()) {
      const canvas = createCanvas(1600, 1200);
      const ctx = canvas.getContext("2d");

      // Заливаем фон белым цветом
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Загружаем логотип
      const logo = await loadImage("assets/images/gp-logo.png");
      ctx.drawImage(logo, 50, 20, 430, 132);

      // Добавляем заголовок
      ctx.font = "bold 48px Arial";
      ctx.fillStyle = "#333";
      ctx.textAlign = "center";
      ctx.fillText("Капсули для прання", canvas.width / 2, 200);

      if (product.images && product.images.length === 4) {
        // Сетка 2x2 для четырех картинок
        const positions = [
          { x: 350, y: 300 },
          { x: 750, y: 300 },
          { x: 350, y: 800 },
          { x: 750, y: 800 },
        ];

        for (let i = 0; i < positions.length; i++) {
          const { x, y } = positions[i];
          const productImage = await loadImage(product.images[i]);
          const imageHeight = 400;
          const aspectRatio = productImage.width / productImage.height;
          const imageWidth = imageHeight * aspectRatio;

          ctx.drawImage(productImage, x, y, imageWidth, imageHeight);

          // Центрирование цен и описаний
          const textY = y + imageHeight / 2;
          ctx.font = "bold 36px Arial";
          ctx.fillStyle = "#E31E28";
          ctx.textAlign = x < 500 ? "right" : "left";
          ctx.fillText(
            `${product.prices[0].value} ${product.prices[0].currency}`,
            x < 500 ? x - 20 : x + imageWidth + 20,
            textY
          );

          ctx.font = "20px Arial";
          ctx.fillStyle = "#333";
          ctx.fillText(
            `${product.name} (${product.quantity} шт)`,
            x < 500 ? x - 20 : x + imageWidth + 20,
            textY + 40
          );
        }
      } else {
        // Один товар
        const productImage = await loadImage(product.image);
        const imageHeight = 600;
        const aspectRatio = productImage.width / productImage.height;
        const imageWidth = imageHeight * aspectRatio;
        const imageX = (canvas.width - imageWidth) / 2;
        const imageY = 300;

        ctx.drawImage(productImage, imageX, imageY, imageWidth, imageHeight);

        // Отображаем цены и описание
        const priceY = imageY + imageHeight / 2;
        product.prices.forEach((price, idx) => {
          ctx.font = "bold 48px Arial";
          ctx.fillStyle = "#E31E28";
          ctx.textAlign = idx % 2 === 0 ? "right" : "left";
          const priceX = idx % 2 === 0 ? imageX - 50 : imageX + imageWidth + 50;
          ctx.fillText(`${price.value} ${price.currency}`, priceX, priceY);
        });

        ctx.font = "20px Arial";
        ctx.fillStyle = "#333";
        ctx.textAlign = "center";
        ctx.fillText(
          `${product.name} (${product.quantity} шт)`,
          canvas.width / 2,
          imageY + imageHeight + 50
        );
      }

      // Рисуем лейблы в правом верхнем углу всего изображения
      await drawGlobalLabels(ctx, canvas.width);

      // Сохраняем изображение в папку output
      const outputPath = path.join(OUTPUT_DIR, `product_${index + 1}.png`);
      await saveImage(canvas, outputPath);
      console.log(`Saved image to ${outputPath}`);
    }

    res.send("All images have been generated and saved to the output folder.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating images");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/generate`);
});
