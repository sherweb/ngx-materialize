import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss'],
})
export class CodeSnippetComponent implements AfterViewInit {
  @Input() language: string;
  @ViewChild('codeSample') codeSample: ElementRef;

  ngAfterViewInit(): void {
    // remove start/ending whitespaces
    this.codeSample.nativeElement.innerHTML = this.codeSample.nativeElement.innerHTML.trim();
    // hightlight code block
    hljs.highlightBlock(this.codeSample.nativeElement);
  }
}
