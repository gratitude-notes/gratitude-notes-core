# Design Phase 1: High Level Requirements

1. The application will be web-based, built using the Ionic Framework and React, in order to support multiple front-ends across multiple platforms.

2. The application will leverage cloud services in order to store all of its user information/data in a scalable manner, so the application can support thousands of concurrent users. 
	* The web application will be deployed through the cloud, so users can experience a smooth low-latency application
	* The application will also use Machine Learning services from the cloud in order to provide Text-To-Speech & Sentiment Analysis & Text Classification on user entries, in order to enhance the user input experience and encourage unique entries.

3. The user must be able to write and save notes regarding what they are thankful for and be able to input a happiness score.
	* The user must also be able to edit their notes for the day and adjust their happiness score at any time throughout the day.
	* The application must encourage the user to write unique notes, by comparing the current entry to previous entries and topics through our Entry Encouragement Service
	* The user should be able to attach images to their notes if they desire, which will also be stored on the cloud.
	* The user should only be able to have up to five entries a day, in order to ensure that the user's entries are meaningful.

4. The user must be able to retrieve notes from the past by either date or topic or happiness score.

5. The user must create an account with our application through Google SSO, so that the system can associate user's entries with a single account, so they can login on other platforms and view their notes.
	* The system maintains a list of registered accounts through a cloud identity management platform.
	* The system also maintains the user data through the cloud.

6. The user should be able to easily share his notes to any messaging platform.

7. The application will utilize a REST 2.0 API which will need to be deployed on the cloud, in order to communicate seamlessly between the multiple front-ends and backend of our application.

8. The application should display trends regarding the user's happiness score throughout the month, and notify the user of his/her behavior, and highlight improvements.

9. The application should also have a featured section, where it displays notes from the past, where the User had a high happiness score, when it detects the User is in a rough week (from a pattern of low happiness score).

10.  The application should also display common topics that the User tends to become happy from throughout his/her long-term use of the app.

11. The application must also show a dashboard of how consistently the user has been adding notes, and allow the user to set daily reminder notifications.
