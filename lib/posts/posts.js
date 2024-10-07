// import sql from 'better-sqlite3';

// const db = new sql('posts.db');

// function initDb() {
//   db.exec(`
//     CREATE TABLE IF NOT EXISTS users (
//       id INTEGER PRIMARY KEY,
//       first_name TEXT,
//       last_name TEXT,
//       email TEXT
//     )`);
//   db.exec(`
//     CREATE TABLE IF NOT EXISTS posts (
//       id INTEGER PRIMARY KEY,
//       image_url TEXT NOT NULL,
//       title TEXT NOT NULL,
//       content TEXT NOT NULL,
//       created_at TEXT DEFAULT CURRENT_TIMESTAMP,
//       user_id INTEGER,
//       FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
//     )`);
//   db.exec(`
//     CREATE TABLE IF NOT EXISTS likes (
//       user_id INTEGER,
//       post_id INTEGER,
//       PRIMARY KEY(user_id, post_id),
//       FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
//       FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
//     )`);

//   // Creating two dummy users if they don't exist already
//   const stmt = db.prepare('SELECT COUNT(*) AS count FROM users');

//   if (stmt.get().count === 0) {
//     db.exec(`
//     INSERT INTO users (first_name, last_name, email)
//     VALUES ('John', 'Doe', 'john@example.com')
//   `);

//     db.exec(`
//     INSERT INTO users (first_name, last_name, email)
//     VALUES ('Max', 'Schwarz', 'max@example.com')
//   `);
//   }
// }

// initDb();

// export async function getPosts(maxNumber) {
//   let limitClause = '';

//   if (maxNumber) {
//     limitClause = 'LIMIT ?';
//   }

//   const stmt = db.prepare(`
//     SELECT posts.id, image_url AS image, title, content, created_at AS createdAt, first_name AS userFirstName, last_name AS userLastName, COUNT(likes.post_id) AS likes, EXISTS(SELECT * FROM likes WHERE likes.post_id = posts.id and likes.user_id = 2) AS isLiked
//     FROM posts
//     INNER JOIN users ON posts.user_id = users.id
//     LEFT JOIN likes ON posts.id = likes.post_id
//     GROUP BY posts.id
//     ORDER BY createdAt DESC
//     ${limitClause}`);

//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   return maxNumber ? stmt.all(maxNumber) : stmt.all();
// }

// export async function storePost(post) {
//   const stmt = db.prepare(`
//     INSERT INTO posts (image_url, title, content, user_id)
//     VALUES (?, ?, ?, ?)`);
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   return stmt.run(post.imageUrl, post.title, post.content, post.userId);
// }

// export async function updatePostLikeStatus(postId, userId) {
//   const stmt = db.prepare(`
//     SELECT COUNT(*) AS count
//     FROM likes
//     WHERE user_id = ? AND post_id = ?`);

//   const isLiked = stmt.get(userId, postId).count === 0;

//   if (isLiked) {
//     const stmt = db.prepare(`
//       INSERT INTO likes (user_id, post_id)
//       VALUES (?, ?)`);
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     return stmt.run(userId, postId);
//   } else {
//     const stmt = db.prepare(`
//       DELETE FROM likes
//       WHERE user_id = ? AND post_id = ?`);
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     return stmt.run(userId, postId);
//   }
// }

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// export async function getPosts(maxNumber) {
//   let limitClause = maxNumber ? maxNumber : null;

//   const { data, error } = await supabase
//     .from("posts")
//     .select(
//       `
//       id,
//       image_url as image,
//       title,
//       content,
//       created_at as createdAt,
//       users!inner(first_name as userFirstName, last_name as userLastName),
//       COUNT(likes.post_id) as likes,
//       EXISTS(SELECT 1 FROM likes WHERE likes.post_id = posts.id AND likes.user_id = 2) as isLiked
//       `
//     )
//     .limit(limitClause)
//     .order("createdAt", { ascending: false });

//   if (error) {
//     console.error("Error fetching posts:", error);
//     return [];
//   }

//   await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating delay

//   return data;
// }

