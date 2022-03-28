import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });

const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

const QueueUrl = "https://sqs.us-east-1.amazonaws.com/777632128622/MyQueue";

const params: AWS.SQS.ReceiveMessageRequest = {
  QueueUrl,
  WaitTimeSeconds: 0,
  VisibilityTimeout: 30,
  MaxNumberOfMessages: 10,
};

const deleteSqs = function () {
  sqs.receiveMessage(params, function (err, data) {
    if (err) {
      console.log(err);
    } else if (data.Messages) {
      console.log(`Number of messages received: ${data.Messages.length}`);

      data.Messages.forEach((el) => {
        console.log("Message", el);

        const deleteParams: AWS.SQS.DeleteMessageRequest = {
          QueueUrl,
          ReceiptHandle: el.ReceiptHandle || "",
        };

        sqs.deleteMessage(deleteParams, function (err, data) {
          err ? console.error(err) : console.log(`Message deleted: ${data}`);
        });
      });
    } else {
      console.log(`No messages recived`);
    }
  });
};

deleteSqs();
