import { PaginationParams } from "@/core/repositories/pagination-params";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export interface AnswerRepository {
  create(answer: Answer): Promise<void>;
  delete(answer: Answer): Promise<void>;
  save(answer: Answer): Promise<void>;
  findById(id: string): Promise<Answer | null>;
  findManyByTopicId(
    questionId: string,
    params: PaginationParams
  ): Promise<Answer[]>;
}
