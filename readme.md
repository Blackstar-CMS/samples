Blackstar CMS Client Samples
===============

This repository contains a number of samples demonstrating the use of various [Blackstar CMS](http://blackstarcms.net/) clients. 

* [angular2-seed](#angular2-seed)
* [HTML via HTTP](#html-via-http)
* [HTML via the Blackstar CMS JavaScript Client](#html-via-the-blackstar-cms-javascript-client)

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

HTML via HTTP
------------

Blackstar CMS content is accessed via HTTP, so you don't need to use one of the clients. The sample [http-example.html](https://github.com/Blackstar-CMS/samples/blob/master/html/http-example.html) accesses Blackstar CMS using the browsers [fetch API](https://developer.mozilla.org/en/docs/Web/API/Fetch_API). JQuery's AJAX methods would also work well. 

HTML via the [Blackstar CMS JavaScript Client](https://www.npmjs.com/package/blackstar-cms-client)
-------------------------

[javascript-api-example.html](https://github.com/Blackstar-CMS/samples/blob/master/html/javascript-api-example.html) sample uses the Blackstar CMS JavaScript client to fetch content and bind it to the user interface.  

.NET (ASP.NET MVC)
------------------

Blackstar CMS content can be utilized by a server-side MVC framework like Asp.NET (or Ruby on Rails or Django or Express etc). 

### Steps used to integrate Asp.NET MVC and Blackstar CMS

1. Install the [Blackstar CMS .NET client](https://www.nuget.org/packages/Blackstar/1.0.0) from nuget

    `> Install-Package Blackstar`

1.  Within the MVC controller request the required content (e.g. all content with the 'blackstarpedia' tag).

    ```C#
    public async Task<ActionResult> Index()
    {
        var client = new BlackstarClient("http://demo.blackstarcms.net");
        var content = await client.GetByTagAsync("blackstarpedia");
        return View(HomeModel.FromContentChunks(content));
    }
    ```

1. Within the view place the content in the correct locations.

    ```
    <h2>@Html.Raw(Model.smallerHeading)</h2>
    ```

    Note the use of `Html.Raw` to prevent the content from being escaped. 
