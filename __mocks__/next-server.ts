export class NextRequest {
  private _body: unknown;
  constructor(input?: string | URL, init?: { method?: string; body?: string; headers?: Record<string, string> }) {
    this._body = init?.body ? JSON.parse(init.body) : null;
  }
  async json() {
    return this._body;
  }
}

export class NextResponse {
  public status: number;
  private _body: unknown;

  constructor(body: string | null, init?: { status?: number; headers?: Record<string, string> }) {
    this._body = body ? JSON.parse(body) : null;
    this.status = init?.status || 200;
  }

  async json() {
    return this._body;
  }

  static json(data: unknown, init?: { status?: number; headers?: Record<string, string> }) {
    return new NextResponse(JSON.stringify(data), init);
  }
}
