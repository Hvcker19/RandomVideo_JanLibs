import cors from 'cors';
import express from 'express';
import fetch from 'node-fetch';


const app = express();
const port = 3000;
const apiUrl = "https://your-shoti-api.vercel.app/api/v1/get";
const apiKey = "$shoti-1hkarq1k2u7agqq6i0o";

app.use(cors());

app.get("/getRandomVideo", async (req, res) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ apikey: apiKey }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error(`Request failed with status ${response.status}`, errorResponse);
      res.status(response.status).json(errorResponse);
    } else {
      const data = await response.json();
      console.log("Response from Shoti API:", data);

      if (data && data.code !== undefined) {
        if (data.error) {
          console.error("Shoti API returned an error:", data.error);
          res.status(500).json({ error: data.error });
        } else {
          res.json(data);
        }
      } else {
        console.error("Shoti API response is missing the 'code' property.");
        res.status(500).json({ error: "Shoti API response is missing the 'code' property." });
      }
    }
  } catch (error) {
    console.error("Error fetching the random video:", error.message);
    res.status(500).json({ error: "Error fetching the random Shoti video. Please try again later." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
