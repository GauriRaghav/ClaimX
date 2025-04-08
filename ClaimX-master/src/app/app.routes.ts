import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { UDashboardComponent } from './components/u-dashboard/u-dashboard.component';
import { PersonalInfoComponent } from './components/form/personal-info/personal-info.component';
import { IncidentDetailsComponent } from './components/form/incident-details/incident-details.component';
import { FnolDetailsComponent } from './components/form/fnol-details/fnol-details.component';
import { DamageAssessmentComponent } from './components/form/damage-assessment/damage-assessment.component';
import { PropertyDetailsComponent } from './components/form/property-details/property-details.component';
import { InsuranceDetailsComponent } from './components/form/insurance-details/insurance-details.component';
import { WitnessInfoComponent } from './components/form/witness-info/witness-info.component';
import { AdditionalInfoComponent } from './components/form/additional-info/additional-info.component';
import { FormSubmitComponent } from './components/form/form-submit/form-submit.component';
import { BankingInfoComponent } from './components/form/banking-info/banking-info.component';
import { ADashboardComponent } from './components/a-dashboard/a-dashboard.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { AuthWrapperComponent } from './components/auth-wrapper/auth-wrapper.component';
import { UNavbarComponent } from './components/u-navbar/u-navbar.component';
import { ANavbarComponent } from './components/a-navbar/a-navbar.component';
import { AInboxComponent } from './components/a-inbox/a-inbox.component';
import { ClaimListComponent } from './components/claim-list/claim-list.component';
import { AClaimListComponent } from './components/a-claim-list/a-claim-list.component';

export const routes: Routes = [

   {path: '', component: HomeComponent,}, //default to home
   {path: 'login', component: LoginComponent}, // login page
   //{path: 'login', component: AuthWrapperComponent}, // login page
   {path: 'signup', component:SignupComponent}, //signup
   {path: 'about-us', component:AboutUsComponent},// about-us
   {path: 'u-dashboard', component:UDashboardComponent},// user dashboard
   {path: 'a-dashboard', component:ADashboardComponent},// adjuster dashboard
   {path: 'personal-info', component:PersonalInfoComponent},// form personal-information
   {path: 'incident-details', component:IncidentDetailsComponent},//form incident-details
   {path: 'fnol-details', component:FnolDetailsComponent},// form first notice of loss
   {path: 'damage-assessment', component:DamageAssessmentComponent}, //damage assessment
   {path: 'property-details', component:PropertyDetailsComponent}, // property details 
   {path: 'insurance-details', component:InsuranceDetailsComponent}, //insurance details 
   {path: 'witness-info', component:WitnessInfoComponent}, //Witness Info
   {path: 'additional-info', component:AdditionalInfoComponent}, //Additional Info 
   {path: 'form-submit', component:FormSubmitComponent},//form submission
   {path: 'banking-info', component:BankingInfoComponent},//banking information
   {path: 'progress-bar', component:ProgressBarComponent},//progress information
   {path: 'u-navbar', component:UNavbarComponent},//progress information
   {path: 'a-navbar', component:ANavbarComponent},//Adjuster's Navbar
   { path: 'a-inbox', component: AInboxComponent }, //adjuster's Inbox
   {
    path: 'claims/:status',
    loadComponent: () => import('./components/claim-list/claim-list.component').then(m => m.ClaimListComponent),
  },
  { path: '', redirectTo: 'claims/list', pathMatch: 'full' },
  {
    path: 'admin/claims',
    component: AClaimListComponent
  }
];
