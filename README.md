<div align="center">

  ![Cover](https://imgur.com/Kpzk2LQ.png)

  ![Github stars](https://img.shields.io/github/stars/j471n/j471n.in?style=flat-square)
  ![Github Forks](https://img.shields.io/github/forks/j471n/j471n.in?style=flat-square)
  ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/j471n/j471n.in?style=flat-square)
  ![GitHub repo size](https://img.shields.io/github/repo-size/j471n/j471n.in?style=flat-square)

</div>

## Run Locally

Clone the project:

```bash
git clone https://github.com/j471n/j471n.in.git
```

Go to the project directory:

```bash
cd j471n.in
```

Install dependencies

```bash
yarn 
# or
npm install
```

Start the server:

```bash
yarn dev
# or
npm run dev
```

After that server should be running on [localhost:3000](http://localhost:3000)

> I am using [yarn](https://yarnpkg.com/) you can use [pnpm](https://pnpm.io/) or [npm](https://www.npmjs.com/)

> Warning: You could run into errors if you don't populate the `.env.local` with the correct values

## Tools Used

* **Framework**: [Next.js](https://nextjs.org/)
    
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
    
* **Content**: [MDX](https://github.com/mdx-js/mdx)
    
* **Animations**: [Framer Motion](https://framer.com/motion)
    
* **Deployment**: [Vercel](https://vercel.com)
    
* **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
    
* **Plugins**: [rehype](https://github.com/rehypejs/rehype)
    
* **Analytics**: [Google Analytics](https://analytics.google.com/analytics/web/)
    
* [SWR](https://swr.vercel.app/)
    
* [Email.js](https://www.emailjs.com/)
    
* [React Toastify](https://github.com/fkhadra/react-toastify)
    

## Setting up the Environment

Rename [`.env.example`](/.env.example) to `.env.local` and then you need to populate that with the respective values.

* `NEXT_PUBLIC_YOUR_SERVICE_ID`: Go to the [Admin Panel](https://dashboard.emailjs.com/admin) of [emailjs.com](https://emailjs.com). If you haven't already added a service then Click on the **Add Service** Button as shown in the image
    
    ![](https://i.imgur.com/bK5wzkD.png)
    
    Then choose any method you want I am using **Gmail**
    
    ![](https://i.imgur.com/zTrFCNJ.png)
    
    * Then first click on the **Connect Account and log** in with your Gmail account that you want to use to get the emails from.
        
    * In the second step click on **Create Service** and then copy the **Service ID** and add this ID to `NEXT_PUBLIC_YOUR_SERVICE_ID` in `.env.local`
        
    
    ![](https://i.imgur.com/c8ZkUf5.png)
    
* `NEXT_PUBLIC_YOUR_TEMPLATE_ID`: To get the Template ID visit the [Email Templates](https://dashboard.emailjs.com/admin/templates) section and click on **Create New Template**.
    
    ![](https://i.imgur.com/TQLrQuz.png)
    
    And then you will see a window where you can edit your email template after you are satisfied with your template then click on the Save button in the top right corner.
    
    ![](https://i.imgur.com/98adqhN.png)
    
    After that you will have your Template ID as shown in the image below:
    
    ![](https://i.imgur.com/pcqKu3f.png)
    
* `NEXT_PUBLIC_YOUR_USER_ID`: To get your User ID, Go to [Account](https://dashboard.emailjs.com/admin/account) and then you will be able to see it:
    
    ![](https://i.imgur.com/oU3tBiY.png)
    
* `NEXT_PUBLIC_BLOGS_API`: I am using [Dev.to API](https://developers.forem.com/api) to fetch all the blog stats. You can get this API at the bottom of the [Extensions](https://dev.to/settings/extensions) section.
    
    ![](https://i.imgur.com/zh7V0ZB.png)
    
* `NEXT_PUBLIC_GA_MEASUREMENT_ID`: You can follow this [guide](https://support.google.com/analytics/answer/9539598?hl=en) to get your Google Analytics ID and then you will be able to use Google Analytics in this project.
    
* **Spotify Integration:** I have used [Spotify API](https://developer.spotify.com/documentation/web-api/). So, you need three Environment Variable values-
    
    * `SPOTIFY_CLIENT_ID`
        
    * `SPOTIFY_CLIENT_SECRET`
        
    * `SPOTIFY_REFRESH_TOKEN`
        
    
    You need to follow this [blog](https://j471n.in/blogs/spotify-api-nextjs) to get these variables' values.
    
* **Firebase Integration**: I have integrated the Firebase database to store the visitor of blog in the database. This step is optional for you. You can skip this section and delete the following files:
    
    * `lib/firebase.ts`
        
    * `pages/api/views/index.ts`
        
    * `pages/api/views/[slug].ts`
        
    
    And remove the following code from `pages/blogs/[slug].tsx` file:
    
    ```tsx
    useEffect(() => {
    const registerView = () =>
        fetch(`/api/views/${post.meta.slug}`, {
        method: "POST",
        });
    
    post != null && registerView();
    }, [post !== null && post.meta.slug]);
    ```
    
    And if you want to use this feature then follow these steps-
    
    * Go to [Firebase](https://console.firebase.google.com/) Console and log in with your Google Account.
        
    * Add A new project
        
        ![](https://i.imgur.com/cpnbIEi.png)
        
    * Enter the **Project Name** and then click on **Continue**. It will create an app for you.
        
        ![](https://i.imgur.com/XKNDIIq.png)
        
    * Then Click on the **Realtime Database** in the sidebar.
        
        ![](https://i.imgur.com/nDWYUvg.png)
        
    * Click on **Create Database** and follow the process.
        
        ![](https://i.imgur.com/LpVLnkk.png)
        
    * Make sure you select **Test Mode** and then click on Enable.
        
        ![](https://i.imgur.com/mjGNm8R.png)
        
    * Then go to **Project settings**.
        
        ![](https://i.imgur.com/HjqEPrD.png)
        
    * And then choose the **Service Accounts** icon in the **General** section. And then select **Firebase Admin SDK** and you need to select **Node.js** and then click on **Generate new private key** button as shown in the following image:
        
        ![](https://i.imgur.com/erPGdme.png)
        
    * A warning will pop up. Click on **Generate Key**.
        
        ![](https://i.imgur.com/utwTrAJ.png)
        
    * Then a JSON file will be downloaded and then you will find all the required values in that file. However, you need to install `firebase-admin` by just typing `yarn add firebase-admin` in the terminal.
        
    * **Don't share any of the things with anyone or never put these to GitHub.**
        
* [**Google Analytics Data API**](https://developers.google.com/analytics/devguides/reporting/data/v1): I am using this API to get the analytics of this website so that I can show how many user visit this site in the last 7 days. In this you will need the value of the following properties:
    
    * `GA_PROPERTY_ID`
        
    * `GA_CLIENT_EMAIL`
        
    * `GA_PRIVATE_KEY`
        
    
    I have written a [blog](https://j471n.in/blogs/google-analytics-data-api) that shows how you can get these properties and guides to use them.
    

## Screenshots & Demo

![](https://imgur.com/VEGYXfy.png)

![](https://imgur.com/ohnSGok.png)

![](https://imgur.com/nMgwzYq.png)

![](https://imgur.com/zKKR07K.png)

![](https://imgur.com/H0a1jQn.png)

![](https://imgur.com/hnztqEv.png)

![](https://imgur.com/ZgeSzHz.png)

## Documentation

I have written an in-depth blog on [How I Made My Portfolio with Next.js](https://dev.to/j471n/how-i-made-my-portfolio-with-nextjs-2mn3). You can visit there to look at the detailed guide about this portfolio.