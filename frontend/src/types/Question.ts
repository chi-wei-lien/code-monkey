interface Question {
  name: string;
  link: string;
  posted_by: string;
  posted_time: Date;
  q_id: number;
  [key: string]: string | string[] | number | Date | boolean;
}

export default Question;
