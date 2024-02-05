import { Slug } from "./value-objec/slug";
import { Entity } from "@/core/entities/entities";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import dayjs from "dayjs";

export interface QuestionProps {
  authorId: UniqueEntityID;
  bestAnswerId?: UniqueEntityID;
  title: string;
  slug: Slug;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  get content() {
    return this.props.content;
  }

  set content(value: string) {
    this.props.content = value;
  }

  get authorId() {
    return this.props.authorId;
  }

  get title() {
    return this.props.title;
  }
  set title(value: string) {
    this.props.title = value;
    this.props.slug = Slug.createFromText(value);
    this.touch();
  }

  get slug() {
    return this.props.slug;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get isNew() {
    return dayjs().diff(this.props.createdAt, "day") <= 3;
  }

  private touch() {
    this.props.updatedAt = new Date();
    this.touch();
  }

  get excerpt() {
    return this.props.content.substring(0, 120).trimEnd().concat("...");
  }

  set bestAnswerId(bestAnswerId: UniqueEntityID) {
    this.props.bestAnswerId = bestAnswerId;
    this.touch();
  }

  static create(
    props: Optional<QuestionProps, "createdAt" | "slug">,
    id?: UniqueEntityID
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: new Date(),
      },
      id
    );

    return question;
  }
}
