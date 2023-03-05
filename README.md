Reading List - Integrating Alexa with Spring
============================================
This repository contains three distinct projects that together
demonstrate how to integrate Alexa with a Spring API:

 - **auth-server** : A Spring authorization server.
 - **books-api** : A Spring-based API for managing a simple reading list.
 - **reading-list-skill** : A Node.js-based Alexa skill that consumes the books API and uses account linking to gain authorization for secured endpoints on the API.

See each individual project's README for details on running and using them. The README for reading-list-skill describes how to use all projects in concert together.

If there are problems...
------------------------
I've tested this dozens of times before deciding to push
to GitHub. It works as far as I can tell. But I acknowledge
that there may be something in the README instructions that
is poorly described or (worse) something in the code itself
that needs attention.

If you run into any trouble, then please create an issue or
create a pull request and I'll attend to it. Be aware that
this is an after-hours effort, so my ability to address any
issues will be on an as-time-allows arrangement.
