import { app } from "./setup/server";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  return console.log(`:: Server is listening on port ${port}`);
});
