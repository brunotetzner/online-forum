import { Entity } from "@/core/entities/entities";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface AnswerCommentsProps {
  authorId: UniqueEntityID;
  answerId: UniqueEntityID;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class AnswerComments extends Entity<AnswerCommentsProps> {
  get content() {
    return this.props.content;
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  get authorId() {
    return this.props.authorId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  get excerpt() {
    return this.props.content.substring(0, 120).trimEnd().concat("...");
  }

  static create(
    props: Optional<AnswerCommentsProps, "createdAt">,
    id?: UniqueEntityID
  ) {
    const answerComment = new AnswerComments(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id
    );

    return answerComment;
  }
}
