describe("CashApp Verify API", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("should return 400 if required fields are missing", async () => {
    const { POST } = require("../app/api/cashapp/verify/route");
    const req = { json: async () => ({ cashAppName: "$TestUser" }) };
    const response = await POST(req as any);
    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.error).toContain("Missing required fields");
  });

  it("should return 400 if cashAppName is empty", async () => {
    const { POST } = require("../app/api/cashapp/verify/route");
    const req = { json: async () => ({ cashAppName: "", transactionId: "TX123", planName: "Pro" }) };
    const response = await POST(req as any);
    const data = await response.json();
    expect(response.status).toBe(400);
  });

  it("should successfully submit a CashApp verification", async () => {
    const { POST } = require("../app/api/cashapp/verify/route");
    const req = {
      json: async () => ({
        cashAppName: "$TestUser",
        transactionId: "TX123456",
        planName: "Pro",
        amount: 29,
      }),
    };
    const response = await POST(req as any);
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.verification.cashAppName).toBe("$TestUser");
    expect(data.verification.transactionId).toBe("TX123456");
    expect(data.verification.plan).toBe("Pro");
    expect(data.verification.status).toBe("PENDING_VERIFICATION");
  });

  it("should auto-prefix $ to cashAppName if missing", async () => {
    const { POST } = require("../app/api/cashapp/verify/route");
    const req = {
      json: async () => ({
        cashAppName: "TestUser",
        transactionId: "TX789",
        planName: "Enterprise",
        amount: 99,
      }),
    };
    const response = await POST(req as any);
    const data = await response.json();
    expect(data.verification.cashAppName).toBe("$TestUser");
  });

  it("should handle server errors gracefully", async () => {
    const { POST } = require("../app/api/cashapp/verify/route");
    const req = {
      json: async () => { throw new Error("Parse error"); },
    };
    const response = await POST(req as any);
    const data = await response.json();
    expect(response.status).toBe(500);
    expect(data.error).toBe("Parse error");
  });
});
