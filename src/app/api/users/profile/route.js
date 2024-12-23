import { connect } from "@/dbConfig/dbConfig"; // Import the MongoDB connection function
import User from "@/model/user"; // Import the User model
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Ensure MongoDB is connected for every request
    await connect();

    const body = await req.json(); // Parse the JSON body
    const { username, bankName, accountNumber, dp } = body;

    // Validate input
    if (!username || !bankName || !accountNumber) {
      return NextResponse.json(
        {
          error: "All fields (username, bankName, accountNumber) are required!",
        },
        { status: 400 }
      );
    }

    // Check for duplicate username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists!" },
        { status: 409 }
      );
    }

    // Create new profile (user)
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

export async function GET(req) {
  try {
    await connect();

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

export async function PATCH(req) {
  try {
    await connect();

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

export async function DELETE(req) {
  try {
    await connect();

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
