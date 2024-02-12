import { QuestionComment } from "../../enterprises/entities/answer-comment";

export interface QuestionCommentRepository {
  create(questionComment: QuestionComment): Promise<void>;
}
