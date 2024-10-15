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
<img src="https://github.com/lhalcomb/Kiip/blob/main/UseCaseDiagram.jpg" width="350" height="300" />

This diagram represents the following user stories:
 
* I want to create an account and login, so I know my information is personalized to me.
* I want to input my expenses and income to keep track of my spending metrics.
* I want to view my weekly, monthly, and yearly spending averages, to reduce unnecessary costs.
* I want to view my weekly, monthly, and yearly income averages, to find out how much money I should expect to make in a given time period.
* I want to keep track of frequent spending patterns to find out my biggest expenses throughout a time period.
* I want to view and cancel my monthly subscriptions. 
* I want to add bank account balances to keep track of my actual net worth.

<div name="nonfunctional-requirements">
  <h3>Nonfunctional Requirements</h3>
</div>
The following nonfunctional requirements will be satisfied.

* A user will be able to use this app on Android and iOS devices
* A user will be able to input their data in a user-friendly interface
* A user will be able to manipulate and view their data in a user-friendly interface
* The app is free to use for the user

<div name="security-requirements">
  <h3>Security Requirements</h3>
</div>
The following security requirements will be satisfied.

* Data exchanged between the User and the KiiP system will be encrypted. This mainly applies to the app login use case (i.e. passwords)
* Scripts will not be allowed in user input. This applies to the following use case - Input expenses and income.

<div name="technology-plan">
  <h2>Technology Plan</h2>
</div>
The following technology plan lists potential technologies to be used in the creation of our application and a personal experience rating for each technology.

| Technology | Experience Rating |
|------------|-------------------|
| Mobile App Technologies | Small Scale|
| Application and Web Development | Moderate|
| HTML 5 | Moderate |
| Javascript | Moderate |
| CSS | Moderate |
| SQL | Moderate |
| Typescript| Moderate |
| React Native Framework | Tutorial |
| Web Server Scripting | Moderate |
| Microsoft ASP.NET | Small Scale |
| Azure | None |
| AWS | None |
| MySQLWorkbench | Small Scale|
| Expo | Tutorial | 

## Risk Analysis

<div name="technical-risk-by-business-goal">
 <h3>Technical Risk by Business Goal</h3>
</div>

The following technical risks and business goals have been identified and prioritized.

| ID | Technical Risk | Business-Users | Business-Value |
|----|----------------|----------------|----------------|
| Tech-R-1 | Limited experience developing mobile apps. | H | H |
| Tech-R-2 | Limited experience with Web Dev. Frameworks, such as React, NextJS, ASP.NET & Databases like AWS or Azure | H | H |
| Tech-R-4 | Time for the developer to work on the project is limited due to the demands of their class schedule | - | H |
| Tech-R-5 | Inadequate testing does not cover requirements | M | L |

<div name="risk-mitigation-plan">
  <h3>Risk Mitigation Plan</h3>
</div>

The following risk mitigation plan will help us to address and mitigate these risks to the extent possible.
 
| ID | Risk | Mitigation |
|----|------|------------|
| Tech-R-1 | Limited experience developing mobile apps. | Schedule for and work through online tutorials. Ask questions |
| Tech-R-2 | Limited experience with Web Dev. Frameworks, such as React, NextJS, ASP.NET & Databases like AWS or Azure | Further research and practice with the frameworks and databases|
| Tech-R-4 | Time for the developer to work on the project is limited due to the demands of their class schedule | Work with instructor to keep up to date with what needs done and what  can be done in the time available. |
| Tech-R-5 | Inadequate testing does not cover requirements | Make tests a priority,  and make sure to test all requirements. Utitlize Automated testing tools|

<div name="effort-estimate">
 <h2>Effort Estimate</h2>
</div>

The following effort estimate has been calculated using NOP (nominal object points) using the following categories of work to be done - screens, reports (none), and 3GL components.

| Artifacts | Complexity | 1-3 (Difficulty) |
|-----------|------------|---------------|
| **Screens** |  | 12 | 
| Login | Simple | 1 |  
| Create Account | Moderate | 2 | 
| Metrics | Hard | 3 | 
| Subscritptions | Moderate | 2 | 
| Transactions  | Moderate | 2 | 
| Entry | Moderate | 2 | 
| 
| **3GL Components** | | 8.5 | 
| Database Connections | Moderate | 2 | 
| React Native | Semi-Moderate | 1.5 | 
| Expo | Simple | 1 | 
| Azure | Hard | 3 | 
| BCrypt | Simple | 1 | 
| 
| **Total Difficulty Points** | | 20.5 | 



<div name="architectural-design">
 <h2>Architectural Design</h2>
</div>
The following deployment diagram represents the architectural (high-level) design of the ODHKr application.

![image](https://raw.githubusercontent.com/wildharpo/ozarks-day-hiker-app/refs/heads/main/Documents/Diagrams/DeploymentDiagram.jpg)

The basic architecture of the ODHKr app has four components: a component that runs on a mobile device, a map server, an administrative component, and a server component. Components will communicate over the Internet. The details of the architecture are specified in Figure 7.5. Notice that the administrative componet-server component communication is specified at two levels. The devices communicate using the Internet while the browser and the web server communicate using the http protocol.
