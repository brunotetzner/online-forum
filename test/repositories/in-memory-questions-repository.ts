import { QuestionRepository } from "@/domain/forum/application/repositories/question-repository";
import { Question } from "@/domain/forum/enterprises/entities/question";
import { Slug } from "@/domain/forum/enterprises/entities/value-objec/slug";

export class InMemoryQuestionsRepository implements QuestionRepository {
  public items: Question[] = [];

  async create(question: Question): Promise<void> {
    this.items.push(question);
  }
  async findBySlug(slug: Slug): Promise<Question | null> {
    return (
      this.items.find((question) => question.slug.value === slug.value) || null
    );
  }
}
