import { Router } from "express";
import multer from "multer";
import writeFile from "../../file/write.js";
import readFile from "../../file/read.js";
import deleteFile from "../../file/delete.js";

const app = Router();
const upload = multer();
const type = upload.single("file");

app.post("/", type, async (req, res) => {
    try {
        if (!req.file || !req.file.buffer) return res.status(400).send('"file" is required');
        if (req.file.buffer.length > 5 * 1024 * 1024) return res.status(400).send("the file size is too large");
        const uuid = await writeFile(req.file);
        res.json({ uuid });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "an error occurred" });
    }
});

app.get("/:id", async (req, res) => {
    try {
        if (!/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(req.params.id))
            return res.status(400).json({ detail: [{ success: false, message: "'id' parameter must be of type object" }] });
        const data = await readFile(req.params.id);
        res.type(data.type).send(data.content);
    } catch (error) {
        if (error.message === "file does not exist") return res.status(404).json({ message: error.message });
        console.log(error);
        res.status(500).json({ message: "an error occurred" });
    }
});

app.delete("/:id", async (req, res) => {
    try {
        if (!/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(req.params.id))
            return res.status(400).json({ detail: [{ success: false, message: "'id' parameter must be of type object" }] });
        await deleteFile(req.params.id);
        res.status(200).json({});
    } catch (error) {
        if (error.message === "file does not exist") return res.status(404).json({ message: error.message });
        console.log(error);
        res.status(500).json({ message: "an error occurred" });
    }
});

export default app;
