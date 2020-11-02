import { Component, OnInit } from '@angular/core';
import { AnalyzerService } from '../services/analyzer.service';
import { Agent, Call, CallType, CallDetail } from '../models';
import { Observable, of } from 'rxjs';
import { Filter } from '../analyzer.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-analyzer-container-component',
  template: `
    <app-header></app-header>
    <app-analyzer
    [agents]="agents$ | async"
    [callDetails]="callDetails$ | async"
    [calls]="calls$ | async"
    [callTypes]="callTypes$ | async"

    (agentSelected)="agentSelected($event)"
    (callSelected)="callSelected($event)"
    (callTypeSelected)="callTypeSelected($event)"
    ></app-analyzer>  
  `,
  styles: [`
    :host {
        display: flex;
        min-height: 100%;
        flex-direction: column;
    }
  `]
})
export class AnalyzerContainerComponent implements OnInit {
  agents$: Observable<Agent[]> = of([])
  calls$: Observable<Call[]> = of([])
  callTypes$: Observable<CallType[]> = of([])
  callDetails$: Observable<CallDetail>

  constructor(private _analyzer: AnalyzerService) { }

  ngOnInit() {
    this.loadAgents()
  }

  loadAgents() {
    this.agents$ = this._analyzer.getAgents()
    this.callTypes$ = this._analyzer.getCallTypes()
  }

  agentSelected(filterModel: Filter) {
    this.getCalls(filterModel.agent_id, filterModel.calltype_id)
  }

  callSelected(filterModel: Filter) {
    this.callDetails$ = this._analyzer.getCallDetail(filterModel.call_id, filterModel.agent_id, filterModel.calltype_id)
  }

  callTypeSelected(filterModel: Filter) {
    if(filterModel.agent_id) this.getCalls(filterModel.agent_id, filterModel.calltype_id)
  }

  getCalls(agentId, calltypeId) {
    this.calls$ = this._analyzer.getCalls(agentId, calltypeId)
  }

}
