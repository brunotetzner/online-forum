import { DomainEvents } from "@/core/events/domain-events";
import { AnswerCreatedEvent } from "../../../forum/enterprise/events/answer-create-event";
import { EventHandler } from "@/core/events/event-handler";
import { QuestionRepository } from "@/domain/forum/application/repositories/question-repository";
import { SendNotificationUseCase } from "../use-cases/send-notification";
export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionsRepository: QuestionRepository,
    private sendNotification: SendNotificationUseCase
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions() {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name
    );
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionsRepository.findById(
      answer.questionId.toString()
    );
    if (question) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        title: `Nova resposta em ${question.title.substring(0.4).concat("...")}`,
        content: answer.excerpt,
      });
    }
  }
}
