import { Question } from "../../enterprises/entities/question";
import { QuestionRepository } from "../repositories/question-repository";

interface EditQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
  title: string;
  content: string;
}

interface EditQuestionUseCaseQuestionResponse {
  question: Question;
}
export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}
  async execute({
    questionId,
    authorId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseQuestionResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found.");
    }
    if (authorId !== question.authorId.toString()) {
      throw new Error("Not allowed");
    }

    question.title = title;
    question.content = content;

    await this.questionRepository.save(question);

    return { question };
  }
}
