import { Question } from "../../enterprises/entities/question";

export interface QuestionRepository {
  create(answer: Question): Promise<void>;
}
