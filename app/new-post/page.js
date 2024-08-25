import { CreatePosts } from "@/actions/posts/posts";
import PostForm from "@/components/post-form/post-form";

export default function NewPostPage() {
  return <PostForm action={CreatePosts} />;
}
