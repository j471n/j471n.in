<div align="center">

  ![Cover](https://imgur.com/Kpzk2LQ.png)

  ![Github stars](https://img.shields.io/github/stars/j471n/j471n.in?style=flat-square)
  ![Github Forks](https://img.shields.io/github/forks/j471n/j471n.in?style=flat-square)
  ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/j471n/j471n.in?style=flat-square)
  ![GitHub repo size](https://img.shields.io/github/repo-size/j471n/j471n.in?style=flat-square)

</div>


## Tools Used

* **Framework**: [Next.js](https://nextjs.org/)
    
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
    
* **Content**: [MDX](https://github.com/mdx-js/mdx)

* **Database**: [Supabase](https://supabase.com/)
    
* **Animations**: [Framer Motion](https://framer.com/motion)
    
* **Deployment**: [Vercel](https://vercel.com)
    
* **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
    
* **Plugins**: [rehype](https://github.com/rehypejs/rehype)
    
* **Analytics**: [Google Analytics](https://analytics.google.com/analytics/web/)
    
* [SWR](https://swr.vercel.app/)
    
* [Email.js](https://www.emailjs.com/)
    
* [React Toastify](https://github.com/fkhadra/react-toastify)
    

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
* [**Google Analytics Data API**](https://developers.google.com/analytics/devguides/reporting/data/v1): I am using this API to get the analytics of this website so that I can show how many user visit this site in the last 7 days. In this you will need the value of the following properties:
    
    * `GA_PROPERTY_ID`
        
    * `GA_CLIENT_EMAIL`
        
    * `GA_PRIVATE_KEY`
        
    
    I have written a [blog](https://j471n.in/blogs/google-analytics-data-api) that shows how you can get these properties and guides to use them.
    
* [**Supabase Integration**](https://supabase.com/): I am using Supabase with ISR to store all my projects and certificates for now. It provides an API that helps you to access the data. To access that data you need two things:

  * `SUPABASE_URL`: Database URL.
  * `SUPABASE_KEY`: It is safe to be used in a browser context.

  **Steps-**

  * To get these go to [Supabase](https://app.supabase.com/sign-in) and log in with your account.

  * Click on **New Project** and fill all the fields.

  * Click on **Create New Project**.

  * Go to the [Settings](https://app.supabase.com/project/_/settings/general) page in the Dashboard.

  * Click **API** in the sidebar.

  * Find your API **URL** and **anon** key on this page.

  * Now you can [Create table](https://app.supabase.com/project/_/editor) and start using it.

    But before you use this there was one issue I had when I was using this it was returning the empty array ([]). It was because of project policies. By default, no-one has access to the data. To fix that you can do the following:

  * Go to [Policies](https://app.supabase.com/project/_/auth/policies).

  * Select your Project.

  * Click on **New Policy**.

    ![](https://i.imgur.com/RsGd8oW.png)

  * You will be presented with two options. You can choose either one. I chose the 1st option:

    ![](https://i.imgur.com/QDAePUQ.png)

  * After that, you will have four options as shown in the following image. You can choose according to your need. I only need the read access so I went with 1st option.

    ![](https://i.imgur.com/h1hSivF.png)

  * Click on **Use this template**.

  * Click on **Review**.

  * Click on **Save Policy**

    After that, you will be able to access the data using [@supabase/supabase-js](https://www.npmjs.com/package/@supabase/supabase-js). Install it and you just set up your project with Supabase.

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
