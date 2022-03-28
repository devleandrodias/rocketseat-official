import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });

const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

const QueueUrl = "https://sqs.us-east-1.amazonaws.com/777632128622/MyQueue";

const readSqs = function () {
  const params: AWS.SQS.ReceiveMessageRequest = {
    QueueUrl,
    VisibilityTimeout: 30,
    MaxNumberOfMessages: 10,
  };

  sqs.receiveMessage(params, function (err, data) {
    err ? console.error(err) : console.log(data);
  });
};

readSqs();
