import { Question } from "../../enterprises/entities/question";
import { Slug } from "../../enterprises/entities/value-objec/slug";

export interface QuestionRepository {
  findById(id: string): Promise<Question | null>;
  create(answer: Question): Promise<void>;
  findBySlug(slug: Slug): Promise<Question | null>;
  delete(question: Question): Promise<void>;
}
