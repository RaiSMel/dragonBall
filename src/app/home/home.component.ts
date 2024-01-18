import { QuizzComponent } from './../components/quizz/quizz.component';
import { HeaderComponent } from './../components/header/header.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, QuizzComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

}
