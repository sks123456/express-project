const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt"); //encrypt user pass
const jwt = require("jsonwebtoken"); //create user token

//@desc Register a user
//@route Get /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  //input validation
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  //finding similar users
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  //Hash Password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);

  //create user obj
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`User created${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("Userdata not valid");
  }
  res.json({ message: "Register the user" });
});

//@desc Login user
//@route Get /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //input validation
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  //finding user with the param email
  const user = await User.findOne({ email });

  //   compare pass with hashedpass
  if (user && (await bcrypt.compare(password, user.password))) {
    //create access token using jwt
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      // token secret key in .env
      process.env.ACCESS_TOKEN_SECRET,
      {
        //token validation duration
        expiresIn: "1m",
      }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or Password is not valid");
  }
  res.json({ message: "Login user" });
});

//@desc Current user info
//@route Get /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
