export default class CreateLogDto {
  public context: string;

  public message: string;

  public level: string;

  creationDate?: Date = new Date();
}
