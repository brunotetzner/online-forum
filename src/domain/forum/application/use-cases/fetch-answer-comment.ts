import { AnswerComment } from "@/domain/forum/enterprises/entities/answer-comment";
import { AnswerCommentRepository } from "@/domain/forum/application/repositories/answer-comment-repository";

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string;
  page: number;
}

interface FetchAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[];
}

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      });

    return {
      answerComments,
    };
  }
}
