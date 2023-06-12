import express, { Request, Response } from "express";
const { Character } = require("@xivapi/nodestone/lib/profile/character");

const app = express();
const characterParser = new Character();

app.get("/character/:characterId", async (req: Request, res: Response) => {
  try {
    const character = await characterParser.parse(req, "Character.");
    console.log(character);
    res.status(200).json(character);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
