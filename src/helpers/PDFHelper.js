const pdf = require("pdf-creator-node");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
require('dotenv').config();

class PDFHelper {
  static async generate(data) {
    const html = fs.readFileSync(path.resolve(__dirname, "../../resources/views/sumula.html"), "utf8");

    const options = {
      format: "A4",
      orientation: "portrait",
      border: "10mm",
      footer: {
        height: "28mm",
        contents: {
            default: 
            '<div style="text-align: right"><span style="color: #444;">{{page}}</span><div style="text-align: right"><span style="color: #999;">Placar Fácil</span></div></div>',
        }
    }
    };

    const fileName = uuid();
    const document = {
      html,
      data,
      path: path.resolve(__dirname, `../../public/sumulas/${fileName}.pdf`),
    }

    await pdf.create(document, options);

    return { fileName: `${fileName}.pdf`, path: `${process.env.HOST}/sumulas/${fileName}.pdf` };
  }
}

module.exports = PDFHelper;
