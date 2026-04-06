export const MONTH_MAP: Record<string, number> = {
    Januari: 0, Februari: 1, Maret: 2, April: 3, Mei: 4, Juni: 5,
    Juli: 6, Agustus: 7, September: 8, Oktober: 9, November: 10, Desember: 11,
}

export function parseIndonesianDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split(" ")
    return new Date(+year, MONTH_MAP[month], +day)
}

export function daysLeft(deadline: string): { label: string; urgent: boolean } {
    const d = parseIndonesianDate(deadline)
    const diff = Math.ceil((d.getTime() - Date.now()) / 86400000)
    if (diff < 0) return { label: "Berakhir", urgent: true }
    if (diff <= 7) return { label: `${diff} hari lagi`, urgent: true }
    return { label: `${diff} hari lagi`, urgent: false }
}