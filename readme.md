<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="">
    <img src="/client/images/home.png" alt="Logo" width="120" height="120">
  </a>

<h3 align="center">Music Website (React Update)</h3>

  <p align="center">
    project_description
    <br />
    <a href=""><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="deployment link">View Demo</a>
    ·
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#future-changes">Future Changes</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

The project is an update to the earlier HTML,Javascript & CSS build.

The old site was very limited in design and functionality in regards to user interaction with the site. Forms such as contact,feedback and subscriber and their submissions were not connected to a server to allow the admins to handle the information appropriatley at a later time. Media items also had no means to be added and removed from the site without a global update.

The updated site aims to be a more dynamic solution to these problems. 

The webiste is designed to advertise the music and platforms that the artist is on, allows the artist fans to subscribe to the mailing list, contact the artist though a form and see the latest news/media from the artist.  
The website now has the capacity for the site admin to manage the media items that are shown on the websites media page, the list of subscribers and the messages sent to the artist though the webform.



<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Mongo][Mongo.com]][Mongo-url]
* [![Express.js][Express.js.com]][Express.js-url]
* [![React][React.js]][React-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]

The App has been secured with helmet with the default levels of protection applied.
All actions use application-json to protect against malicious attacks.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.


### Prerequisites

Ensure you have the latest copy of VSCode downloaded to your machine. 
Find it here - <a href="https://code.visualstudio.com/">VSCode</a>

### Installation

Download the zipped file from the GitHub Repo and unzip in to your chosen directory.

Open the terminal or VSCode and navigate to the directory that contains the files using cd
,cd to the server

![terminal](/client/images/project-install.png)

  Type in to the terminal
    ```
    npm start
    ```
then enter, the required packages should install and once compiled you will be able to use the app on your browser at localhost:3000

![Successful Compile](/client/images/compile-sucess.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

The software is for two end-users,  

1. The regular users of the site, 

2. The artist admin and management team,  


The usage of the app has some differences based on who is the end user. 

Regular users - 

Regular users of the site require no login information and are free to browse and interact with the 
site at their leisure, 

They can learn about the artist via the home page

![Home Page](/client/images/home.png)

See what's new and subscribe to the mailing list on the news page

![News Page](/client/images/news.png)

View the artist media on the media page,

![Media Page](/client/images/media.png)

Send messages to the artist via the contact form on the contact page

![Home Page](/client/images/contact.png)

Admins - 

Admins have the most usability in the website. However there are some differences. 
To login as an admin we must do the following, we must change the url end path to contain

  ```
  /admin
  ```

![Admin Route](/client/images/admin.png)

We do this to keep the admin portal hidden from regular users, 

click the login button to open the login form
use the details - username:GuestAdmin@SRMusic.com, password:guestAdmin
![Admin-Login](/client/images/admin-login.png)

Once sucessfully logged in you will be able to view the admin portal. 

![Admin-Portal](/client/images/admin-home.png)

You can view all subscribers,and filter though the list with varying different fields.

![Page-Subscribers](/client/images/admin-subscribers.png)

You can view page media, add new items, edit existing items and delete items

![Page-Media](/client/images/admin-media.png)

You can view the messages portal, see all messages, reply, compose new messages, send enquiries from 
the inbox to the trash & permenantly delete from the trash. 

![Page-Messages](/client/images/admin-messages.png)

You can interact with the different functionalities but please note, due to being logged
in on a guest admin account, functionalities may be rejected on request to prevent any changes
being made to the server/site. 

![Page-Subscribers](/client/images/rejection-message.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Testing -->
## Testing

To run the tests on the app simply open the terminal, cd to the server directory and type in 
    ```
    npm test
    ```
. Provided the project has been installed correctly the server test suite will run, and then the client 
test will run. It should appear as follows:
![Server-Test](/client/images/server-tests.png)
![Client-Test](/client/images/client-tests.png)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- Future Changes -->
## Future Changes

For this project I have listed below some of the future changes I would like to make to the App to increase it's functionality and efficiancy.

- Adjust/simplify components to make them more reusable, reduce repetative code and increase efficiancy.

- Create CSS breaks instead of using the react hook for responsiveness, there is a conflict in the test 
  suites that prevent components that use the responsiveness hook from being properly tested.

- Create a page for more media platform links. 



<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Scott Ramsay - sct_r_9223@live.co.uk

Project Link: [https://github.com/github_username/repo_name](https://github.com/Rambo9223/Medical-Center-App)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Mongo.com]:https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[Mongo-url]:https://www.mongodb.com/
[Express.js.com]:https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express.js-url]:https://expressjs.com/
