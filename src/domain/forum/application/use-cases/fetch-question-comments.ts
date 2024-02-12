import { QuestionComment } from "../../enterprises/entities/question-comment";
import { QuestionCommentRepository } from "../repositories/question-comment-repository";

interface FetchQuestionCommentsUseCaseRequest {
  page: number;
  questionId: string;
}

interface FetchQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[];
}

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      });

    return {
      questionComments,
    };
  }
}
