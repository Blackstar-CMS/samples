Blackstar CMS Client Samples
===============

This repository contains a number of samples demonstrating the use of various Blackstar CMS clients. 

angular2-seed
-------------

The `angular2-seed` in this repository is a modified version of the [Angular teams standard sample for Angular2](https://github.com/angular/angular2-seed).

It has been modified to populate the Home page with content sourced from Blackstar CMS. 

### Running the Blackstar CMS angular2 demo

1. Clone this repo and change to the angular2-seed directory

1. Start the server

    `npm start`
  
1. Point a browser at http://localhost:3000

### Steps used to integrate angular2 and Blackstar CMS

1. Add the Blackstar CMS JavaScript Client
        
   `npm install blackstar-cms-client`
   
1. Add a typescript definition file ([blackstar-cms-client.d.ts](https://github.com/Blackstar-CMS/samples/blob/master/angular2-seed/src/app/components/home/blackstar-cms-client.d.ts)) for Blackstar CMS JavaScript client (included in the npm package).

1. Remove the hard coded content from [home.html](https://github.com/Blackstar-CMS/samples/blob/master/angular2-seed/src/app/components/home/home.html) and add `data-blackstar-name` attributes with appropriate names:

    ```html
    <h3 data-blackstar-name="home-title"></h3>
    <p data-blackstar-name="home-content"></p>
    ``` 

1. Create the content in the [Blackstar CMS admin portal](http://demo.blackstarcms.net)

1. Modify the [Home](https://github.com/Blackstar-CMS/samples/blob/master/angular2-seed/src/app/components/home/home.ts) component to reference the type definition file and fetch content from Blackstar CMS and bind it to the UI:

    ```JavaScript
    /// <reference path="blackstar-cms-client.d.ts" />

    ...
    
    export class Home {
        constructor() {
            var blackstar = new Blackstar.Client('http://demo.blackstarcms.net/', { showEditControls: true });
            blackstar.get({ tags: ['angular2-seed-demo'] }).then(function (chunks) {
                blackstar.bind(chunks);     // bind by matching data-blackstar-name values to chunk names 
            });
        }
    }
    ```


 