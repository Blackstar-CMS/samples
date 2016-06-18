import {Component} from '@angular/core';
//import * as Blackstar from 'blackstar-cms-client';
const Blackstar = require('blackstar-cms-client');

@Component({
  selector: 'home',
  templateUrl: 'app/components/home/home.html',
  styleUrls: ['app/components/home/home.css'],
  providers: [],
  directives: [],
  pipes: []
})
export class Home {
  constructor() {
    var blackstar = new Blackstar.Client('http://demo.blackstarcms.net/', { showEditControls: true });
    blackstar.get({ tags: ['angular2-seed-demo'] }).then(function (chunks) {
        blackstar.bind(chunks);     // bind by matching data-blackstar-name values to chunk names 
    });
  }
}
