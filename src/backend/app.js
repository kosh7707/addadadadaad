const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const app = express();
const PORT = process.env.PORT || 5000;

require("dotenv").config();
require("./passport")();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(`cookiesecret`));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: `cookiesecret`,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

const indexRouter = require("./routes");
const authRouter = require("./routes/auth");
const followRouter = require(`./routes/follow`);
const diaryRouter = require(`./routes/diary`);
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use(`/follow`, followRouter);
app.use(`/diary`, diaryRouter);

app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  console.error(err);
  res.send(err);
});

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
