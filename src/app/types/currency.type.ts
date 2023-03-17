export type CurrencyType = {
    amount: number;
    base: string;
    date: string;
    rates: {
        RUB?: number;
        USD?: number;
        EUR?: number;
    };
};
