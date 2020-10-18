import { Component, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent {
  public createUserForm: FormGroup;
  public isUserCreated: boolean;

  /** Based on the screen size, switch from standard to one column per row */
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 2},
          table: { cols: 1, rows: 4 },
        };
      }

      return {
        columns: 4,
        miniCard: { cols: 1, rows: 2},
        table: { cols: 4, rows: 4 },
      };
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private apiService: ApiService
    ) {}

  ngOnInit() {
    this.createUserForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      rut: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9kK\-]*$'),
      ]),
      phone: new FormControl(''),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
    });
  }

  createUser() {
    if (this.createUserForm.valid) {
      this.apiService.createUser(this.createUserForm.value).subscribe((data) => {
        this.isUserCreated = (data) ? true : false;
      });
    }
  }
}
