import { connect } from "@/dbConfig/dbConfig"; // Import the MongoDB connection function
import User from "@/model/user"; // Import the User model (corrected)
import { NextResponse } from "next/server";

// Ensure MongoDB is connected once at the top
await connect(); // This will establish a connection before any handler executes

// POST handler to create a new profile
export async function POST(req) {
  try {
    const body = await req.json(); // Parse the JSON body
    const { username, bankName, accountNumber } = body;

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
    const existingUser = await User.findOne({ username }); // Use User model here
    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists!" },
        { status: 409 } // Conflict
      );
    }

    // Create new profile (user)
    const newUser = new User({ username, bankName, accountNumber });
    await newUser.save();

    return NextResponse.json(
      { message: "Profile created successfully!", user: newUser }, // Return the new user
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
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username"); // Extract the username query parameter

    if (username) {
      const user = await User.findOne({ username }); // Use User model here
      if (!user) {
        return NextResponse.json(
          { error: "Profile not found!" },
          { status: 404 }
        );
      }

      return NextResponse.json({ user }, { status: 200 }); // Return the user
    }

    // Fetch all users if no username query is present
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
  try {
    const body = await req.json(); // Parse the JSON body
    const { username, bankName, accountNumber } = body;

    if (!username) {
      return NextResponse.json(
        { error: "Username is required for update!" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ username }); // Use User model here
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
      { message: "Profile updated successfully!", user }, // Return the updated user
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
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { error: "Username query parameter is required!" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ username }); // Use User model here
    if (!user) {
      return NextResponse.json(
        { error: "Profile not found!" },
        { status: 404 }
      );
    }

    await user.remove();

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
