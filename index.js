const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const port = 3000;

MongoClient.connect(
  "mongodb+srv://domenico:zLD9eTAf8eisJzQG@mongodf.b1spd.mongodb.net/BookmarksDB?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
)
  .then((client) => {
    console.log("connected to DB");
    const db = client.db("bookmarksDB");
    const bookmarksCollection = db.collection("bookmarks");

    app.set("view engine", "ejs");
    app.use(express.static("public"));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.get("/", (req, res) => {
      db.collection("bookmarks")
        .find()
        .toArray()
        .then((results) => {
          res.render("index.ejs", { bookmarks: results });
        })
        .catch((error) => console.error(error));
    });

    app.post("/bookmarks", (req, res) => {
      bookmarksCollection
        .insertOne(req.body)
        .then((result) => {
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });

    app.put("/bookmarks", (req, res) => {
      bookmarksCollection
        .findOneAndUpdate(
          { name: "dom" },
          {
            $set: {
              name: req.body.name,
              quote: req.body.quote,
            },
          },
          {
            upsert: true,
          }
        )
        .then((result) => {
          res.json("Success");
        })
        .catch((error) => console.error(error));
    });

    app.delete("/bookmarks", (req, res) => {
      bookmarksCollection
        .deleteOne({ name: req.body.name })
        .then((result) => {
          if (result.deletedCount === 0) {
            return res.json("No quote to delete");
          }
          res.json(`Deleted Darth Vader's quote`);
        })
        .catch((error) => console.error(error));
    });

    app.get("/dom", (req, res) => {
      res.send("yeeeeee");
    });

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((error) => console.error(error));
