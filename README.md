<h1>Free Code Camp Microservice: Image Search Layer</h1>
<p>Want to run locally? Message me for env vars.</p>
<p>User stories:</p>
<ul>
    <li>I can get the image URLs, alt text and page urls for a set of images relating to a given search string.</li>
    <li>I can paginate through the responses by adding a ?offset=[NUMBER] parameter to the URL.</li>
    <li>I can get a list of the 10 most recently submitted search strings.</li>
</ul>
<h2>Search</h2>
<code>https://jc-fcc-img-search.herokuapp.com/?q=YourQuery&offset=1</code>

<strong>Params</strong>  
<strong>q</strong> - Takes a search query as a URL encoded string.  
<strong>offset</strong> - Takes a number to paginate the query results.

<h2>View Recent Searches</h2>
<code>https://jc-fcc-img-search.herokuapp.com/recent</code>
