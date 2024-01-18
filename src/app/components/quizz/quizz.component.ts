import { RouterOutlet } from '@angular/router';

import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import quizz from './../../../assets/data/quizz.questions.json';
import { cp } from 'fs';

@Component({
   selector: 'app-quizz',
   standalone: true,
   imports: [CommonModule, RouterOutlet, NgFor],
   templateUrl: './quizz.component.html',
   styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit {
   actualQuestion: string = "";
   title: string = "";
   questions: any = {};
   idQuestion: number = 0;
   quizzStarted: boolean;
   userAnswer: Array<number>;
   answersQuiz: Array<number> = [];
   finished: boolean;
   character: any;
   constructor() {
      this.quizzStarted = false;
      this.finished = false;
      this.userAnswer = [];
      this.character = {
         name: "",
         img: ""
      }
      this.character.name = "",
         this.character.img = ""
   }

   ngOnInit(): void {
      if (quizz) {
         this.title = quizz.title;
         this.actualQuestion = quizz.questions[0].question;
         this.idQuestion = 0;
         this.questions = quizz.questions[0].response;
      }
   }

   startGame(): void {
      setTimeout(() => {
         this.quizzStarted = true;
      }, 1000);
   }

   nextStep(option: number): void {
      this.answersQuiz.push(option);
      if ((quizz.questions.length > this.idQuestion + 1) ) {
         this.idQuestion += 1;
         this.actualQuestion = quizz.questions[this.idQuestion].question;
         this.questions = quizz.questions[this.idQuestion].response;

      } else {
         this.finished = true;
         this.matchCharacter();
      }

   }

   matchCharacter(): void {

      let comparacao: Array<number> = [];
      let personagemMaisSeEnquadra = 0;
      
      for (let characterA = 0; characterA < 8; characterA++) {
         let answersMatch = 0;
         
         for (let answerU = 0; answerU < 6; answerU++) {            
            if (this.answersQuiz[answerU] == quizz.characters[characterA].answers[answerU]) {               
               answersMatch +=1;
            }
         }
         comparacao.push(answersMatch);
      }
      
      let count:number = 0;
      for (let i = 0; i < comparacao.length; i++){
         if (comparacao[i] > count) {
            count = comparacao[i];
            personagemMaisSeEnquadra = i;
         }
      }

      this.character.name = quizz.characters[personagemMaisSeEnquadra].name;
      this.character.img = quizz.characters[personagemMaisSeEnquadra].img;
   }

}


