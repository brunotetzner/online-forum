import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import { Answer } from "@/domain/forum/enterprises/entities/answer";

export class InMemoryAnswersRepository implements AnswerRepository {
  async save(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id);
    this.items[itemIndex] = answer;
  }
  public items: Answer[] = [];

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
