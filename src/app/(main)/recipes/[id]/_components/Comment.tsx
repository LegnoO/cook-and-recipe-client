"use client";

// ** React Imports
import { useState, useRef, useEffect } from "react";

// ** Components
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// ** Components
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import Rating from "@/components/Rating";
import Repeat from "@/components/Repeat";

// ** Library Imports
import { useQuery } from "@tanstack/react-query";

// ** Config
import { queryOptionsConfig } from "@/config/useQueryOptions";

// ** Hooks
import { useToast } from "@/hooks/useToast";

// ** Services
import { postReview } from "@/services/client/recipeService";
import { getFeedback } from "@/services/client/feedbackService";

// ** Utils
import { timeAgo } from "@/utils";

// ** Types
type Props = {
  recipeDetail: RecipeDetail;
};

const Comment = ({ recipeDetail }: Props) => {
  const [commentLength, setCommentLength] = useState(5);
  const [commentList, setCommentList] = useState<Feedback[]>([]);

  const {
    data: feedbackResponse,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["feedback", recipeDetail],
    queryFn: () => getFeedback(recipeDetail.id),
    ...queryOptionsConfig,
  });

  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [rating, setRating] = useState<number | null>(null);
  const { toast } = useToast();

  async function handlePostReview() {
    if (!rating || !commentRef.current!.value) {
      toast({
        variant: "destructive",
        title: "Incomplete Information!",
        description:
          "Please select a rating and write a comment before submitting.",
      });
      return;
    }

    try {
      toast({
        title: "Loading...",
        description: "Please wait while we process your request.",
      });
      await postReview({
        recipeId: recipeDetail.id,
        content: commentRef.current!.value,
        rating,
      });
      refetch();
      toast({
        variant: "successful",
        title: "Review submitted successfully!",
        description: "Thank you for your feedback.",
      });
      setRating(null);
      commentRef.current!.value = "";
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  }

  function loadMoreComment() {
    const expand = 5;
    if (commentLength < commentList.length)
      setCommentLength((prev) => prev + expand);
  }

  const CommentForm = () => {
    return (
      <Card className="bg-secondary p-4">
        <div className="space-y-4">
          <Rating
            readOnly={isLoading}
            defaultValue={rating}
            onChange={setRating}
          />
          <div className="space-y-2">
            <Label htmlFor="comment">Your Comment</Label>
            <Textarea
              disabled={isLoading}
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
            disabled={isLoading}
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
    if (isLoading) {
      return (
        <Repeat times={2}>
          <div className="mt-6 flex gap-4 rounded-lg border p-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-[180px]" />
              <Skeleton className="h-4 w-[320px]" />
            </div>
          </div>
        </Repeat>
      );
    }

    return commentList.slice(0, commentLength).map((comment, index) => (
      <div key={index} className="mt-6 flex gap-4 rounded-lg border p-4">
        <Avatar className="h-10 w-10">
          <AvatarImage
            className="object-cover"
            src={comment.user.avatar || "/images/avatar-default.png"}
            alt={comment.user.fullName}
          />
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{comment.user.fullName}</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex">
                  <Rating
                    defaultValue={comment.rating}
                    disableSelect
                    readOnly
                  />
                </div>
                <span>•</span>
                <span>{timeAgo(comment.feedbackDate)}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{comment.comment}</p>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    if (feedbackResponse) {
      setCommentList(feedbackResponse);
    }
  }, [feedbackResponse]);

  return (
    <Card className="border-none p-0 shadow-none">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Comments</h2>
        <div className="flex items-center gap-2">
          <Rating
            defaultValue={recipeDetail.rating}
            disableSelect
            readOnly
            half
          />
          <span className="text-lg font-medium">
            {`(${recipeDetail.rating ? recipeDetail.rating.toFixed(1) : 0})`}
          </span>
        </div>
      </div>

      <CommentForm />
      <CommentList />
      {commentList.length > 5 && (
        <Button onClick={loadMoreComment} className="mt-4" variant="secondary">
          Load More Comments...
        </Button>
      )}
    </Card>
  );
};

export default Comment;
