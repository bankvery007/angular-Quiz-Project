import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewquizComponent } from './components/newquiz/newquiz.component';
import { QuizComponent } from './components/quiz/quiz.component';



const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'newquiz', component: NewquizComponent},
  {path: 'quiz', component: QuizComponent},
  {path: '', 
    redirectTo: 'home', 
    pathMatch: 'full'          
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
