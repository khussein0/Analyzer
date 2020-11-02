import { Component, OnInit, Input } from '@angular/core';
import { Script, Transcript, CallDetail } from '../models';
import { Filter, } from '../analyzer.component';

@Component({
  selector: 'app-script',
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.scss']
})
export class ScriptComponent implements OnInit {
  @Input() script: Script[]
  @Input() filterModel: Filter
  @Input() callDetail: CallDetail

  constructor() { }

  ngOnInit() {
    
  }

  calcPercentages() {

  }
  
  shouldHighlight(item: Script) {
    const matches = (+item.similarity)*100 >= +this.filterModel.sensitivity
    return matches
  }

  shouldHighDark(element: HTMLParagraphElement, item: Script) {
    const similar = (+item.similarity)*100 >= +this.filterModel.sensitivity
    if(similar) {
      element.classList.add('highdark')
    }
  }

  highlight(element: HTMLParagraphElement, item: Script) {
    if(this.shouldHighlight(item)) {
      element.classList.add('highlight')
    }
  }

  getTooltipText(item: Transcript) {
    return `${Math.floor(+item.similarity*100)}% matching with sentence "${item.matching_sentence}" on time ${this.getTimeString(item)}`
  }

  getTimeString(item: Script) {
    const transcript: Transcript = this.callDetail.transcript.find(c => c.sentence == item.matching_sentence)
    if(!transcript) return;
    let mod = Math.floor(+transcript.timeFrom%60).toString()
    if(mod.length == 1) mod = '0'+mod
    return `${Math.floor(+transcript.timeFrom/60)}:${mod}`
  }

}
