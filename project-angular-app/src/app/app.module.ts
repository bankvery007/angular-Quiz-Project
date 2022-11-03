import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { NewquizComponent } from './components/newquiz/newquiz.component';
import { FilterPipe } from './filter.pipe';
import { SignupComponent } from './components/signup/signup.component';
import { QuestionComponent } from './components/question/question.component';
import { ResultComponent } from './components/result/result.component';
import { SigninComponent } from './components/signin/signin.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ChangeBgDirective } from './change-bg.directive';
import { HttpClientModule } from '@angular/common/http';
import { HistoryComponent } from './components/history/history.component';
import { ProfilemodalComponent } from './components/profilemodal/profilemodal.component';
import { SatisfiedComponent } from './components/satisfied/satisfied.component';
import { MyquizComponent } from './components/myquiz/myquiz.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    QuizComponent,
    NewquizComponent,
    FilterPipe,
    SignupComponent,
    QuestionComponent,
    ResultComponent,
    SigninComponent,
    WelcomeComponent,
    ChangeBgDirective,
    HistoryComponent,
    ProfilemodalComponent,
    SatisfiedComponent,
    MyquizComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
