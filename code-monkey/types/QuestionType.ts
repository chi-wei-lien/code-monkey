interface QuestionType {
  name: string;
  number: number;
  likes: number;
  link: string;
  posted_by: string;
  posted_by_id: number;
  posted_time: Date;
  q_id: number;
  is_completed: boolean;
  is_liked: boolean;
}

export default QuestionType;
