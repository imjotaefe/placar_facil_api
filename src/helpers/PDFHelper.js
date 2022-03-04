const pdf = require("pdf-creator-node");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

class PDFHelper {
  static async generate(data) {
    const html = fs.readFileSync(path.resolve(__dirname, "../../resources/views/sumula.html"), "utf8");

    const options = {
      format: "A4",
      orientation: "portrait",
      border: "10mm"
    };

    const fileName = uuid();
    const document = {
      html,
      data,
      path: path.resolve(__dirname, `../../public/sumulas/${fileName}.pdf`)
    }

    await pdf.create(document, options);

    return { fileName: `${fileName}.pdf`, path: `http://localhost:3000/sumulas/${fileName}.pdf` };
  }
}

module.exports = PDFHelper;
