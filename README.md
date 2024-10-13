# gpt-notes startup

## Elevator Pitch

Have you ever been using Chat GPT while working on a project and wanted to go back and see a previous query? You may have found Chat GPT's query history search functionality to be clunky, or you may have found yourself scrolling up and down through a chat looking for an answer again. GPT-Notes allows you to create folders and whiteboards to organize your Chat GPT query results. Make a folder for a project, with named whiteboards for sub-sections of the project. Within each whiteboard you can click anywhere to query Chat GPT or make your own notes in a draggable, resizeable textbox. Search your folders to find past query results. Maneuver the important information where you need it and even edit Chat GPT's responses later to show only what you need.

## Design
![Screenshot of how GPT-Notes might look when finished; it shows a user logged in and their project, the whiteboard they're using, a query and its response from Chat GPT, and a note the user made](gpt-notes_design.PNG)

## Key Features
* Secure login over HTTPS
* Ability to create folders that can contain whiteboards
* Ability to create whiteboards
* Ability to send queries, get responses from Chat GPT, and make notes using draggable textboxes in a whiteboard
* Folders, whiteboards, queries, results, notes, (and their positions within a whiteboard) are persistently stored

## Technologies
I am going to use the required technologies in the following ways:
* HTML - Uses correct HTML structure for application. Three HTML pages. One for login, one for notes/querying, one for sending your notes to another user for sharing.
* CSS - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
* React - Provides login, folder and whiteboard creation, textbox creation & dragging for queries and notes, and use of React for routing and components.
* Web Services - Backend service with endpoints for:
  * login
  * retrieving folders, whiteboards, queries/results, and notes
  * querying Chat GPT w/API
* DB/Login - Store users, folders, whiteboards, queries/results, notes, and their positions within a whiteboard in database. Register and login users. Credentials securely stored in database. Can't query unless authenticated.
* WebSocket - When a user updates a shared whiteboard, shared users can see it as it's updated live.


# HTML deliverable
## Webpages
The following webpages were added:
- about.html
  - includes text for info about the product
- index.html
  - homepage with login
- notes.html
  - page to view Notebooks, Folders, and Pages
- share-notes.html
  - page to share a Notebook with someone

# CSS deliverable
## Webpages
The following webpages were added:
- about.html
  - added CSS for header and text
  - dark theme
- index.html
  - added CSS for header and text
  - added image, CSS for image
  - added CSS for login input boxes, buttons, nav
  - dark theme
- notes.html
  - removed the Notebooks section
  - added CSS for header and text
  - added extensive CSS for the Folders and Pages section
    - dark theme
  - added extensive CSS for the textarea in the Current Page section
    - textarea is resizeable in both directions
    - dark theme
- share-notes.html
  - added CSS for header and text
  - added CSS for email input to share
  - dark theme