<a name="module_Blackstar"></a>

## Blackstar
Blackstar module.


* [Blackstar](#module_Blackstar)
    * [~Client](#module_Blackstar..Client)
        * [new Client(url, options)](#new_module_Blackstar..Client_new)
        * [.get(request)](#module_Blackstar..Client+get) ⇒ <code>Array</code>
        * [.urlFor(chunk)](#module_Blackstar..Client+urlFor) ⇒ <code>string</code>
        * [.addEditLinks()](#module_Blackstar..Client+addEditLinks)
        * [.addToolbox()](#module_Blackstar..Client+addToolbox)

<a name="module_Blackstar..Client"></a>

### Blackstar~Client
**Kind**: inner class of <code>[Blackstar](#module_Blackstar)</code>  

* [~Client](#module_Blackstar..Client)
    * [new Client(url, options)](#new_module_Blackstar..Client_new)
    * [.get(request)](#module_Blackstar..Client+get) ⇒ <code>Array</code>
    * [.urlFor(chunk)](#module_Blackstar..Client+urlFor) ⇒ <code>string</code>
    * [.addEditLinks()](#module_Blackstar..Client+addEditLinks)
    * [.addToolbox()](#module_Blackstar..Client+addToolbox)

<a name="new_module_Blackstar..Client_new"></a>

#### new Client(url, options)
A Blackstar CMS client.


| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | the url of the blackstar server. E.g. http://localhost:2999 |
| options | <code>object</code> | an options object with type `{ showEditControls: boolean }` |

<a name="module_Blackstar..Client+get"></a>

#### client.get(request) ⇒ <code>Array</code>
Query for content chunks. Request can be by ids OR by tags OR by names.

**Kind**: instance method of <code>[Client](#module_Blackstar..Client)</code>  
**Returns**: <code>Array</code> - A collection of chunks.  

| Param | Type | Description |
| --- | --- | --- |
| request | <code>object</code> | an object specifying the query to perform. |

**Example**  
```js
client.get({ ids: [1,2,3] });
```
**Example**  
```js
client.get({ names: ['heading','footer'] });
```
**Example**  
```js
client.get({ tags: ['blackstarpedia','english'] })Querying by ids or by names is an OR query. I.e get the chunks with the name 'heading' or 'footer'. Querying by tags is an AND query. I.e. get the chunks with tags 'blackstarpedia' and 'english'.
```
<a name="module_Blackstar..Client+urlFor"></a>

#### client.urlFor(chunk) ⇒ <code>string</code>
Build the edit url for a chunk. Useful when implementing your own binding of content to UI, e.g. when binding content via Angular or React.

**Kind**: instance method of <code>[Client](#module_Blackstar..Client)</code>  
**Returns**: <code>string</code> - the full edit url for chunk.  

| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>object</code> | the chunk to be edited. |

<a name="module_Blackstar..Client+addEditLinks"></a>

#### client.addEditLinks()
Adds edit links to all DOM elements having an attribute `data-blackstar-id` containing a chunk id. The hyperlink added to each element has the css class `blackstar-edit-link` to allow styling.**Normally you don't need to call this function because it is called within `bind`.** It is exposed for the benefit of those manually binding their content without using the `bind` method.

**Kind**: instance method of <code>[Client](#module_Blackstar..Client)</code>  
**Example**  
```js
<div data-blackstar-id="123"></div>
```
<a name="module_Blackstar..Client+addToolbox"></a>

#### client.addToolbox()
Adds the blackstar toolbox to the page. **Normally you don't need to call this function because it is called within `bind`.** It is exposed for the benefit of those manually binding their content without using the `bind` method.

**Kind**: instance method of <code>[Client](#module_Blackstar..Client)</code>  
