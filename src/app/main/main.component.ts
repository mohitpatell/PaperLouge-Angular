import { Component, OnInit } from '@angular/core';
import {BOOKS} from '../bookdetails';
import {book} from '../bookdetails';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  mybooks:book[]=BOOKS

  panelOpenState = false;
  constructor() { }

  ngOnInit() {
  }

 
}
