import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswerRepository } from "../repositories/answer-repository";
import { AnswerComment } from "../../enterprises/entities/answer-comment";
import { AnswerCommentRepository } from "../repositories/answer-comment-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/domain/forum/application/use-cases/errors/resource-not-found";

interface CommentOnAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment;
  }
>;

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerCommentRepository: AnswerCommentRepository
  ) {}
  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    });

    await this.answerCommentRepository.create(answerComment);

    return right({ answerComment });
  }
}
