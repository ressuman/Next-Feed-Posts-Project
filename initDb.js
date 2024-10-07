import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Dummy users data
const dummyUsers = [
  {
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    can_create_post: true,
    can_like_unlike_post: false,
  },
  {
    first_name: "Max",
    last_name: "Schwarz",
    email: "max@example.com",
    can_create_post: false,
    can_like_unlike_post: true,
  },
];

// Function to initialize the database
export async function initDb() {
  try {
    // Check if users already exist
    const { data, error } = await supabase.from("users").select("id").limit(1);

    if (error) {
      console.error("Error fetching users:", error);
      return;
    }

    // If no users found, insert dummy users
    if (data.length === 0) {
      const { error: insertError } = await supabase
        .from("users")
        .insert(dummyUsers);

      if (insertError) {
        console.error("Error inserting dummy users:", insertError);
      } else {
        console.log("Dummy users inserted successfully");
      }
    } else {
      console.log("Users already exist, skipping dummy user insertion");
    }
  } catch (err) {
    console.error("Database initialization failed:", err.message);
  }
}

// Initialize database when this module is imported
initDb();
