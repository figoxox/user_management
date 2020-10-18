import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {
  public email: string;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private apiService: ApiService
    ) { 
    this.activatedRoute.queryParams.subscribe(params => {
      let token = params['token'];

      this.apiService.confirmEmail(token).subscribe((data) => {
        this.email = data['email']
      });
  });
  }

  ngOnInit(): void {
  }

}
