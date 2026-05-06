describe("PayPal Capture Order API", () => {
  const MOCK_CLIENT_ID = "test_client_id";
  const MOCK_CLIENT_SECRET = "test_client_secret";
  const originalEnv = process.env;
  let originalFetch: typeof global.fetch;

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_PAYPAL_CLIENT_ID: MOCK_CLIENT_ID,
      PAYPAL_CLIENT_SECRET: MOCK_CLIENT_SECRET,
      PAYPAL_API_BASE: "https://api-m.sandbox.paypal.com",
    };
    originalFetch = global.fetch;
  });

  afterEach(() => {
    process.env = originalEnv;
    global.fetch = originalFetch;
  });

  function makeReq(body: Record<string, unknown>) {
    return { json: async () => body } as any;
  }

  it("should return 400 if orderID is missing", async () => {
    const { POST } = require("../app/api/paypal/capture-order/route");
    const response = await POST(makeReq({ planName: "Pro" }));
    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.error).toBe("Missing orderID");
  });

  it("should return 400 if planName is missing", async () => {
    const { POST } = require("../app/api/paypal/capture-order/route");
    const response = await POST(makeReq({ orderID: "ORDER123" }));
    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.error).toBe("Missing planName");
  });

  it("should capture and verify a PayPal order successfully", async () => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ access_token: "mock_token" }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          status: "COMPLETED",
          purchase_units: [{
            payments: {
              captures: [{
                id: "CAPTURE123",
                amount: { value: "29.00", currency_code: "USD" },
              }],
            },
          }],
          payer: { email_address: "buyer@test.com" },
        }),
      }) as jest.Mock;

    const { POST } = require("../app/api/paypal/capture-order/route");
    const response = await POST(makeReq({ orderID: "ORDER123", planName: "Pro" }));
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.transactionId).toBe("CAPTURE123");
    expect(data.status).toBe("COMPLETED");
    expect(data.plan).toBe("Pro");
    expect(data.amount).toBe("29.00");
  });

  it("should call PayPal token endpoint with correct auth", async () => {
    const mockFetch = jest.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ access_token: "mock_token" }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          status: "COMPLETED",
          purchase_units: [{ payments: { captures: [{ id: "C1", amount: { value: "29", currency_code: "USD" } }] } }],
          payer: { email_address: "test@test.com" },
        }),
      });
    global.fetch = mockFetch as jest.Mock;

    const { POST } = require("../app/api/paypal/capture-order/route");
    await POST(makeReq({ orderID: "ORDER123", planName: "Pro" }));

    const expectedAuth = Buffer.from(`${MOCK_CLIENT_ID}:${MOCK_CLIENT_SECRET}`).toString("base64");
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: `Basic ${expectedAuth}`,
        }),
        body: "grant_type=client_credentials",
      })
    );
  });

  it("should return error when PayPal order is not completed", async () => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ access_token: "mock_token" }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ status: "PENDING", purchase_units: [] }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ access_token: "mock_token" }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ status: "PENDING" }),
      }) as jest.Mock;

    const { POST } = require("../app/api/paypal/capture-order/route");
    const response = await POST(makeReq({ orderID: "ORDER_PENDING", planName: "Pro" }));
    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toContain("not completed");
  });

  it("should handle PayPal API token failure gracefully", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      text: async () => "Unauthorized",
    }) as jest.Mock;

    const { POST } = require("../app/api/paypal/capture-order/route");
    const response = await POST(makeReq({ orderID: "ORDER123", planName: "Pro" }));
    const data = await response.json();
    expect(response.status).toBe(500);
    expect(data.error).toContain("Failed to get PayPal access token");
  });

  it("should not expose PayPal secret in response", async () => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ access_token: "mock_token" }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          status: "COMPLETED",
          purchase_units: [{ payments: { captures: [{ id: "C1", amount: { value: "29", currency_code: "USD" } }] } }],
          payer: { email_address: "x@test.com" },
        }),
      }) as jest.Mock;

    const { POST } = require("../app/api/paypal/capture-order/route");
    const response = await POST(makeReq({ orderID: "ORDER123", planName: "Pro" }));
    const rawText = JSON.stringify(await response.json());
    expect(rawText).not.toContain(MOCK_CLIENT_SECRET);
    expect(rawText).not.toContain("mock_token");
  });
});
