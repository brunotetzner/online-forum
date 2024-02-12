import { Answer } from "../../enterprises/entities/answer";
import { AnswerRepository } from "../repositories/answer-repository";

interface EditAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
  content: string;
}

interface EditAnswerUseCaseResponse {
  answer: Answer;
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}
  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found.");
    }
    if (authorId !== answer.authorId.toString()) {
      throw new Error("Not allowed");
    }

    answer.content = content;

    await this.answerRepository.save(answer);

    return { answer };
  }
}