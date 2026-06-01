

export default function formatDateTime(isoDate: string): string {

    const date = new Date(isoDate);

    const day = date.getUTCDate();
    const month = date.toLocaleString("en-US", {
        month: "short",
        timeZone: "UTC",
    });
    const year = date.getUTCFullYear();

    const formatted = `${day} ${month}, ${year}`;
    return formatted;
}

