import "dotenv/config";

import app from "./app";

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
  console.log(`Server started at ${new Date().toISOString()}`);
  console.log(`Server running on port ${PORT}`);
});
