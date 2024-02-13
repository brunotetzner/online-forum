import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachment-repository";
import { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswerRepository {
  public items: Answer[] = [];

  constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository
  ) {}

  async save(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id);
    this.items[itemIndex] = answer;
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer);
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((answer) => answer.id.toString() === id);

    return answer || null;
  }

  async delete(answer: Answer): Promise<void> {
    const itemIdentifier = this.items.findIndex(
      (item) => item.id === answer.id
    );
    this.items.splice(itemIdentifier, 1);
    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString());
  }
  async findManyByTopicId(
    questionId: string,
    params: PaginationParams
  ): Promise<Answer[]> {
    const answers = this.items
      .filter((answer) => answer.questionId.toString() === questionId)
      .slice((params.page - 1) * 20, params.page * 20);

    return answers;
  }
}
