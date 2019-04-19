This was cloned from a Code Lab tutorial https://codelabs.developers.google.com/codelabs/your-first-pwapp/

The tutorial uses Yahoo API to create a weather app, but unfortunately the Yahoo retired the API in Jan 2019. In order to still learn from this tutorial, I have imitated the API with the help of [My JSON Server](https://my-json-server.typicode.com/) by [typicode](https://github.com/typicode). This is an awesome tool to help hobbyist develop faster. If you like it, please support the creator on Patreon.

---
# Your first Progressive Web App Code Lab

These are the resource files needed for the [Your first Progressive Web App](https://codelabs.developers.google.com/codelabs/your-first-pwapp/)
code lab from Google.

This is a work in progress, if you find a mistake, please [file an issue](https://github.com/googlecodelabs/your-first-pwapp/issues). Thanks!

## What you’ll learn
* How to design and construct an app using the “app shell” method
* How to make your app work offline
* How to store data for use offline later

## What you’ll need
* Chrome 52 or above, though any browser that supports service workers and `cache.addAll()` will work
* [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb), or use your own web server of choice.
* The [sample code](https://github.com/googlecodelabs/your-first-pwapp/archive/master.zip)
* A text editor
* Basic knowledge of HTML, CSS and JavaScript
* (Optional) Node is required in the last step to deploy to Firebase

---
# Takeaways

- Progressive web apps are:
  - **Progressive** - Works for every user, regardless of browser choice because it's built with progressive enhancement as a core tenet.
  - **Responsive** - Fits any form factor: desktop, mobile, tablet, or whatever is next.
  - **Connectivity independent** - Enhanced with service workers to work offline or on low-quality networks.
  - **App-like** - Feels like an app, because the app shell model separates the application functionality from application content.
  - **Fresh** - Always up-to-date thanks to the service worker update process.
  - **Safe** - Served via HTTPS to prevent snooping and to ensure content hasn't been tampered with.
  - **Discoverable** - Is identifiable as an "application" thanks to W3C manifest and service worker registration scope, allowing search engines to find it.
  - **Re-engageable** - Makes re-engagement easy through features like push notifications.
  - **Installable** - Allows users to add apps they find most useful to their home screen without the hassle of an app store.
  - **Linkable** - Easily share the application via URL, does not require complex installation.

- For blazing fast first load:
  - Server should inject real data into web app, so that static data will be displayed on first load, instead of waiting for an ajax response.
  - Future load can be differnetiated from first ever load, by storing user preferences / user history locally in IndexedDB or other fast storage.
  - This approach also enables the app to work offline after first load.

- Pre-cache app shell (a.k.a. "UI skeleton")
  - Register a [service worker](https://developers.google.com/web/fundamentals/primers/service-workers/) to cache the app shell. This is an enhancement that will only be added if the browser supports it, else the user will still enjoy a basic experience on ancient browser.
  - This approach may cause edge cases, like the cache could not be updated, the cache is redownloaded every time, conflict with browser cache, and etc.
  - Use library like [Workbox](https://developers.google.com/web/tools/workbox/) to avoid edge cases.

- Consider different caching strategy for app data. (In this example, the **cache-first-then-network** strategy).
  - service work intercepts network request, and cache server response.
  - in the next intercepted fetch request, service worker creates two async request, one to cache and one to server.
  - if cached response exist, display the cached data in the app first.
  - if server respond after that, service worker will update the cache and also display the newer data.
  
- Native integration (iOS, Android, Windows)
  - Add a manifest file to control app appearance on different device. Link to manifest file should be added to every single page HTML for consistent experience.
  - Add OS specific meta information in the page HTML.
  - Manifest file best practice:
    - Place the manifest link on all your site's pages, so it will be retrieved by Chrome right when the user first visits, no matter what page they land on.
    - The `short_name` is preferred on Chrome and will be used if present over the name field.
    - Define icon sets for different density screens. Chrome will attempt to use the icon closest to 48dp, for example, 96px on a 2x device or 144px for a 3x device.
    - Remember to include an icon with a size that is sensible for a splash screen and don't forget to set the `background_color`.
