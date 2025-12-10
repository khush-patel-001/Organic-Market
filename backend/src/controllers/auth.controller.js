import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Farmer } from "../models/farmer.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateToken } from "../utils/generateToken.js";
import { compare } from "bcryptjs";

const register = asyncHandler(async (req, res) => {
  const { isFarmer } = req.body;

  if (!isFarmer) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new ApiError(400, "All fields are required.");
    }

    await User.findOne({ email }).then((user) => {
      if (user) {
        throw new ApiError(400, "User already exists.");
      }
    });

    await Farmer.findOne({ email }).then((user) => {
      if (user) {
        throw new ApiError(400, "User already exists.");
      }
    });

    const user = await User.create({
      name,
      email,
      password,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -token"
    );

    if (!createdUser) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }

    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User registered Successfully"));
  }

  const {
    name,
    email,
    password,
    farmName,
    farmAddress,
    farmDescription,
    farmSize,
  } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !farmName ||
    !farmAddress ||
    !farmDescription ||
    !farmSize
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  await User.findOne({ email }).then((user) => {
    if (user) {
      throw new ApiError(400, "User already exists.");
    }
  });

  await Farmer.findOne({ email }).then((user) => {
    if (user) {
      throw new ApiError(400, "User already exists.");
    }
  });

  const farmer = await Farmer.create({
    name,
    email,
    password,
    farmName,
    farmAddress,
    farmDescription,
    farmSize,
  });

  const createdFarmer = await Farmer.findById(farmer._id).select(
    "-password -token"
  );

  if (!createdFarmer) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdFarmer, "User registered Successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required.");
  }

  const user = await User.findOne({ email });
  const farmer = await Farmer.findOne({ email });

  if (!user && !farmer) {
    throw new ApiError(400, "User not found.");
  }

  await compare(password, user ? user.password : farmer.password).then(
    (isMatch) => {
      if (!isMatch) {
        throw new ApiError(400, "Invalid password.");
      }
    }
  );

  const token = generateToken(user ? user._id : farmer._id, res);

  if (user) {
    const createdUser = await User.findById(
      user ? user._id : farmer._id
    ).select("-password -token");

    return res.status(200).json(
      new ApiResponse(
        200,
        { user: createdUser, token },
        "User logged in Successfully"
      )
    );
  }

  const createdFarmer = await Farmer.findById(
    user ? user._id : farmer._id
  ).select("-password -token");

  return res.status(200).json(
    new ApiResponse(
      200,
      { user: createdFarmer, token },
      "User logged in Successfully"
    )
  );
});

const logout = asyncHandler(async (req, res) => {
  const { id } = req.user || req.farmer;

  if (!id) {
    throw new ApiError(400, "User not found.");
  }

  const user = await User.findById(id);
  const farmer = await Farmer.findById(id);

  if (!user && !farmer) {
    throw new ApiError(400, "User not found.");
  }

  if (user) {
    user.token = undefined;
    await user.save();
  } else {
    farmer.token = undefined;
    await farmer.save();
  }

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  };

  res.clearCookie("token", cookieOptions);
  res.clearCookie("jwt", cookieOptions);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "User logged out Successfully"));
});

const checkAuth = asyncHandler(async (req, res) => {
  const { id } = req.user || req.farmer;

  if (!id) {
    throw new ApiError(400, "User not found.");
  }

  const user = await User.findById(id).select("-password -token");
  const farmer = await Farmer.findById(id).select("-password -token");

  if (!user && !farmer) {
    throw new ApiError(400, "User not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user || farmer, "User logged in Successfully"));
});


export { register, login, logout, checkAuth };
