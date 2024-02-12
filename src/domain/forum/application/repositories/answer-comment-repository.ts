import { AnswerComment } from "../../enterprises/entities/answer-comment";

export interface AnswerCommentRepository {
  create(answerComment: AnswerComment): Promise<void>;
}
