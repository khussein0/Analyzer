import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterComponent } from '../core/filter/filter.component';
import { Agent, Call, CallType, CallDetail } from './models';
@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.scss']
})
export class AnalyzerComponent implements OnInit {
  @Input() agents: Agent[] = []
  @Input() calls: Call[] = []
  @Input() callTypes: CallType[] = []
  @Input() callDetails: CallDetail
  @Output() agentSelected = new EventEmitter<Filter>()
  @Output() callTypeSelected = new EventEmitter<Filter>()
  @Output() callSelected = new EventEmitter<Filter>()
  filterModel = new Filter()

  constructor() { }

  ngOnInit() {
    
  }

  agentStd() {
    this.agentSelected.emit(this.filterModel)
  }

  callStd() {
    this.filterModel.sensitivity = '38'
    this.callSelected.emit(this.filterModel)
  }

  getCustomerFirstName() {
    if(this.callDetails && this.callDetails.customer.length)
    return this.callDetails.customer[0].full_name.split(' ')[0]
  }

  getAgentFirstName() {
    if(!this.callDetails || !this.callDetails.agent) return
    const agent = this.agents.find(c => c.agent_id == this.filterModel.agent_id)
    return agent && agent.full_name.split(' ')[0]
  }

  getPercentageScriptCovered() {
    let count = 0
    this.callDetails.script.forEach(item => {
      ((+item.similarity)*100 >= +this.filterModel.sensitivity) && count++
    })
    return Math.floor((count/this.callDetails.script.length)*100);
  }

  getPercentageTranscriptCovered() {
    let count = 0
    this.callDetails.transcript.forEach(item => {
      (item.channel == '1' && (+item.similarity)*100 >= +this.filterModel.sensitivity) && count++
    })
    return Math.floor((count/this.callDetails.transcript.length)*100);
  }
}

export class Filter {
  agent_id: string = ''
  calltype_id: string = 'All';
  call_id: string
  sensitivity: string = '38'
}

