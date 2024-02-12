import { QuestionComment } from "../../enterprises/entities/question-comment";

export interface QuestionCommentRepository {
  create(answerComment: QuestionComment): Promise<void>;
  delete(answerComment: QuestionComment): Promise<void>;
  findById(id: string): Promise<QuestionComment | null>;
}
