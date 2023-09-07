


export const usePagination = (count: number, page: number, items: any) : any[] => {
    const startIndex = (page - 1) * count;
    return items.slice(startIndex, startIndex + count);
}