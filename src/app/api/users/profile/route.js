import { connect } from "@/dbConfig/dbConfig"; // Import the MongoDB connection function
import User from "@/model/user"; // Import the User model
import { NextResponse } from "next/server";

// Middleware to handle CORS
function handleCORS(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Adjust '*' to specific domains in production
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return true; // Signal that the request has been handled
  }
  return false; // Proceed with the handler
}

// POST handler to create a new profile
export async function POST(req) {
  const res = NextResponse.next(); // Create a response object
  if (handleCORS(req, res)) return res;

  await connect();
  try {
    const body = await req.json(); // Parse the JSON body
    const { username, bankName, accountNumber, dp } = body;

    if (!username || !bankName || !accountNumber) {
      return NextResponse.json(
        {
          error: "All fields (username, bankName, accountNumber) are required!",
        },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists!" },
        { status: 409 }
      );
    }

    const newUser = new User({ username, bankName, accountNumber, dp });
    await newUser.save();

    return NextResponse.json(
      { message: "Profile created successfully!", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

// GET handler to fetch details by username
export async function GET(req) {
  const res = NextResponse.next(); // Create a response object
  if (handleCORS(req, res)) return res;

  await connect();
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (username) {
      const user = await User.findOne({ username });
      if (!user) {
        return NextResponse.json(
          { error: "Profile not found!" },
          { status: 404 }
        );
      }

      return NextResponse.json({ user }, { status: 200 });
    }

    const users = await User.find({});
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

// PATCH handler to update a profile by username
export async function PATCH(req) {
  const res = NextResponse.next(); // Create a response object
  if (handleCORS(req, res)) return res;

  await connect();
  try {
    const body = await req.json();
    const { username, bankName, accountNumber } = body;

    if (!username) {
      return NextResponse.json(
        { error: "Username is required for update!" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { error: "Profile not found!" },
        { status: 404 }
      );
    }

    if (bankName) user.bankName = bankName;
    if (accountNumber) user.accountNumber = accountNumber;

    await user.save();

    return NextResponse.json(
      { message: "Profile updated successfully!", user },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

// DELETE handler to delete a profile by username
export async function DELETE(req) {
  const res = NextResponse.next(); // Create a response object
  if (handleCORS(req, res)) return res;

  await connect();
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { error: "Username query parameter is required!" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { error: "Profile not found!" },
        { status: 404 }
      );
    }

    await user.deleteOne();

    return NextResponse.json(
      { message: "Profile deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
