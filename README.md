# OchreImageGallery Component

This component produces a display of multiple images which can be styled to
appear as block level seearch results or as a grid. Test at the following URL:

```
http://localhost:3000/9c4da06b-f15e-40af-a747-0933eaf3587e
```

## Usage

```javascript
import OchreImageGallery from "OchreImageGallery";
```

```JSX
<OchreImageGallery
 className="imagegallery"
 uuid="9c4da06b-f15e-40af-a747-0933eaf3587e" 
 showLabels={true}
 showLabelsInput={true}
 numberOfResultsPerPage={10}
 numberOfResultsPerPageInput={true}
 numberOfResultsPerPageOptions={[10, 20, 40]}
/>
```

## Implementation Notes

I reviewed the way several commercial websites and several academic library
catalogs to see how a UI for changing the number of results per page was 
implemented. Currently, Amazon.com and Etsy do not allow web users to alter
the number of results per page. 

Of academic library websites, my preference is for URL parameters in the form
of /<uuid>?page=1&per_page=100. This seems understandable to site visitors, and
it provides "space" for us to be able to extend the interface to allow for
different kinds of searching, sorting or faceting through other URL parameters.

## Test Cases

Changes to the current page and number of results per page should be 
reflected in the URL. 

### Sample Interaction

- The default is 10 results per page.
- An instructor browses the result set and selects 50 results per page.
- The instructor cuts and pastes the URL, expecting their students to see
  interesting result 11.
- Students click the link, taking them to a search result page with only
  only 10 results.
