import app from "./app.js";

app.listen(process.env.PORT, () => {
  console.log(`Api is running on port: ${process.env.PORT}`);
});
