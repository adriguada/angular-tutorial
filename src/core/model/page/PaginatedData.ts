import { Pageable } from "../../../core/model/page/Pageable";

export class PaginatedData<TData> {
    content: TData[];
    pageable: Pageable;
    totalElements: number;
}