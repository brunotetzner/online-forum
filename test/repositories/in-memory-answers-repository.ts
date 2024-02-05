import { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import { Answer } from "@/domain/forum/enterprises/entities/answer";

export class InMemoryAnswersRepository implements AnswerRepository {
  public items: Answer[] = [];

  async create(answer: Answer): Promise<void> {
    this.items.push(answer);
  }
}
