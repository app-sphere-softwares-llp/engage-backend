import { QuerySortByEnum } from '../enums';
import { DEFAULT_PAGINATED_ITEMS_COUNT } from '@/shared/constants';

export class QueryModel {
  filter: any;
  populate?: any;
  select?: string;
  lean?: boolean;
  sort?: string;
  sortBy?: QuerySortByEnum;
  limit?: number;

  constructor() {
    this.lean = false;
    this.sortBy = QuerySortByEnum.asc;
    this.limit = DEFAULT_PAGINATED_ITEMS_COUNT;
  }
}
