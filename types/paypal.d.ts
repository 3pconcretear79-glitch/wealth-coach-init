import "@paypal/react-paypal-js";
declare module "@paypal/react-paypal-js" {
  interface PayPalButtonsComponentProps {
    createOrder?: (data: Record<string, unknown>, actions: { order: { create: (opts: Record<string, unknown>) => Promise<string> } }) => Promise<string>;
    onApprove?: (data: Record<string, unknown>, actions: { order: { capture: () => Promise<Record<string, unknown>> } }) => Promise<void> | void;
  }
}
