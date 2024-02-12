import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { Comment, CommentProps } from "../entities/comment";

export interface AnswerCommentsProps extends CommentProps {
  answerId: UniqueEntityID;
}

export class AnswerComments extends Comment<AnswerCommentsProps> {
  get answerId() {
    return this.props.answerId;
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
