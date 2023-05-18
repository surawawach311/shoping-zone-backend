const AWS = require("aws-sdk");
const fs = require("fs");
const s3 = new AWS.S3({
  accessKeyId: "AKIATRHDSPINGKMII3MV",
  secretAccessKey: "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",
  region: "ap-southeast-1",
});
export const uploadFile = (file: any) => {
  let allowMimeType = ["image/jpeg", "image/png", "application/pdf"];
  let allowFileSize = 5242880;

  return new Promise(async function (resolve, reject) {
    try {
      if (typeof file === "object" && file !== null) {
        if (file.mimetypes) allowMimeType = file.mimetypes.split(",");
        if (file.size) allowFileSize = Number(file.size);

        const findMimeType = allowMimeType.find((val) => val == file.mimetype);
        if (!findMimeType) throw new Error("NOT_ALLOW_INPUT_TYPE");
        if (file.size > allowFileSize) throw new Error("FILE_SIZE_LIMIT");

        fs.readFile(file.path, async function (err: any, data: any) {
          if (err) throw err;
          const params = {
            Bucket: `shoppingzone-uploadfile`,
            Key: `${Date.now()}${file.originalname}`,
            Body: data,
          };
          const uploaded = await s3.upload(params, function (err: any, data: any) {
            // Whether there is an error or not, delete the temp file
            fs.unlink(file.path, function (err: any) {
              if (err) {
                console.error(err);
              }
            });
            if (err) {
              console.log("ERROR MSG: ", err);
              throw err;
            } else {
              resolve({ data, mimetype: file.mimetype });
            }
          });
        });
      } else {
        throw new Error("MISSING_REQUIRED");
      }
    } catch (error) {
      reject(error);
    }
  });
};
