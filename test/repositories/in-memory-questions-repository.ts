import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionRepository } from "@/domain/forum/application/repositories/question-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objec/slug";
import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/question-attachment-repository";
import { DomainEvents } from "@/core/events/domain-events";

export class InMemoryQuestionsRepository implements QuestionRepository {
  public items: Question[] = [];

  constructor(
    private questionAttachmentsRepository: QuestionAttachmentsRepository
  ) {}

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find(
      (question) => question.id.toString() === id
    );

    return question || null;
  }

  async delete(question: Question): Promise<void> {
    const itemIdentifier = this.items.findIndex(
      (item) => item.id === question.id
    );
    this.items.splice(itemIdentifier, 1);

    this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString()
    );
  }
  async create(question: Question): Promise<void> {
    DomainEvents.dispatchEventsForAggregate(question.id);
    this.items.push(question);
  }
  async save(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id);
    this.items[itemIndex] = question;
    DomainEvents.dispatchEventsForAggregate(question.id);
  }
  async findBySlug(slug: Slug): Promise<Question | null> {
    return (
      this.items.find((question) => question.slug.value === slug.value) || null
    );
  }
  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return questions;
  }
}
