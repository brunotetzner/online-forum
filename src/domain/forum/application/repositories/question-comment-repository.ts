import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionComment } from "../../enterprise/entities/question-comment";

export interface QuestionCommentRepository {
  create(answerComment: QuestionComment): Promise<void>;
  delete(answerComment: QuestionComment): Promise<void>;
  findById(id: string): Promise<QuestionComment | null>;
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams
  ): Promise<QuestionComment[]>;
}
