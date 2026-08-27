export class DomainError extends Error {
  readonly code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = "DomainError";
    this.code = code;
  }
}

export class NotFoundDomainError extends DomainError {
  constructor(message: string) {
    super(message, "NOT_FOUND");
    this.name = "NotFoundDomainError";
  }
}

export class ValidationDomainError extends DomainError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR");
    this.name = "ValidationDomainError";
  }
}
