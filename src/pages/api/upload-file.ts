import formidable from "formidable";
// import { createId } from '@paralleldrive/cuid2';
import type { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { z } from "zod";

const UPLOAD_DIR = path.resolve(process.cwd(), "../uploads");

const form = formidable({
  multiples: true,
  keepExtensions: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const Zbody = z.object({
  id: z.string(),
  collection: z.enum(["project", "user"]),
});

export default function handler(req: Request, res: Response) {
  form.parse(req, (err, fields, files) => {


    if (err) {
      return res.status(500).json({ message: "Something went wrong." });
    }

    try {
      const body = Zbody.parse(fields);
      const { id, collection } = body;

      const uploadDir = path.join(UPLOAD_DIR, collection, id);

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      if (Array.isArray(files.files)) {
        for (const file of files.files) {
          const filePath = path.join(uploadDir, file.originalFilename ?? "");

          fs.copyFileSync(file.filepath, filePath);
          fs.rmSync(file.filepath);
        }
        return res.status(200).json({ message: "Files uploaded" });
      }

      const file = files.files as formidable.File;

      const filePath = path.join(uploadDir, file.originalFilename ?? "");

      fs.copyFileSync(file.filepath, filePath);
      fs.rmSync(file.filepath);

      return res.status(200).json({ message: "File uploaded" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  });
}
