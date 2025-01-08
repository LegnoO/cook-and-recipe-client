// ** Next Imports
import Link from "next/link";

// ** Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// ** Components
import { getCharInitials } from "@/utils";

// ** Types
type Props = {
  commentIndex: number;
};
const Comment = ({ commentIndex }: Props) => {
  // const commentLength = 4;

  const CommentForm = () => {
    return (
      <Card className="bg-secondary p-4">
        <h3 className="mb-4 font-medium">Add Your Review</h3>
        <form className="space-y-4">
          <div className="space-y-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  className="text-muted-foreground transition-colors hover:text-primary">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Your Comment</label>
            <textarea
              className="min-h-[100px] w-full rounded-md border bg-background p-3"
              placeholder="Share your experience with this recipe..."
            />
          </div>

          <Button className="w-full sm:w-auto">Submit Review</Button>
        </form>
      </Card>
    );
  };

  const CommentList = () => {
    return (
      <div className="mt-6 flex gap-4 rounded-lg border p-4">
        <Avatar className="h-10 w-10">
          <AvatarImage
            className="object-cover"
            src={""}
            alt="Profile picture"
          />
          <AvatarFallback>{getCharInitials("fullName")}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">author</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 fill-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  ))}
                </div>
                <span>•</span>
                <span>2 days ago</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            This recipe is amazing! The broth was so flavorful and the
            instructions were easy to follow. My family loved it!
          </p>
        </div>
      </div>
    );
  };

  return (
    <Card className="border-none p-0 shadow-none">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Comments</h2>
        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className="h-5 w-5 fill-primary"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
              </svg>
            ))}
          </div>
          <span className="text-lg font-medium">4.8</span>
          <span className="text-muted-foreground">(124 reviews)</span>
        </div>
      </div>

      <CommentForm />
      <CommentList />
      <Link href={`?comment=${commentIndex + 1}`} scroll={false}>
        <Button className="mt-4" variant="secondary">
          Load More Comments...
        </Button>
      </Link>
    </Card>
  );
};

export default Comment;
