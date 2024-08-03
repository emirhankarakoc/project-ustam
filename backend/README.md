# Find Mechanics Around Me Project

This project aims to connect customers and mechanics by providing functionalities such as booking appointments, writing reviews, and finding nearby mechanics. The repository includes three main projects:

1. **Spring Boot Backend**: Manages the server-side logic and provides APIs.
2. **React Frontend**: Creates the web interface and handles user interactions.
3. **React Native Mobile App**: Developed for mobile devices and includes additional functionalities.
## Project Overview

The project connects customers with mechanics, enabling functionalities like appointment creation, review submission, and mechanic search. The backend fully developed, but the mobile app and frontend has some incomplete features.

### Backend

The backend is developed using Spring Boot and uses MySQL 8 for data storage. It includes:

- **Mechanic and Customer Verification**: Determines who can create appointments and leave reviews.
- **Appointment Management**: Allows users to schedule appointments with mechanics.
- **Review Submission**: Enables customers to leave reviews for mechanics.

#### Requirements

- **MySQL 8**
- **Java**
- **Cloudinary Secret Key**

### Frontend

The frontend is built with React and styled using Bootstrap. It includes:

- **User Interface**: Provides functionalities for creating provinces, creating skills, verificate mechanics, inspect user profile with id card, reviews,appointments and list users.

#### Requirements

- **Node.js**
- **Bootstrap**

### Mobile Application

The mobile app is developed using React Native and tested on an Android emulator. It includes:

- **Appointment Creation**: Allows users to find mechanics with given Skill and Province from mobile devices.
- **Review Submission(waiting)**: Enables users to leave reviews for mechanics.

#### Requirements

- **Node.js**
- **Android Emulator** (or a physical Android device)
- **React Native Libraries**


#### Setup guide
If you are going to run the frontend and backend on the same machine with your Android emulator, what I write below does not matter.

If you are going to run the backend on a separate machine and the emulator on a separate machine like me, we need to make some IP settings so that we can deliver http requests correctly.<br>
open cmd and type ipconfig

![image](https://github.com/user-attachments/assets/13d23466-3732-42b9-9e57-c30bdcec32cc)
here there is, your ipv4 adress. you will need this. mine 192.168.1.75 for my local wifi.<br>
We need this ip adress for connecting mobile app to backend. 

Open frontend > http.js (in root libary) and put your ip adress there
![image](https://github.com/user-attachments/assets/a35febaa-2e1c-4736-be74-848e62176f15)<br>
for frontend, nothing changed but i will set my ip adress in mobile.

Open mobile > assets > http.js
![image](https://github.com/user-attachments/assets/627f5141-fb46-44db-b95b-c4e19070bfd3)
put your ip adress and run.


## Running guide
- **for backend, open ide and click run button.**
- **for frontend, open terminal and write "npm install" then "npm start"**
- **for mobile, (i use android) open terminal and write "npm install" then "npm run android"**





### Some Images from frontend and mobile application.

#### Authentication
![mobile-register](https://github.com/user-attachments/assets/8046e3ea-8014-43d2-96a1-5616766c3748)
![mobile-login](https://github.com/user-attachments/assets/4687de46-85d9-400a-b6df-cb4e71106740)
![login](https://github.com/user-attachments/assets/b1e5e9ad-f5ea-433e-85bf-791e143308ce)
![register](https://github.com/user-attachments/assets/70d8c50f-260f-4074-9496-48f3fb679b14)

#### Frontend Components
![add-skill](https://github.com/user-attachments/assets/30a75b7f-6a16-4991-90f3-6eb7898b835b)
![add-province](https://github.com/user-attachments/assets/131054ac-434f-4c39-b280-50d6a481658c)
![mechanic-list](https://github.com/user-attachments/assets/d8ce19dd-5e13-49cc-b6a9-c97d9c6980cd)
![inspect-mechanic-wo-idcard](https://github.com/user-attachments/assets/8e2daccf-b7ac-4c14-a51f-6b02a5f86768)
![inspect-idcard-mechanic](https://github.com/user-attachments/assets/7f9f02f6-59cd-4d1b-bedb-1c915b2c8587)
![404page](https://github.com/user-attachments/assets/1d9db8d6-a002-46ed-a288-3fc20d4f70ef)
![skills](https://github.com/user-attachments/assets/e173ea1e-8a83-4ae8-b117-9ae07a750a4a)
![provinces](https://github.com/user-attachments/assets/c9ef0ce6-f60e-41f8-be11-c612164f0067)
![profilepage](https://github.com/user-attachments/assets/a68ead72-2fae-4ff9-a5bc-a7185625f15f)

#### Mobile Application Components
##### Editing Profile, Skills, Provinces
![editskills](https://github.com/user-attachments/assets/7fb73a13-7667-4cf0-ab3b-1b91ca035a8a)
![mobile-editprovinces](https://github.com/user-attachments/assets/ebeb123e-d02c-4d0b-82f3-aea7f3ad007f)
![mobile-addremoveprovinces](https://github.com/user-attachments/assets/a5d775a0-05c9-4834-9743-8c6d5aea2143)

##### Searching Mechanics 
![mobile-search-skills](https://github.com/user-attachments/assets/6a5a24af-b96a-444d-a7a5-843564ec88de)
![mobile-search-response](https://github.com/user-attachments/assets/1054c858-48f3-42da-8cb6-9d8ee94701fa)
![mobile-search-provinces](https://github.com/user-attachments/assets/db89d62a-300a-4676-a29b-83ebce8a90fb)

##### Sample Mechanics List
![mobile-loadsamplemechanics](https://github.com/user-attachments/assets/c11ae99b-f94e-45f5-b0fc-b078a9192392)

##### Inspecting Mechanic's Profile
![mobile-inspectsearchresponseprofile](https://github.com/user-attachments/assets/1ead00b8-f9d6-4694-bced-0e51d8f36ee2)

<br>
I will not develop anymore, PR's are welcome.



