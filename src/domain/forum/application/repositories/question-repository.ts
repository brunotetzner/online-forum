import { PaginationParams } from "@/core/repositories/pagination-params";
import { Question } from "../../enterprise/entities/question";
import { Slug } from "../../enterprise/entities/value-objec/slug";

export interface QuestionRepository {
  findById(id: string): Promise<Question | null>;
  create(answer: Question): Promise<void>;
  save(answer: Question): Promise<void>;
  findBySlug(slug: Slug): Promise<Question | null>;
  delete(question: Question): Promise<void>;
  findManyRecent(params: PaginationParams): Promise<Question[]>;
}
