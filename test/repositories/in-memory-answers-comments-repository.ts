import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerCommentRepository } from "@/domain/forum/application/repositories/answer-comment-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentRepository
{
  public items: AnswerComment[] = [];

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20);

    return answerComments;
  }

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment);
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = this.items.find(
      (answerComment) => answerComment.id.toString() === id
    );

    return answerComment || null;
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const itemIdentifier = this.items.findIndex(
      (item) => item.id === answerComment.id
    );
    this.items.splice(itemIdentifier, 1);
  }
}
