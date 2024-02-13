import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionRepository } from "../repositories/question-repository";
import { Question } from "../../enterprises/entities/question";
import { Either, right } from "@/core/either";
import { QuestionAttachment } from "../../enterprises/entities/question-attachment";
import { QuestionAttachmentList } from "../../enterprises/entities/question-attachment-list";

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
  attachmentsIds: string[];
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question;
  }
>;

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}
  async execute({
    authorId,
    title,
    content,
    attachmentsIds,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    });

    const questionAttachments = attachmentsIds.map((attachmentId) =>
      QuestionAttachment.create({
        questionId: question.id,
        attachmentId: new UniqueEntityID(attachmentId),
      })
    );
    question.attachments = new QuestionAttachmentList(questionAttachments);
    await this.questionRepository.create(question);

    return right({ question });
  }
}
