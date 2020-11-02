import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyzerComponent } from './analyzer.component';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { AnalyzerContainerComponent } from './analyzer-container/analyzer-container.component';
import { ScriptComponent } from './script/script.component';
import { TranscriptComponent } from './transcript/transcript.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home'},
  {path: 'home', component: AnalyzerContainerComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreModule,
    SharedModule
  ],
  declarations: [
    AnalyzerContainerComponent,
    AnalyzerComponent,
    TranscriptComponent,
    ScriptComponent
  ]
})
export class AnalyzerModule { }
