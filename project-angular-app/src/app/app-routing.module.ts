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
import { MyquizComponent } from './components/myquiz/myquiz.component';
import { HistoryPlayingComponent } from './components/history-playing/history-playing.component';
import { AuthService } from './auth/auth.service'
import { AuthGuard } from './auth/auth.guard'

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: WelcomeComponent},
  {path: 'newquiz', component: NewquizComponent, canActivate:[AuthGuard]},
  {path: 'quiz', component: QuizComponent, canActivate:[AuthGuard]},
  {path: 'question', component: QuestionComponent, canActivate:[AuthGuard]},
  {path: 'result', component: ResultComponent, canActivate:[AuthGuard]},
  {path: 'history', component: HistoryComponent, canActivate:[AuthGuard]},
  {path: 'profilemodal', component: ProfilemodalComponent, canActivate:[AuthGuard]},
  {path: 'myquiz', component: MyquizComponent, canActivate:[AuthGuard]},
  {path: 'history_playing', component: HistoryPlayingComponent, canActivate:[AuthGuard]},

  {path: '', 
    redirectTo: 'home', 
    pathMatch: 'full'          
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthService, AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
