# gcp-tricks
Dealing with GCP

---

## Credentials for GAE in local environment
When deploying GAE apps from local machine using google-cloud-sdk, `gcloud` will check for valid credentials.
1. Check that the desired account and project is set using `gcloud config list`. If not, set the account 
```
$ gcloud config set account [target-project-name@appspot.gserviceaccount.com]
$ gcloud config set project [target-project-name]
```
  - In fact, it would be more convenient to maintain multiple configurations for different GCP projects on the local machine, since I am working on multiple projects at the same time. 
  - After setting the desired `account` and `project` and verifying that the current gcloud config is correct for this project, create a new configuration to save these settings:
  ```
  #creating a new configuration
  $ gcloud config configurations create [new-config-name]
  
  #listing all available configurations, which will indicate the current active configuration
  $ gcloud config configurations list
  
  #activate a configuration
  $ gcloud config configurations activate [config-name]
  ```
  
2. It is recommended to use a service account to do so for security reasons instead of your own Google login, which by default is the owner of the entire GCP.
3. Download credential key as a JSON file for the service account and save it somewhere in the local machine. Secure it well.
4. Export the credential key file as an environment variable. This is required for testing the app in local development server, if the app needs to access certain Google cloud services.
```
$ export GOOGLE_APPLICATION_CREDENTIALS = "/path/to/somewhere/credential-key.json"
```
5. Also, change the currently signed in Google user so that you have the appropriate access to even run the deploy command for the GAE app. It is recommended to run this with a service account. May not be the best security practice but I used the same service account in the GAE project configuration.
```
$ gcloud auth activate-service-account [account] --key-file [/path/to/somewhere/credential-key.json]
```
6. Remember to check all the granted access and permissions for the accounts you are using in the IAM section of the GCP console.
7. For more related information, check out the following:
  - https://cloud.google.com/iam/docs/understanding-service-accounts
  - https://cloud.google.com/docs/authentication/production

