import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util.js';



// Init the Express application
const app = express();

// Set the network port
const port = process.env.PORT || 8082;

// Use the body parser middleware for post requests
app.use(bodyParser.json());


app.get("/filteredimage", async (req, res) => {
  let imageUrl = req.query["image_url"]

  if (!imageUrl) {
    return res.status(400).send("Image URL is required");
  }

  try {
    let outpath = await filterImageFromURL(imageUrl);
    res.status(200).sendFile(outpath, async (err) => {
      if (err) {
        console.log("Send file error: " + err);
      }
      await deleteLocalFiles([outpath]);
    });
  } catch (e) {
    res.status(422).send(`${e}`);
  }
});

// Root Endpoint
// Displays a simple message to the user
app.get("/", async (req, res) => {
  res.send("try GET /filteredimage?image_url={{}}")
});


// Start the Server
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
  console.log(`press CTRL+C to stop server`);
});
