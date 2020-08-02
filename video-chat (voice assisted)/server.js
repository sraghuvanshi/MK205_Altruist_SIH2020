const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidv4 } = require("uuid");
const PORT = process.env.PORT || 4002;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room, saidId: 0 });
});

app.get("/:room/:mailTo", (req, res) => {
  res.redirect(`/${req.params.room}`);
  mailTo = req.params.mailTo;
  console.log("Mail sent to " + mailTo);
  roomLink = `https://video-altruist.herokuapp.com/${req.params.room}`;

  var nodemailer = require("nodemailer");

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "altruist.sih@gmail.com",
      pass: "altruist1234",
    },
  });

  var mailOptions = {
    from: "altruist.sih@gmail.com",
    to: mailTo,
    subject: "Invite for a Video call from Team Altruist",
    text: `Hi there,
    Greetings!

    Your friend has invited you to a video conference. Please click the link provided below to enter the room.

    ${roomLink}

    Best Regards,
    Team ALtruist
    SIH MK205`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);

    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", userId);
    });
  });
});

server.listen(PORT, (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port ${PORT}...`);
});
