# System Inception

## Table of Contents
* Requirements
  * [Functional Requirements](#functional-requirements)
  * [Nonfunctional Requirements](#nonfunctional-requirements)
  * [Security Requirements](#security-requirements)
* [Technology Plan](#technology-plan)
* Risk Analysis
  * [Technical Risk by Business Goal](#technical-risk-by-business-goal)
  * [Risk Mitigation Plan](#risk-mitigation-plan)
* [Effort Estimate](#effort-estimate)
* [Architectural Design](#architectural-design)

## Requirements

<div name="functional-requirements">
  <h3>Functional Requirements</h3>
</div>
The following actors and use cases are identified for the KiiP (Key Investment & Income Planner)

#### Actors
| Actor | Description |
|-------|-------------|
| User | A *User* is a person who uses the app to input and view finance metrics. |

#### Use Cases
![image]()

This diagram represents the following user stories:



<div name="nonfunctional-requirements">
  <h3>Nonfunctional Requirements</h3>
</div>
The following nonfunctional requirements will be satisfied.

* 
* 
* 
<div name="security-requirements">
  <h3>Security Requirements</h3>
</div>
The following security requirements will be satisfied.

* 
*

<div name="technology-plan">
  <h2>Technology Plan</h2>
</div>
The following technology plan lists potential technologies to be used in the creation of our application and a personal experience rating for each technology.

| Technology | Experience Rating |
|------------|-------------------|
| Mobile App Technologies | |
| iOS | None |
| Android | Tutorial |
| Cordova | Small Scale |
| Windows 10 Phone | None |
| Map Technologies | |
| Google Maps | Tutorial |
| Bing Maps | None |
| Open Layers Maps | None |
| Open Street Maps | None |
| Application and Web Development | |
| Java | Extensive |
| Swift | None |
| HTML 5 | Moderate |
| Javascript | Moderate |
| jQuery Mobile | Small Scale |
| Bootstrap Framework | Tutorial |
| Iconic Framework | None |
| Web Server Scripting | |
| PHP | Small Scale |
| Microsoft ASP.NET | Extensive |

## Risk Analysis

<div name="technical-risk-by-business-goal">
 <h3>Technical Risk by Business Goal</h3>
</div>

The following technical risks and business goals have been identified and prioritized.

| ID | Technical Risk | Business-Market | Business-Users | Business-Value |
|----|----------------|-----------------|----------------|----------------|
| Tech-R-1 | Limited experience developing mobile apps. | - | H | H |
| Tech-R-2 | No experience accessing the GPS in a mobile app | - | H | H |
| Tech-R-3 | Implementing offline map and GPS access is not the normal mode of map operation for a mobile app | M | H | H |
| Tech-R-4 | Tools needed to conduct the project such as the IDE, Visual Paradigm, Bitbucket, Markdown, and Git are new | M | H | H |
| Tech-R-5 | Time for the developer to work on the project is limited due to the demands of their class schedule | M | - | - |
| Tech-R-6 | Inadequate testing does not cover requirements | L | - | - |
| Tech-R-7 | The app is susceptible to cross-site scripting attacks | M | - | - |

<div name="risk-mitigation-plan">
  <h3>Risk Mitigation Plan</h3>
</div>

The following risk mitigation plan will help us to address and mitigate these risks to the extent possible.
 
| ID | Risk | Mitigation |
|----|------|------------|
| Tech-R-1 | Limited experience developing mobile apps. | Schedule for and work through online tutorials |
| Tech-R-2 | No experience accessing the GPS in a mobile app | Schedule for and work through online tutorials |
| Tech-R-3 | Implementing offline map and GPS access is not the normal mode of map operation for a mobile app | Search for information and tutorials on offline map access |
| Tech-R-4 | Tools needed to conduct the project such as the IDE, Visual Paradigm, Bitbucket, Markdown, and Git are new | Schedule time in the schedule to learn these tools using tutorials found online |
| Tech-R-5 | Time for the developer to work on the project is limited due to the demands of their class schedule | Explicitly use a calendar to plan daily schedules allocating spcific time periods to work on the project |
| Tech-R-6 | Inadequate testing does not cover requirements | Utilize automated testing tools. Make testing a priority activity |
| Tech-R-7 | The app is susceptible to cross-site scripting attacks | Follow the OWASP guidelines for preventing cross-scripting attacks and the OWASP testing protocol |



<div name="effort-estimate">
 <h2>Effort Estimate</h2>
</div>

The following effort estimate has been calculated using NOP (nominal object points) using the following categories of work to be done - screens, reports (none), and 3GL components.

| Artifacts | Complexity | Object Points | Notes |
|-----------|------------|---------------|-------|
| **Screens** | | | |
| Browse Hikes | Simple | 1 | Screen will be constructed by reading hike locations & names from a data source |
| Explore Hikes | Medium | 2 | Screen will have several components drawing data from different sources |
|    Sub-screens | | | |
|    Read About | Simple | 1 | Simple text with some images in the screen |
|    View Hike | Medium | 2 | Must position on a map and allow for zoom with different sized devices |
|    Driving Directions | Simple | 1 | Will have to query map server to get the directions |
|    Watch Video | Simple | 1 | Embedded video viewer |
|    Leave Comment | Simple | 1 | Simple input of text |
|    Read Comments | Simple | 1 | Simple display of text extracted from data table |
|    View on Google Earth | Simple | 1 | Simple linke, but will require scripting for Google Earth |
| Setup Hike Mode | Simple | 1 | Simple screen |
| GPS Trail Guide | Medium | 2 | Complex screen drawing from multiple local data sources |
| Create Trail Entry | Simple | 1 | Simple data entry screen |
| Edit Trail Entry | Simple | 1 | Simple data update |
| *Screen Total* | | 16 | |
| **3GL Components** | | | |
| Map Components | 2 @ 10 | 20 | Map interaction and hike data management components |
| Google Earth Interaction | 1 | 10 | Component to link hike to Google Earth |
| Standalone GPS Mode | 1 | 10 | Component to manage map and data in standalone GPS mode |
| Server Components | 2 @ 10 | 20 | Server-side scripts for managing mobile interaction and hike data |
| **Total Object Points** | | 76 | |


<div name="architectural-design">
 <h2>Architectural Design</h2>
</div>
The following deployment diagram represents the architectural (high-level) design of the ODHKr application.

![image](https://raw.githubusercontent.com/wildharpo/ozarks-day-hiker-app/refs/heads/main/Documents/Diagrams/DeploymentDiagram.jpg)

The basic architecture of the ODHKr app has four components: a component that runs on a mobile device, a map server, an administrative component, and a server component. Components will communicate over the Internet. The details of the architecture are specified in Figure 7.5. Notice that the administrative componet-server component communication is specified at two levels. The devices communicate using the Internet while the browser and the web server communicate using the http protocol.
