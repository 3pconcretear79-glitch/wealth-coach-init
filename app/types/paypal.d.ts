interface PayPalButtonsConfig {
  style?: {
    layout?: "vertical" | "horizontal";
    color?: "gold" | "blue" | "silver" | "white" | "black";
    shape?: "rect" | "pill";
    label?: "paypal" | "checkout" | "buynow" | "pay" | "subscribe";
  };
  createOrder?: (
    data: Record<string, unknown>,
    actions: {
      order: {
        create: (opts: Record<string, unknown>) => Promise<string>;
      };
    }
  ) => Promise<string>;
  onApprove?: (
    data: Record<string, unknown>,
    actions: {
      order: {
        capture: () => Promise<Record<string, unknown>>;
      };
    }
  ) => Promise<void>;
  onError?: (err: unknown) => void;
}

interface PayPalButtonsComponent {
  render: (selector: string) => Promise<void>;
}

interface PayPalNamespace {
  Buttons: (config: PayPalButtonsConfig) => PayPalButtonsComponent;
}

interface Window {
  paypal?: PayPalNamespace;
}
