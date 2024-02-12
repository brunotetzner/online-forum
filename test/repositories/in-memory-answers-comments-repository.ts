import { AnswerCommentRepository } from "@/domain/forum/application/repositories/answer-comment-repository";
import { AnswerComment } from "@/domain/forum/enterprises/entities/answer-comment";

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentRepository
{
  public items: AnswerComment[] = [];

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment);
  }
}
