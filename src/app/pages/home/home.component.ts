import { Component, OnInit } from '@angular/core';
import { IsisterService } from '../../_services/isister.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private isister: IsisterService) { }

  ngOnInit(): void {
    this.isister.getPets().subscribe({
      next:(data) => {
        console.log(data);
      }, 
      error:(error) => {
        console.log(error.message);
      }
    })
  }

}
