import express from "express";
import cors from "cors";
import translate from "translate";

translate.engine = "google"; 
translate.key = undefined; 


const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
});

app.post("/translate", async (req, res) => {
    const { text } = req.body;
  
    if (!text) {
      return res.status(400).send({ message: "Text is required" });
    }
    
    try {
        const translatedText = await translate(text, { from: "th", to: "en" });
        res.json({ translatedText });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send({ message: "Error in translation", error: error.message });
    }
  });

  



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
