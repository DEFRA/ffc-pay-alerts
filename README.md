# FFC pay alerts
FFC pay alerts to send email notifications from the payment service to RPA operations.

This function is triggered from a service bus message requesting an email message to be sent to RPA operations.

The message contains the text to be displayed in the email.

## Prerequisites

- Node.js LTS 16
- access to a GOV.UK Notify account
- create a [GOV.UK Notify email template](https://www.notifications.service.gov.uk/using-notify/guidance/edit-and-format-messages) and use [Personalisation](https://www.notifications.service.gov.uk/using-notify/guidance/edit-and-format-messages#personalised-content) to customise the dynamic text contained in the email
- [Azure Functions Core Tools V3](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=v4%2Clinux%2Ccsharp%2Cportal%2Cbash)

## Example message

```
{
   "name":"batch-processing-error",
   "properties":{
      "id":"2823b94b-ee45-496c-aea1-e6ff8962beff",
      "checkpoint":"ffc-pay-batch-processor-local",
      "status":"error",
      "action":{
         "type":"error",
         "message":"Invalid file",
         "data":{
            "filename":"SITIELM0004_INVALID_FILE_20220307172712493.dat"
         },
         "timestamp":"2022-05-20T15:59:19.158Z"
      }
   }
}
```


## Azure Storage

To support local development of Azure blob storage, there are several options:

1. Use the Docker Compose file in this repository (recommended).

Running the below command will run an Azurite container.

`docker-compose up -d`

2. Install Azurite locally

See [Microsoft's guide](https://docs.microsoft.com/en-us/azure/storage/common/storage-use-azurite?tabs=visual-studio) for information.

3. Use Azure cloud hosted storage

It is not possible to use Azurite for file share storage.  For this reason an actual Azure cloud hosted share need to be accessible to run the application.

## Configuration

The `local.settings.json` is required to hold all local development environment values.  As this file contains sensitive values, it is excluded from source control.

Example:

For blob, examples assumes option `1` is taken above and therefore shows connection strings for local Azurite container.

It's likely that the Service Bus topic and subscription names will need to be amended to match those owned by the developer.

```

{
  "IsEncrypted": false,
  "Values": {
    "NODE_TLS_REJECT_UNAUTHORIZED": "0",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10007/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10008/devstoreaccount1;",
    "BATCH_STORAGE": "DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;BlobEndpoint=http://127.0.0.1:10001/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10008/devstoreaccount1;",
    "MESSAGE_CONNECTION": "SERVICE BUS CONNECTION STRING",
    "ALERT_TOPIC_ADDRESS": "ffc-pay-alerts",
    "ALERT_SUBSCRIPTION_ADDRESS": "ffc-pay-alerts",
    "NOTIFY_API_KEY": "NOTIFY TEST, TEAM OR LIVE API KEY STRING",
    "NOTIFY_EMAIL_TEMPLATE_ID" : "NOTIFY EMAIL TEMPLATE STRING",
    "DEV_EMAIL_ADDRESSES": "DEV TEAM EMAIL ADDRESSES STRING SEPARATED BY COMMAS",
    "RPA_EMAIL_ADDRESSES": "RPA OPERATIONS EMAIL ADDRESSES STRING SEPARATED BY COMMAS",
  }
}

```

## Running the application

Use the convenience script, `./scripts/start`

### Running tests

```
# Run all tests
./scripts/test

# Run tests with file watch
./scripts/test -w

# Run tests in debug mode
./scripts/test -d
```

## CI pipeline

This service uses the [FFC CI pipeline](https://github.com/DEFRA/ffc-jenkins-pipeline-library)

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable information providers in the public sector to license the use and re-use of their information under a common open licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
