import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class VerchatsService {

  URL: string = 'http://localhost:3000';
  private token: string;

  constructor(
    private http: HttpClient, private router: Router
  ) { }
}
