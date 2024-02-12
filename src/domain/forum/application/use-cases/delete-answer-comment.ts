import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/domain/forum/application/use-cases/errors/resource-not-found";
import { NotAllowedError } from "@/domain/forum/application/use-cases/errors/not-allowed";
import { AnswerCommentRepository } from "../repositories/answer-comment-repository";

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>;
export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentRepository) {}
  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId);

    if (!answerComment) {
      return left(new ResourceNotFoundError());
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    await this.answerCommentsRepository.delete(answerComment);
    return right({});
  }
}
