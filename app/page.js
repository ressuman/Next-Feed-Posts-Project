import { Suspense } from "react";

//import { getPosts } from "@/lib/posts/posts";
import Posts from "@/components/posts/posts";
import { getPostsWithLikesAndStatus } from "@/lib/posts/posts";

export const metadata = {
  title: "Latest Posts",
  description: "Browse our latest posts",
};

//export const runtime = "edge";

async function LatestPosts() {
  //const latestPosts = await getPosts(2);

  const loggedInUserId = 2; // Example: Pass the logged-in user's ID (change dynamically)
  const latestPosts = await getPostsWithLikesAndStatus(2, loggedInUserId); // Fetch enriched posts

  return <Posts posts={latestPosts} />;
}

export default async function Home() {
  return (
    <>
      <h1>Welcome back!</h1>
      <p>Here&apos;s what you might&apos;ve missed.</p>
      <section id="latest-posts">
        <Suspense fallback={<p>Loading recent posts...</p>}>
          <LatestPosts />
        </Suspense>
      </section>
    </>
  );
}
