export type creditCard = {
    creditCardNo: string;
};

export const charge = async (
    crediCardInfo: creditCard,
    amount: number,
): Promise<{ status: string }> => {
    console.log(crediCardInfo.creditCardNo, amount);
    return { status: "success" };
};
