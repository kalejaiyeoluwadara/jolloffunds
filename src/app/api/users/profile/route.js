import { NextResponse } from "next/server";

let profiles = []; // In-memory storage for profiles (replace with DB later)

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
    const existingProfile = profiles.find(
      (profile) => profile.username === username
    );
    if (existingProfile) {
      return NextResponse.json(
        { error: "Username already exists!" },
        { status: 409 } // Conflict
      );
    }

    // Create new profile
    const newProfile = { username, bankName, accountNumber };
    profiles.push(newProfile);

    return NextResponse.json(
      { message: "Profile created successfully!", profile: newProfile },
      { status: 201 }
    );
  } catch (error) {
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

    // Validate input
    if (!username) {
      return NextResponse.json(
        { error: "Username query parameter is required!" },
        { status: 400 }
      );
    }

    // Find the profile
    const profile = profiles.find((profile) => profile.username === username);
    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({ profile }, { status: 200 });
  } catch (error) {
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

    // Validate input
    if (!username) {
      return NextResponse.json(
        { error: "Username is required for update!" },
        { status: 400 }
      );
    }

    // Find the profile
    const profile = profiles.find((profile) => profile.username === username);
    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found!" },
        { status: 404 }
      );
    }

    // Update the profile
    if (bankName) profile.bankName = bankName;
    if (accountNumber) profile.accountNumber = accountNumber;

    return NextResponse.json(
      { message: "Profile updated successfully!", profile },
      { status: 200 }
    );
  } catch (error) {
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
    const username = searchParams.get("username"); // Extract the username query parameter

    // Validate input
    if (!username) {
      return NextResponse.json(
        { error: "Username query parameter is required!" },
        { status: 400 }
      );
    }

    // Find and remove the profile
    const profileIndex = profiles.findIndex(
      (profile) => profile.username === username
    );
    if (profileIndex === -1) {
      return NextResponse.json(
        { error: "Profile not found!" },
        { status: 404 }
      );
    }

    profiles.splice(profileIndex, 1); // Remove the profile from the array

    return NextResponse.json(
      { message: "Profile deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
