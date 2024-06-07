export class WordleMainError {
  private readonly statusCode: number;
  private readonly message: Array<string>;

  // static handler(error:Error) {
  //   return new this(error.);
  // }

  constructor(statusCode: number, message: Array<string>) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
