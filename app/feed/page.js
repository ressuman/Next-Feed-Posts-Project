import Posts from "@/components/posts/posts";
import { getPostsWithLikesAndStatus } from "@/lib/posts/posts";
//import { getPosts } from "@/lib/posts/posts";

// export const metadata = {
//   title: "Browse all our X posts.",
//   description: "Browse all our posts",
// };

//export const runtime = "edge";

export async function generateMetadata() {
  //const posts = await getPosts();
  const loggedInUserId = 2; // Example: Pass the logged-in user's ID (change dynamically)
  const posts = await getPostsWithLikesAndStatus(null, loggedInUserId);
  const numberOfPosts = posts.length;

  return {
    title: `Browse all our ${numberOfPosts} posts.`,
    description: "Browse all our posts",
  };
}

export default async function FeedPage() {
  //const posts = await getPosts();
  const loggedInUserId = 2; // Example: Pass the logged-in user's ID (change dynamically)
  const posts = await getPostsWithLikesAndStatus(null, loggedInUserId); // Fetch enriched posts
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
