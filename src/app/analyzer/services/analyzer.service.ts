import { Injectable } from '@angular/core';
import * as mockData from '../../shared/mock-data'
import { of, Observable } from 'rxjs';
import { Agent, Call, CallDetail, CallType } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AnalyzerService {

  constructor() { }

  getAgents(): Observable<Agent[]> {
    return of(JSON.parse(mockData.agents))
  }

  getCalls(agentId, callTypeId): Observable<Call[]> {
    return of(JSON.parse(mockData.calls))
  }

  getCallDetail(callId, agentId, calltypeId): Observable<CallDetail> {
    return of(JSON.parse(mockData.callDetail))
  }

  getCallTypes(): Observable<CallType[]> {
    return of(JSON.parse(mockData.callTypes))
  }

}
