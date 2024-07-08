export class TaskCreatedAt {
  value: Date;
  constructor(value: Date) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value > new Date()) {
      throw new Error('TaskCreatedAt must be in the past');
    }
  }
}
