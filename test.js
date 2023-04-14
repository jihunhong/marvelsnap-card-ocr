const path = require("path");
const Tesseract = require("tesseract.js");
const { createWorker } = Tesseract;
(async () => {
  const worker = await createWorker({
    logger: (m) => console.log(m),
  });
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  const {
    data: { text },
  } = await worker.recognize(path.resolve(__dirname, "./images", "eng_1.jpeg"));
  console.log(text);
})();
