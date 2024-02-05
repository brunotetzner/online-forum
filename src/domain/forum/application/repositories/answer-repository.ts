import { Answer } from "@/domain/forum/enterprises/entities/answer";

export interface AnswerRepository {
  create(answer: Answer): Promise<void>;
}
