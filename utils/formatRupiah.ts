export function parseNumbertoRupiah(input: number | string) {
    let number = typeof input === "string" ? parseFloat(input.replace(/[^0-9.-]+/g, "")) : input;

    if (typeof number !== "number" || isNaN(number)) {
        number = 0;
    }

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(number);


}