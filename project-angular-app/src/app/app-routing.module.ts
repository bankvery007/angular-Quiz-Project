import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewquizComponent } from './components/newquiz/newquiz.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuestionComponent } from './components/question/question.component';
import { ResultComponent } from './components/result/result.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HistoryComponent } from './components/history/history.component';
import { ProfilemodalComponent } from './components/profilemodal/profilemodal.component';
import { NgswitchComponent } from './components/ngswitch/ngswitch.component';


const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: WelcomeComponent},
  {path: 'newquiz', component: NewquizComponent},
  {path: 'quiz', component: QuizComponent},
  {path: 'question', component: QuestionComponent},
  {path: 'result', component: ResultComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'profilemodal', component: ProfilemodalComponent},
  {path: 'ngswitch', component: NgswitchComponent},
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
