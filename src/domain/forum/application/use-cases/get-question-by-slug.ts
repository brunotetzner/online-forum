import { Question } from "@/domain/forum/enterprises/entities/question";
import { QuestionRepository } from "../repositories/question-repository";
import { Slug } from "../../enterprises/entities/value-objec/slug";

interface GetQuestionBySlugUseCaseRequest {
  slug: Slug;
}

interface GetQuestionBySlugUseCaseResponse {
  question: Question;
}

export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionRepository.findBySlug(slug);
    if (!question) {
      throw new Error("Question not found.");
    }

    return {
      question,
    };
  }
}
