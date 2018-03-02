# RecruitApp

## Description
You have to create a recruitment site where users can login and look at job listings as well as apply to jobs. The site also allows employers to login and browse potential candidates as well as view candidates that have applied to their jobs. I have attached some images that display the kind of layout and ui we expect.

#### Login page:
Create a login page for users and another login page for employers. You should display appropriate error messages to users when invalid or bad credentials are entered.

#### User Dashboard:
When a user logs in, he should be taken to the user dashboard page. This page should have the following top level tabs: 
1. Dashboard: It should display a simple "Hello {user.name}" text.
2. Jobs: This page should have two tabs: Openings and Applied. 
    - The 'Openings' tab should display a list of jobs (via api call). Each job should display the company's logo and some info about the job along with an 'Apply' button (see attached image). Applying to a job should cause the job to disappear from this list.  
    - The 'Applied' tab should display a list of jobs that the user has applied to (via api call). It should have a button called 'Cancel' next to the job that will cancel the application and remove the job from this list. 

#### Employer Dashboard:
When an employer logs in, he should be taken to the employer dashboard page. This dashboard is similar to the user dashboard. It should contain the following top level tabs: 
1. Dashboard: It should display a simple "Hello {employer.name}" text.
2. Candidates: This page should have two tabs: Applicants and Users. 
    - The 'Applicants' tab should display a list of users that have applied to jobs posted by this employer (via api call). There should be a Reject button next to each applicant, rejecting an applicant should remove him from this list. 
    - The 'Users' tab should display a list of users (via api call).

You should also add a profile icon in the top-right corner of the dashboards. Clicking on this icon should display a drop-down menu with a Logout button. Clicking on Logout should logout the the user/employer and redirect them to the login page.

## Installation

Run `npm install` to install dependencies

### Requirements 
- Node 8
- npm 5

## Running

Running `npm start` will start a development server @ `localhost:3000`