// export async function getPosts(maxNumber) {
//   let query = supabase
//     .from("posts")
//     .select(
//       `
//       id,
//       image_url,
//       title,
//       content,
//       created_at,
//       user_id,
//       users(first_name, last_name),
//       COUNT(likes.post_id) AS likes,
//       EXISTS(SELECT 1 FROM likes WHERE likes.post_id = posts.id AND likes.user_id = 2) AS isLiked
//       `
//     )
//     .order("created_at", { ascending: false });

//   if (maxNumber) {
//     query = query.limit(maxNumber);
//   }

//   const { data, error } = await query;

//   if (error) {
//     console.error("Error fetching posts:", error);
//     return [];
//   }

//   return data;
// }

// export async function getPosts(maxNumber) {
//   // Select posts along with user details
//   let query = supabase
//     .from("posts")
//     .select(
//       `
//       id,
//       image_url,
//       title,
//       content,
//       created_at,
//       users!posts_user_id_fkey (
//         first_name,
//         last_name
//       )
//     `
//     )
//     .order("created_at", { ascending: false });

//   if (maxNumber) {
//     query = query.limit(maxNumber);
//   }

//   // Fetch the basic post data
//   const { data: posts, error } = await query;

//   if (error) {
//     console.error("Error fetching posts:", error);
//     return [];
//   }

//   // For each post, fetch the like count and if the user (id = 2) liked it
//   const enrichedPosts = await Promise.all(
//     posts.map(async (post) => {
//       // Get the total likes for the post
//       const { data: likesCountData, error: likesCountError } = await supabase
//         .from("likes")
//         .select("count", { count: "exact" })
//         .eq("post_id", post.id);

//       const likesCount = likesCountData.length;

//       // Check if user 2 liked the post
//       const { data: isLikedData, error: isLikedError } = await supabase
//         .from("likes")
//         .select("id")
//         .eq("post_id", post.id)
//         .eq("user_id", user.id);

//       const isLiked = isLikedData.length > 0;

//       return {
//         ...post,
//         likes: likesCount, // Add total likes
//         isLiked, // Add user-specific like status
//       };
//     })
//   );

//   return enrichedPosts;
// }

// export async function storePost(post) {
//   const { data, error } = await supabase.from("posts").insert([
//     {
//       image_url: post.imageUrl,
//       title: post.title,
//       content: post.content,
//       user_id: post.user_id,
//     },
//   ]);

//   if (error) {
//     console.error("Error storing post:", error);
//     return null;
//   }

//   await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating delay

//   return data;
// }

// export async function updatePostLikeStatus(postId, userId) {
//   // First, check if the user has already liked the post
//   const { data: likeData, error: likeError } = await supabase
//     .from("likes")
//     .select("count", { count: "exact" })
//     .eq("user_id", userId)
//     .eq("post_id", postId);

//   if (likeError) {
//     console.error("Error fetching like status:", likeError);
//     return null;
//   }

//   const isLiked = likeData.length === 0;

//   // If the user hasn't liked the post yet, insert a like
//   if (isLiked) {
//     const { data, error } = await supabase
//       .from("likes")
//       .insert([{ user_id: userId, post_id: postId }]);

//     if (error) {
//       console.error("Error inserting like:", error);
//       return null;
//     }

//     await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating delay
//     return data;
//   } else {
//     // If the user has liked the post, delete the like
//     const { data, error } = await supabase
//       .from("likes")
//       .delete()
//       .eq("user_id", userId)
//       .eq("post_id", postId);

//     if (error) {
//       console.error("Error deleting like:", error);
//       return null;
//     }

//     await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating delay
//     return data;
//   }
// }

// export async function updatePostLikeStatus(post_id, user_id) {
//   // Check if the user has already liked the post
//   const { data: likeData, error: likeError } = await supabase
//     .from("likes")
//     .select("id")
//     .eq("user_id", user_id)
//     .eq("post_id", post_id);

//   if (likeError) {
//     console.error("Error fetching like status:", likeError);
//     return null;
//   }

//   const isLiked = likeData.length > 0;

//   let data; // For storing the result of insert or delete operation
//   let error; // For capturing errors

//   if (!isLiked) {
//     // Insert a like if the user hasn't liked the post yet
//     ({ data, error } = await supabase
//       .from("likes")
//       .insert([{ user_id, post_id }]));

