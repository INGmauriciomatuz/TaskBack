export class ItemCreatedAt {
  value: Date;
  constructor(value: Date) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value > new Date()) {
      throw new Error('Item Created At cannot be in the future');
    }
  }
}
