# gcp-tricks
Dealing with GCP

---

## Credentials for GAE in local env
When deploying GAE apps from local machine using google-cloud-sdk, `gcloud` will check for valid credentials.
1. Check that the desired account is set using `gcloud config list`. If not, set the account `gcloud config set account <your-acc>`
2. It is recommended to use a service account to do so for security reasons instead of your own login.
3. Download credential key as a JSON file for the <your-acc> service account and save it somewhere in the local machine. Secure it well.
4. Export the credential key file.
```
$ export GOOGLE_APPLICATION_CREDENTIALS = "/path/to/somewhere/credential-key.json"
```
5. Now, deploying GAE apps should not have any permission issues. (remember to enable GAE Admin API from the GCP console before this)
6. But if this somehow doesn't work, then explicitly activate the service account on your local machine.
```
$ gcloud auth activate-service-account \
  test-service-account@appspot.gserviceaccount.com \
  --key-file $GOOGLE_APPLICATION_CREDENTIALS \
  --project target-project-name
```
7. Try to deploy the app again.
