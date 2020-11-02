import { Component, OnInit, Input } from '@angular/core';
import { Transcript, CallDetail, Script } from '../models';
import { Filter } from '../analyzer.component';

@Component({
  selector: 'app-transcript',
  templateUrl: './transcript.component.html',
  styleUrls: ['./transcript.component.scss']
})
export class TranscriptComponent implements OnInit {
  @Input() callDetail: CallDetail
  @Input() filterModel: Filter
  @Input() speakerFirstName: string = ''
  @Input() agentFirstName: string = ''

  constructor() { }

  ngOnInit() {
    
  }

  getTimeString(seconds) {
    let mod = Math.floor(seconds%60).toString()
    if(mod.length == 1) mod = '0'+mod
    return `${Math.floor(seconds/60)}:${mod}`
  }

  shouldHighlight(item: Transcript) {
    const matches = item.channel == '1' && item.matching_sentence && (+item.similarity)*100 >= +this.filterModel.sensitivity
    return matches
  }

  shouldHighDark(element: HTMLParagraphElement, item: Transcript) {
    const similar = item.channel == '1' && item.matching_sentence && (+item.similarity)*100 >= +this.filterModel.sensitivity
    if(similar) {
      element.classList.add('highdark')
    }
  }

  highlight(element: HTMLParagraphElement, item: Transcript) {
    if(this.shouldHighlight(item)) {
      element.classList.add('highlight')
    }
  }

  getTooltipText(item: Transcript) {
    return `${Math.floor(+item.similarity*100)}% matching with line 
    #${this.getMatchingIndex(item.matching_sentence)} "${item.matching_sentence}"`
  }

  getMatchingIndex(sentence: string) {
    return (this.callDetail.script.findIndex(c => c.sentence == sentence)) + 1
  }

}
