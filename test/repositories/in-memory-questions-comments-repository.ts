import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionCommentRepository } from "@/domain/forum/application/repositories/question-comment-repository";
import { QuestionComment } from "@/domain/forum/enterprises/entities/question-comment";

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentRepository
{
  public items: QuestionComment[] = [];

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment);
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = this.items.find(
      (questionComment) => questionComment.id.toString() === id
    );
    return questionComment || null;
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const itemIdentifier = this.items.findIndex(
      (item) => item.id === questionComment.id
    );
    this.items.splice(itemIdentifier, 1);
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams
  ): Promise<QuestionComment[]> {
    const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return questionComments;
  }
}
