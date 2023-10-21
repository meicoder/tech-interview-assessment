# 2ULaundry Tech Assessment Overview

The purpose of this assessment is to gain an understanding of your approach to development and problem solving. Your primary focus should be creating a working solution that meets as many of the acceptance criteria as possible with a secondary focus on elements like design and/or supplemental functionality. It is not necessary to complete every acceptance criteria to submit the assessment. Complete what you can and leave "TODO:" comments with appropriate placeholder instructions anywhere you are unable to complete your code. You must turn the assignment by the end of the third day after you are given the assignment.

## Guidelines & Instructions

-   We expect this work will take 1/2 day to a full day to complete depending on your familiarity with Node and React
-   You have up to 3 days to complete and return the assignment
-   You are free to use any resources or reference materials at your disposal to complete the task
-   Fork this repo and push the code to your new forked repo. Submit the forked repo's URL to techassessment@2ulaundry.com
-   If you have any questions about the assignment, you may also reach out to techassessment@2ulaundry.com

## The Assignment

The business analyst assigned to your sprint team has presented you with two user stories to complete this sprint. This assessment asks you to complete these story cards to the best of your ability.

## User Story 1

As a vendor supplying services to 2ULaundry I need to submit invoices via an API in order to receive payment in a timely manner.

### Acceptance Criteria

1. The API accepts JSON formatted HTTP POST requests at the route '/Invoice'
   The following is a sample Invoice request that will be submitted to the API endpoint.

```javascript
{
  "invoice_number": "12345",
  "total": "199.99",
  "currency": "USD",
  "invoice_date": "2019-08-17",
  "due_date": "2019-09-17",
  "vendor_name": "Acme Cleaners Inc.",
  "remittance_address": "123 ABC St. Charlotte, NC 28209"
}
```

2. The API returns an HTTP 200 Response code and the following message body

```javascript
{
  "message": "invoice submitted successfully"
}
```

3. Store the invoices in a data store of your choice with an additional property and value "status": "pending"

## User Story 2

As a member of the 2ULaundry Accounting Team I need to see a list of invoices that have been submitted by vendors, but have not yet been approved for payment so that I can review and approve them.

### Acceptance Criteria

1. Create an interface with react.js that shows a list of unapproved invoices that are submitted via API described in user story #1.
2. Display the following fields for each invoice:"Invoice Number", "Vendor Name", "Vendor Address", "Invoice Total", "Invoice Date", "Due Date"
3. Create a solution that allows the user to select and approve invoices. Once an invoice is "Approved" it should dissappear from the list of available invoices.
4. When the user approves an invoice the "status" property for that invoice should be updated to "Approved"
5. When an invoice is submitted via the API from user story #1, it should populate in the list of displayed invoices without requiring the user to manually refresh the list of invoices.

# Deployment Intructions

This solution was made by using:

-   NodeJS
-   ExpressJS
-   MongoDB
-   ReactJS

The `Backend` project includes some other libraries like:

-   cors: for handling connection between frontend and backend projects
-   mongoose: for handling data and connection with the DB
-   socket.io: for handling socket connection between backend and frontend
-   validator: for handling more specific validation when request arrives to the backend.

The `Frontend` project includes some other libraries like:

-   axios: for sending request to the backend
-   redux-toolkit: for handling internal local state management
-   socket.io-client: for handling socket connection between backend and frontend
-   tailwindcss: for adding styles

## Prerequisites

You must have installed the next components:

-   Docker
-   Docker Compose
-   Node 14+

## Instructions

1. Go to the `backend` folder

```console
cd backend
```

2. Build the docker image

```console
docker-compose build
```

3. Verify that the `backend-express` image was created

```console
docker images -a
```

4. Start the container

```console
docker-compose up
```

5. Verify that the `backend-express` and `mongo` images were created

```console
docker images -a
```

6. You should see the `server-express  | connected to DB & listening on port 3000` message in the console

7. Go to the `frontend` folder

8. Install the dependencies

```console
npm install
```

9. Run the next script

```console
npm run dev
```

10. Verify the frontend project runs on port 5173. This is very IMPORTANT since it is going to be used to connect both projects in Socket.io feature
