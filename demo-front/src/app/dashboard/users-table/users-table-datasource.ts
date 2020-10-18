import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/api.service';

export interface UsersTableItem {
  id: number;
  name: string;
  rut: string;
  phone: string;
  email: string;
  status: string;
  // token: string;
}

const EXAMPLE_DATA: UsersTableItem[] = [
  {id: 1, name: 'Hydrogen', rut: '123456', phone: '569123456', email: 'Hydrogen@tester.tes', status: 'registrado'}, //, token: 't1'
  {id: 2, name: 'Helium', rut: '654321', phone: '569654321', email: 'Helium@tester.tes', status: 'registrado'},
  {id: 3, name: 'Lithium', rut: '987654', phone: '569987654', email: 'Lithium@tester.tes', status: 'registrado'},
  {id: 4, name: 'Beryllium', rut: '987654', phone: '569987654', email: 'Beryllium@tester.tes', status: 'validado'},
  {id: 5, name: 'Boron', rut: '987654', phone: '569987654', email: 'Boron@tester.tes', status: 'registrado'},
  {id: 6, name: 'Carbon', rut: '987654', phone: '569987654', email: 'Carbon@tester.tes', status: 'registrado'},
  {id: 7, name: 'Nitrogen', rut: '987654', phone: '569987654', email: 'Nitrogen@tester.tes', status: 'validado'},
  // {id: 8, name: 'Oxygen'},
  // {id: 9, name: 'Fluorine'},
  // {id: 10, name: 'Neon'},
  // {id: 11, name: 'Sodium'},
  // {id: 12, name: 'Magnesium'},
  // {id: 13, name: 'Aluminum'},
  // {id: 14, name: 'Silicon'},
  // {id: 15, name: 'Phosphorus'},
  // {id: 16, name: 'Sulfur'},
  // {id: 17, name: 'Chlorine'},
  // {id: 18, name: 'Argon'},
  // {id: 19, name: 'Potassium'},
  // {id: 20, name: 'Calcium'},
];

const EXAMPLE_DATA2: UsersTableItem[] = [
  {id: 1, name: 'Oxygen', rut: '123456', phone: '569123456', email: 'Oxygen@tester.tes', status: 'registrado'}, //, token: 't1'
  {id: 2, name: 'Fluorine', rut: '654321', phone: '569654321', email: 'Fluorine@tester.tes', status: 'registrado'},
  {id: 3, name: 'Neon', rut: '987654', phone: '569987654', email: 'Neon@tester.tes', status: 'registrado'},
  {id: 4, name: 'Sodium', rut: '987654', phone: '569987654', email: 'Sodium@tester.tes', status: 'validado'},
  {id: 5, name: 'Magnesium', rut: '987654', phone: '569987654', email: 'Magnesium@tester.tes', status: 'registrado'},
  {id: 6, name: 'Aluminum', rut: '987654', phone: '569987654', email: 'Aluminum@tester.tes', status: 'registrado'},
  {id: 7, name: 'Silicon', rut: '987654', phone: '569987654', email: 'Silicon@tester.tes', status: 'validado'},
];

/**
 * Data source for the UsersTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UsersTableDataSource extends DataSource<UsersTableItem> {
  // data: UsersTableItem[] = EXAMPLE_DATA;
  data: UsersTableItem[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private apiService: ApiService) {
    super();
  }

  loadUsers() {
    // this.data = EXAMPLE_DATA

    this.apiService.getUsers().subscribe((data: any) => {
      // console.log(data)
      this.data = data
    });

  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<UsersTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: UsersTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: UsersTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
