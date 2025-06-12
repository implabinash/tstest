import { describe, it, expect, vi } from "vitest";

import { order, submitOrder } from "../src/main";
import { creditCard, charge } from "../src/payment";

vi.mock("../src/payment");

describe("submitOrder", () => {
    const order: order = { totalAmount: 10 };
    const creditCard: creditCard = { creditCardNo: "12343454" };

    it("Should charge customer if transaction complete", async () => {
        vi.mocked(charge).mockResolvedValue({ status: "success" });

        await submitOrder(order, creditCard);

        expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
    });

    it("Should give success true when transaction completed", async () => {
        vi.mocked(charge).mockResolvedValue({ status: "success" });

        const result = await submitOrder(order, creditCard);

        expect(result).toEqual({ success: true });
    });

    it("Should give success false when transaction error happend", async () => {
        vi.mocked(charge).mockResolvedValue({ status: "failed" });

        const result = await submitOrder(order, creditCard);

        expect(result).toEqual({ success: false, error: "payment_error" });
    });
});
