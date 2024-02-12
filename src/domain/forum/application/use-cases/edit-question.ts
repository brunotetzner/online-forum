import { Either, left, right } from "@/core/either";
import { Question } from "../../enterprises/entities/question";
import { QuestionRepository } from "../repositories/question-repository";
import { NotAllowedError } from "./errors/not-allowed";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface EditQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
  title: string;
  content: string;
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question;
  }
>;
export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}
  async execute({
    questionId,
    authorId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }
    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    question.title = title;
    question.content = content;

    await this.questionRepository.save(question);

    return right({ question });
  }
}
