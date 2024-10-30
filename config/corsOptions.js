const whiteList = [
    "https://www.googdle.com",
    "http://127.0.0.1:3500",
    "http://localhost:3500",
  ];
  const corsOptions = {
    origin: (origin, callback) => {
      if (whiteList.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by cors--"));
      }
    },
    optionsSuccessStatus: 200,
  };

  module.exports = corsOptions