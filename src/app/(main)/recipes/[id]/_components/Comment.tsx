"use client";

// ** React Imports
import { useState, startTransition, useRef } from "react";

// ** Next Imports
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// ** Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// ** Components
import { getCharInitials } from "@/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Rating from "@/components/Rating";

// ** Library Imports
import { useQuery } from "@tanstack/react-query";

// ** Config
import { queryOptionsConfig } from "@/config/useQueryOptions";

// ** Hooks
import { useToast } from "@/hooks/useToast";

// ** Actions
import { postReviewAction } from "@/app/actions";

// ** Types
type Props = {
  recipeDetail: RecipeDetail;
  commentIndex: number;
};

const Comment = ({ recipeDetail, commentIndex }: Props) => {
  const searchParams = useSearchParams();
  // const { data: notificationResponse, isLoading } = useQuery({
  //   queryKey: ["notifications", index],
  //   queryFn: () => getFeedback(queryParams()),
  //   ...queryOptionsConfig,
  // });
  console.log("🚀 ~ recipeDetail:", recipeDetail);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [rating, setRating] = useState<number | null>(null);
  const { toast } = useToast();

  // function queryParams() {
  //   const params = new URLSearchParams(searchParams.toString());
  //   params.set("index", "1");
  //   params.set("size", (5 * index).toString());
  //   params.set("sortOrder", sortOrder);
  //   params.set("sortBy", sortBy);
  //   return params.toString();
  // }

  async function handlePostReview() {
    if (!rating || !commentRef.current!.value) {
      toast({
        variant: "destructive",
        title: "Incomplete Information!",
        description:
          "Please select a rating and write a review before submitting.",
      });
      return;
    }

    startTransition(async () => {
      const result = await postReviewAction(
        {
          recipeId: recipeDetail.id,
          content: commentRef.current!.value,
          rating,
        },
        "/",
      );
      if (result.success) {
        toast({
          variant: "successful",
          title: "Review submitted successfully!",
          description: "Thank you for your feedback.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: result.message || "An error has occurred",
        });
      }
    });
  }

  const CommentForm = () => {
    return (
      <Card className="bg-secondary p-4">
        <div className="space-y-4">
          <Rating defaultValue={rating} onChange={setRating} />

          <div className="space-y-2">
            <Label htmlFor="comment">Your Comment</Label>
            <Textarea
              id="comment"
              defaultValue={commentRef.current ? commentRef.current.value : ""}
              ref={commentRef}
              placeholder="Share your experience with this recipe..."
              className="min-h-[100px] resize-none bg-background"
              rows={4}
              maxLength={500}
            />
          </div>
          <Button
            type="button"
            onClick={handlePostReview}
            className="w-full sm:w-auto">
            Submit Review
          </Button>
        </div>
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
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Comments</h2>
        <div className="flex items-center gap-2">
          <Rating defaultValue={recipeDetail.rating} disableSelect readOnly />
          <span className="text-lg font-medium">
            {`(${recipeDetail.rating || 0})`}
          </span>
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
