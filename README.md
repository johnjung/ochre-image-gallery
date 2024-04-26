# OchreImageGallery Component

This component produces a display of multiple images which can be styled to
appear as block level search results or as a grid. Test at URLs like:

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
 resultsPageInput={true}
 resultsPageInitial={page}
 resultsPerPageInput={true}
 resultsPerPageInitial={perPage}
 resultsPerPageOptions={[10, 20, 40]}
 showLabels={true}
 showLabelsInput={true}
 uuid={uuid}
/>
```

## Implementation Notes

I reviewed several commercial websites and several academic library catalogs to see
how a UI for paging is implemented.

Numbered links for result pages, in the form "1, 2, 3, 4, 5" and with links for the previous
and next page are a dominant pattern. The number of results per page is not always user
controllable, especially on commercial sites. Currently, Amazon.com and Etsy do not allow
web users to adjust the number of results per page.

When the number of results per page is user-controllable, my preference is for both a page
change and a change in the number of results per page to result in a change to URL
parameters, even if those changes are dynamically generated without a reload. This prioritizes
the URL bar as a part of the UI, and it makes it possible for users
to cut and paste URLs to save or share any view of the interface. Not all developers share
this approach, and there are high-profile websites that do not keep the URL up to date in
this way.

Deciding where to place different pieces of information in the URL is a related issue.
The UUID should be a part of the URL path (before the ?), and the page and number of results
per page should be encoded as parameters (after the ?). It's common to see values like this
as URL parameters, and it frees us up to be able to add new parameters for things like sorting
or filtering at a later date.

After reviewing different approaches, URLs in the form /&lt;uuid&gt;?page=1&per_page=100 seem clearest.

## Test Cases

Changes to the current page and number of results per page should be
reflected in the URL, even if the page is changed dynamically, without a reload.

### Sample Interaction

- The default is 10 results per page.
- An instructor browses the result set and selects 50 results per page.
- The instructor cuts and pastes the URL, expecting their students to see
  interesting result 11.
- Students click the link. They should see results 1-50, including interesting
  result 11.
