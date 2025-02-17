interface Feedback {
  userId: string;
  feedbackDate: Date;
  comment: string;
  rating: number;
  user: {
    id: string;
    avatar: string;
    fullName: string;
    email: string;
  };
}

type FeedbackResponse = {
  data: Feedback[];
  paginate: Pagination;
};
