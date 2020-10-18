import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ApiService } from 'src/app/api.service';
import { UsersTableDataSource, UsersTableItem } from './users-table-datasource';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<UsersTableItem>;
  dataSource: UsersTableDataSource;
  dataLength: number;

  displayedColumns = ['id', 'name', 'rut', 'phone', 'email', 'status'];

  constructor(
    private apiService: ApiService) {

  }

  ngOnInit() {
    this.dataSource = new UsersTableDataSource(this.apiService);
    this.loadUsers();
  }

  ngAfterViewInit() {
  }

  loadUsers() {
    this.apiService.getUsers().subscribe((data: any) => {
      this.dataSource.data = data
      
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      this.dataLength = this.dataSource.data.length;
    });
  }
}
