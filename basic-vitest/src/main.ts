import { charge, creditCard } from "./payment";

export type order = {
    totalAmount: number;
};

type result = {
    success: boolean;
    error?: string;
};

export const submitOrder = async (
    order: order,
    creditCard: creditCard,
): Promise<result> => {
    const paymentResult = await charge(creditCard, order.totalAmount);

    if (paymentResult.status === "failed") {
        return { success: false, error: "payment_error" };
    }

    return { success: true };
};