//     if (error) {
//       console.error("Error inserting like:", error);
//       return null;
//     }
//   } else {
//     // Remove the like if the user has already liked the post
//     ({ data, error } = await supabase
//       .from("likes")
//       .delete()
//       .eq("user_id", user_id)
//       .eq("post_id", post_id));

//     if (error) {
//       console.error("Error deleting like:", error);
//       return null;
//     }
//   }

//   await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating delay

//   // Optionally, fetch the updated like count for the post
//   const { count, error: countError } = await supabase
//     .from("likes")
//     .select("id", { count: "exact" })
//     .eq("post_id", post_id);

//   if (countError) {
//     console.error("Error fetching like count:", countError);
//     return { data, likeCount: 0 }; // Return 0 if there's an error fetching the count
//   }

//   return { data, likeCount: count }; // Return the data and the current like count
// }

// Fetch posts with the option to limit the number of posts returned
export async function getPosts(maxNumber) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        id,
        image_url,
        title,
        content,
        created_at,
        users!posts_user_id_fkey (first_name, last_name)
      `
      )
      .order("created_at", { ascending: false })
      .limit(maxNumber || null);

    if (error) {
      throw error;
    }

    // Map the result to apply aliasing in JavaScript
    const posts = data.map((post) => ({
      id: post.id,
      image: post.image_url, // Aliasing done in JS
      title: post.title,
      content: post.content,
      createdAt: post.created_at, // Aliasing done in JS
      userFirstName: post.users.first_name, // Nested user data
      userLastName: post.users.last_name,
    }));

    // Simulate 1-second delay to match the original SQLite behavior
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return posts;
  } catch (err) {
    console.error("Error fetching posts:", err.message);
    return [];
  }
}

export async function getPostLikesAndIsLiked(postId, userId) {
  try {
    // Fetch the like count
    const { data: likesCountData, error: likesCountError } = await supabase
      .from("likes")
      .select("post_id", { count: "exact" })
      .eq("post_id", postId);

    if (likesCountError) {
      throw likesCountError;
    }

    // Fetch if the user has liked the post
    const { data: isLikedData, error: isLikedError } = await supabase
      .from("likes")
      .select("*")
      .eq("post_id", postId)
      .eq("user_id", userId);

    if (isLikedError) {
      throw isLikedError;
    }

    return {
      likes: likesCountData.length || 0, // Total likes for the post
      isLiked: isLikedData.length > 0, // Whether the user liked the post
    };
  } catch (err) {
    console.error("Error fetching likes and isLiked:", err.message);
    return {
      likes: 0,
      isLiked: false,
    };
  }
}

export async function getPostsWithLikesAndStatus(maxNumber, userId) {
  const posts = await getPosts(maxNumber);
  const enrichedPosts = [];

  for (const post of posts) {
    const likeData = await getPostLikesAndIsLiked(post.id, userId);
    enrichedPosts.push({
      ...post,
      likes: likeData.likes,
      isLiked: likeData.isLiked,
    });
  }

  return enrichedPosts;
}

// Store a new post
export async function storePost(post) {
  try {
    const { error } = await supabase.from("posts").insert({
      image_url: post.imageUrl,
      title: post.title,
      content: post.content,
      user_id: post.userId,
    });

    if (error) {
      throw error;
    }

    // Simulate 1-second delay to match the original SQLite behavior
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true };
  } catch (err) {
    console.error("Error storing post:", err.message);
    return { success: false, error: err.message };
  }
}

// Update the like/unlike status of a post
export async function updatePostLikeStatus(postId, userId) {
  try {
    const { data: existingLike, error: fetchError } = await supabase
      .from("likes")
      .select("*")
      .eq("user_id", userId)
      .eq("post_id", postId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      throw fetchError;
    }

    let result;

    if (!existingLike) {
      // Like the post
      const { error } = await supabase
        .from("likes")
        .insert({ user_id: userId, post_id: postId });

      if (error) throw error;
      result = { liked: true };
    } else {
      // Unlike the post
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("user_id", userId)
        .eq("post_id", postId);

      if (error) throw error;
      result = { liked: false };
    }

    // Simulate 1-second delay to match the original SQLite behavior
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return result;
  } catch (err) {
    console.error("Error updating like status:", err.message);
    return { success: false, error: err.message };
  }
}
