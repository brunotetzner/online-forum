import { Answer } from "../../enterprises/entities/answer";
import { AnswerRepository } from "../repositories/answer-repository";

interface FetchQuestionAnswersUseCaseRequest {
  page: number;
  questionId: string;
}

interface FetchQuestionAnswersUseCaseResponse {
  answers: Answer[];
}

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswerRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByTopicId(questionId, {
      page,
    });

    return {
      answers,
    };
  }
}
