import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = '';
  @ViewChild('navigationContainer') navigationElement!: ElementRef<HTMLElement>;
  bodyElementMarginTop: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.bodyElementMarginTop.next(this.navigationElement.nativeElement.clientHeight);
    this.changeDetectorRef.detectChanges();
  }

}
